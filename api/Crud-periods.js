import { supabase } from '../supabase';

const getPeriodsDays = async (userId) => {
    const { data, error } = await supabase
        .from('periods')
        .select('period_day')
        .eq('user_id', userId)
        .order('period_day', { ascending: true });

    console.log('error read = ', error);

    return data;
};

const postPeriodDay = async (userId, day) => {
    const { data, error } = await supabase
        .from('periods')
        .insert([{ period_day: day, user_id: userId }], { returning: 'minimal' });

    console.log('posts error =', error);
};

const deletePeriodDay = async (userId, day) => {
    const { data, error } = await supabase
        .from('periods')
        .delete()
        .eq('user_id', userId)
        .eq('period_day', day);

    console.log('delete error = ', error);
};

export { getPeriodsDays, postPeriodDay, deletePeriodDay };
