//regrouper toutes les données nécessaires de manière réutilisables
import { eachDayOfInterval, format } from 'date-fns';

//1. Liste de tous les cycles d'un user dans un array d'objets.
import { getAllPeriods } from '../api/Crud-periods.js';

//2. Liste des start date au format date raw : Tue Jun 13 2023 10:32:05 GMT+0200
const startDateRaw = (allPeriods) => {
    const startDate = allPeriods.map((eachPeriod) => {
        return new Date(eachPeriod.start_date);
    });
    return startDate;
};
//3. Liste des endate au format date raw
const endDateRaw = async (user) => {
    const allPeriods = await getAllPeriods(user);
    const endDate = allPeriods.map((eachPeriod) => {
        return new Date(eachPeriod.end_date);
    });
    console.log({ endDate });
    return endDate;
};
//4. Liste de tous les jours de règle d'un user en arrays
const allDaysArrays = async (user) => {
    const periodsDaysList = await getAllPeriods(user);

    const eachDay = periodsDaysList.map((eachPeriod) => {
        const startDay = new Date(eachPeriod.start_date);
        const endDay = new Date(eachPeriod.end_date);
        const array = eachDayOfInterval({
            start: startDay,
            end: endDay,
        });

        const arrayFormated = array.map((array) => {
            const result = format(new Date(array), 'yyyy-MM-dd');
            return result;
        });
        console.log({ arrayFormated });
        return arrayFormated;
    });
    console.log({ eachDay });
    return eachDay;
};

const allDaysArrayFlat = (user) => {
    const dayListRaw = allDaysArrays(user);
    console.log({ dayListRaw });
    const dayListRawFlat = dayListRaw.flat();
    const dayListFormatted = dayListRawFlat.map((e) => {
        const result = format(new Date(e), 'yyyy-MM-dd');
        return result;
    });
    console.log({ dayListFormatted });
    return dayListFormatted;
};

export { startDateRaw, endDateRaw, allDaysArrays, allDaysArrayFlat };
