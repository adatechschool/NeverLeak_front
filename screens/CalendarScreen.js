import { StyleSheet, View, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useState, useContext, useEffect } from 'react';
import { SessionContext } from '../Components/SessionContext';
import { nextCycleCalculation } from '../functions/nextCycleCalculation';
import { addPeriodDay, deletePeriodDay, getAllPeriods } from '../api/Crud-periods.js';
import Spinner from 'react-native-loading-spinner-overlay';
import { eachDayOfInterval, format } from 'date-fns';

export default function CalendarScreen() {
    const { session, setSession } = useContext(SessionContext);
    const [selectedDays, setSelectedDays] = useState({
        selected: [],
        marked: {},
    });
    const [nextPeriod, setNextPeriod] = useState({
        selected: [],
        marked: {},
    });
    const [isLoading, setIsLoading] = useState(false);

    const readPeriodsDays = async () => {
        const periodsDaysList = await getAllPeriods(session.user.id);

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
            return arrayFormated;
        });

        const dayList = eachDay.flat();
        const dayListFormated = dayList.map((e) => {
            const result = format(new Date(e), 'yyyy-MM-dd');
            return result;
        });

        setSelectedDays(() => {
            return {
                selected: dayListFormated,
                marked: markedPeriod(eachDay),
            };
        });
        if (periodsDaysList.length > 0) {
            setNextPeriod(() => {
                return {
                    selected: nextCycleCalculation(
                        periodsDaysList[periodsDaysList.length - 1]['start_date']
                    ),
                    marked: markedNextPeriod(
                        nextCycleCalculation(
                            periodsDaysList[periodsDaysList.length - 1]['start_date']
                        )
                    ),
                };
            });
        }
        setIsLoading(false);
    };

    const handleOnPressDay = async (event) => {
        setIsLoading(true);
        const periodDay = event.dateString;

        if (selectedDays.selected.includes(periodDay)) {
            await deletePeriodDay(session.user.id, periodDay);
            readPeriodsDays();
        } else {
            await addPeriodDay(session.user.id, periodDay);
            readPeriodsDays();
        }
    };

    const markedPeriod = (eachDays) => {
        //cette fonction stylise les jours selectionnés en paramètre
        const markedDates = {};
        if (eachDays.length > 0) {
            eachDays.map((period) => {
                period.map((day) => {
                    if (day === period[0] && period.length > 1) {
                        markedDates[day] = {
                            startingDay: true,
                            color: '#FF9A61',
                            customTextStyle: {
                                color: '#FFFFFF',
                            },
                        };
                    } else if (day === period[period.length - 1] && period.length > 1) {
                        markedDates[day] = {
                            selected: true,
                            endingDay: true,
                            color: '#FF9A61',
                        };
                    } else if (day === period[0] && period.length === 1) {
                        markedDates[day] = {
                            //selected: true,
                            disabled: true,
                            startingDay: true,
                            endingDay: true,
                            color: '#FF9A61',
                            customTextStyle: {
                                color: '#FFFFFF',
                            },
                        };
                    } else {
                        markedDates[day] = {
                            selected: true,
                            color: '#FF9A61',
                        };
                    }
                });
            });
        }
        return markedDates;
    };

    const markedNextPeriod = (days) => {
        const markedPeriod = {};
        days.sort().map((day) => {
            if (day === days[0] && days.length > 1) {
                markedPeriod[day] = {
                    startingDay: true,
                    color: '#F8CFB8',
                    customTextStyle: {
                        color: '#FFFFFF',
                    },
                };
            } else if (day === days[days.length - 1] && days.length > 1) {
                markedPeriod[day] = {
                    selected: true,
                    endingDay: true,
                    color: '#F8CFB8',
                };
            } else {
                markedPeriod[day] = {
                    selected: true,
                    color: '#F8CFB8',
                };
            }
        });
        return markedPeriod;
    };

    useEffect(() => {
        setIsLoading(true);
        readPeriodsDays();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ height: 120 }} />

            <Spinner
                visible={isLoading}
                textContent={'chargement...'}
                color={'#FF9A61'}
                animation={'fade'}
                textStyle={styles.spinnerTextStyle}
            />
            <CalendarList
                pastScrollRange={6}
                futureScrollRange={3}
                scrollEnabled={true}
                // displayLoadingIndicator={true}

                style={{
                    height: 350,
                }}
                theme={{
                    backgroundColor: '#FEF6D9',
                    calendarBackground: '#FEF6D9',
                }}
                onDayPress={handleOnPressDay}
                markingType={'period'}
                markedDates={{ ...selectedDays.marked, ...nextPeriod.marked }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF6D9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
