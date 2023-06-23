import { supabase } from '../supabase.js';
// import compareAsc from 'date-fns/compareAsc';
// import { addDays, removeDays } from '../functions/addDays.js';
import { format, addDays } from 'date-fns';

const getAllPeriods = async (userId) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .select('start_date, end_date')
        .eq('user_id', userId)
        .order('end_date', { ascending: true });
    console.log({ data });
    return data;
};

const getPeriodsDays = async (userId) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .select('end_date')
        .eq('user_id', userId)
        .order('end_date', { ascending: false });

    console.log('error read = ', error);
    return data;
};

const postPeriodDay = async (userId, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .insert([{ user_id: userId, start_date: day, end_date: day }], { returning: 'minimal' });

    console.log('posts error =', error);
};

//changement de la fonction updateDay en 2 fonction : update le dernier jour et update le premier
const updateEndDay = async (newDate, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .update({ end_date: day })
        .eq('end_date', newDate);

    console.log('update endDay error =', error);
};

const updateStartDay = async (newDate, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .update({ start_date: day })
        .eq('start_date', newDate);

    console.log('update startDay error =', error);
};

//changement de la fonction pour ajouter un jour au cycle : definition des const au bon format
//pour les startday et les endday puis recherche du jour sélectionné dans le tableau des dates.
//Si le jour existe dans le tableau, la fonction appelle updateStartDay ou updateEndDay
const addPeriodDay = async (userId, day) => {
    const periodDays = await getAllPeriods(userId);
    //faire un tableau des endDates recupérées de la BDD
    const endDates = periodDays.map((date) => date.end_date);
    //faire un tableau des startDates récupérées de la BDD
    const startDates = periodDays.map((date) => date.start_date);
    //Ajouter ou retirer un jour aux dates de début et dates de fin puis les formatter
    const daySelectedRemoved = addDays(new Date(day), -1);
    const daySelectedAdded = addDays(new Date(day), 1);
    const formattedEndDay = format(new Date(daySelectedRemoved), 'yyyy-MM-dd');
    const formattedStartDay = format(new Date(daySelectedAdded), 'yyyy-MM-dd');

    //si pas de données dans la BDD, ajouter directement le jour.
    if (endDates.length < 1) {
        console.log('entré dans if longueur de endDate < 1');
        postPeriodDay(userId, day);
        return;
    }

    //si le tableau des endDates contient le jour sélectionné -1, alors update le endDate
    if (endDates.includes(formattedEndDay)) {
        updateEndDay(formattedEndDay, day);
        return;
    }

    //si le tableau des startDay contient le jour sélectionné +1, alors update le startDate
    if (startDates.includes(formattedStartDay)) {
        updateStartDay(formattedStartDay, day);
        return;
    }

    //sinon poster le jour
    postPeriodDay(userId, day);
};

const deletePeriodDay = async (userId, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .delete()
        .eq('user_id', userId)
        .eq('start_date', day);

    console.log('delete error = ', error);
};

export { getPeriodsDays, addPeriodDay, deletePeriodDay, getAllPeriods, addDays };
