import { supabase } from '../supabase';
// import compareAsc from 'date-fns/compareAsc';
// import { addDays, removeDays } from '../functions/addDays.js';
import { format, addDays } from 'date-fns';

const getAllPeriods = async (userId) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .select('start_date, end_date')
        .eq('user_id', userId)
        .order('end_date', { ascending: true });

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

const updatePeriodDay = async (newDate, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .update({ end_date: day })
        .eq('end_date', newDate);

    console.log('posts error =', error);
};

const addPeriodDay = async (userId, day) => {
    const periodDays = await getPeriodsDays(userId);
    console.log({ periodDays });
    const endDates = periodDays.map((date) => date.end_date);
    console.log({ endDates });
    const daySelectedRemoved = addDays(new Date(day), -1);
    const formattedDay = format(new Date(daySelectedRemoved), 'yyyy-MM-dd');
    console.log({ formattedDay });

    if (endDates.length < 1) {
        console.log('entré dans if longueur de endDate < 1');
        postPeriodDay(userId, day);
        return;
    }
    if (endDates.includes(formattedDay)) {
        updatePeriodDay(formattedDay, day);
        return;
    }
    postPeriodDay(userId, day);

    // for (date of endDates) {
    //     const newDate = new Date(date);
    //     console.log(date, newDate);
    //     const nextDay = addDays(newDate, 1);
    //     console.log(date, nextDay);
    //     const isEqual = compareAsc(new Date(nextDay), new Date(day));
    //     console.log(date, isEqual);
    //     if (isEqual == 0) {
    //         console.log(
    //             'entré dans if jour à ajouter et next day de tous les enddates sont différents'
    //         );
    //         updatePeriodDay(date, day);
    //         // break;
    //     } else {
    //         console.log(
    //             'entré dans if jour à ajouter et next day de tous les enddates sont identiques'
    //         );
    //         postPeriodDay(userId, day);
    //         // break;
    //     }
    // }
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
