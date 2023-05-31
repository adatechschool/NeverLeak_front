import { supabase } from '../supabase';

const getPeriodsDays = async (userId) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .select('start_date')
        .eq('user_id', userId);

    console.log('error read = ', error);
    return data.map((e) => e.start_date);
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

const updatePeriodDay = async (userId, day) => {
    const { data, error } = await supabase
        .from('multi-periods')
        .update({ end_date: day })
        .eq('user_id', userId);

    console.log('posts error =', error);
};

const addPeriodDay = async (userId, day) => {
    const periodDays = await getPeriodsDays(userId);
    console.log({ periodDays });
    if (periodDays.length < 1) {
        postPeriodDay(userId, day);
    } else {
        periodDays.map((e) => {
            const newDate = new Date(e);
            const result = addDays(newDate, 1);
            const result2 = new Date(result);
            console.log({ result2 });
            const newDateDay = new Date(day);
            console.log({ newDateDay });
            if (newDateDay == result2) {
                updatePeriodDay(userId, day);
            } else {
                console.log('post');
                postPeriodDay(userId, day);
            }
        });
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
