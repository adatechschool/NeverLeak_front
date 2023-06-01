import { supabase } from '../supabase';
import compareAsc from 'date-fns/compareAsc';
import { addDays } from '../functions/addDays.js';

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
    const endDates = periodDays.map((date) => date.end_date);

    if (endDates.length < 1) {
        postPeriodDay(userId, day);
    } else {
        for (date of endDates) {
            const newDate = new Date(date);
            const nextDay = addDays(newDate, 1);
            const isEqual = compareAsc(new Date(nextDay), new Date(day));

            if (isEqual == 0) {
                updatePeriodDay(date, day);
                break;
            } else {
                postPeriodDay(userId, day);
                break;
            }
        }
    }
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
