const dateToString = (date) => {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month <= 9) {
        month = '0' + month;
    }
    if (day <= 9) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day;
};

const nextCycleCalculation = (firstday) => {
    let nextPeriodDays = [];

    for (let i = 28; i < 33; i++) {
        const firstDayObj = new Date(firstday);
        const nextPeriodDay = new Date(firstDayObj.setDate(firstDayObj.getDate() + i));
        nextPeriodDays.push(dateToString(nextPeriodDay));
    }
    return nextPeriodDays;
};

export { nextCycleCalculation };
