import { supabase } from '../supabase';
import { formatDistance, subDays } from 'date-fns';
import compareAsc from 'date-fns/compareAsc';

const getPeriodsDays = async (userId) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .select('end_date')
        .eq('user_id', userId)
        .order('end_date', { ascending: false });

    console.log('error read = ', error);
    return data;
};

function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

const postPeriodDay = async (userId, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .insert([{ user_id: userId, start_date: day, end_date: day }], { returning: 'minimal' });

    console.log('posts error =', error);
};

const updatePeriodDay = async (newDate, day) => {
    // const periodDays = await getPeriodsDays(userId);
    // const id = periodDays.map((e) => e.id);
    const { data, error } = await supabase
        .from('multi-periods')
        .update({ end_date: day })
        // .eq('user_id', userId)
        .eq('end_date', newDate);

    console.log('posts error =', error);
};

const addPeriodDay = async (userId, day) => {
    const periodDays = await getPeriodsDays(userId);
    const endDates = periodDays.map((e) => e.end_date);
    console.log({ periodDays });
    if (endDates.length < 1) {
        postPeriodDay(userId, day);
    } else {
        for (e of endDates) {
            const newDate = new Date(e);
            const result = addDays(newDate, 1);
            console.log({ result });
            // const result2 = new Date(result);
            // console.log({ result2 });
            // const newDateDay = new Date(day);
            // console.log({ newDateDay });
            const result3 = compareAsc(new Date(result), new Date(day));
            console.log({ result3 });
            if (result3 == 0) {
                console.log({ e });
                updatePeriodDay(e, day);
                break;
            } else {
                console.log('post');
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

// const getPeriodsDays = async (userId) => {
//     const { data, error } = await supabase
//         .from('periods')
//         .select('period_day')
//         .eq('user_id', userId)
//         .order('period_day', { ascending: true });

//     console.log('error read = ', error);
//     return data.map((e) => e.period_day);
// };

// const postPeriodDay = async (userId, day) => {
//     const { data, error } = await supabase
//         .from('periods')
//         .insert([{ period_day: day, user_id: userId }], { returning: 'minimal' });

//     console.log('posts error =', error);
// };

// const deletePeriodDay = async (userId, day) => {
//     const { data, error } = await supabase
//         .from('periods')
//         .delete()
//         .eq('user_id', userId)
//         .eq('period_day', day);

//     console.log('delete error = ', error);
// };

export { getPeriodsDays, addPeriodDay, deletePeriodDay };
