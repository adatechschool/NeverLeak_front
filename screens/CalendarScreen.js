import { StyleSheet, View, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useState, useContext, useEffect } from 'react';
import { SessionContext } from '../Components/SessionContext';
import { nextCycleCalculation } from '../functions/nextCycleCalculation';
import { getPeriodsDays, postPeriodDay, deletePeriodDay } from '../api/Crud-periods.js';

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
    const [isLoading, setIsLoading] = useState('Not loaded');

    const readPeriodsDays = async () => {
        const periodsDaysList = await getPeriodsDays(session.user.id);

        setSelectedDays(() => {
            return {
                selected: periodsDaysList,
                marked: markedPeriod(periodsDaysList),
            };
        });
        setNextPeriod(() => {
            return {
                selected: nextCycleCalculation(periodsDaysList[0]),
                marked: markedNextPeriod(nextCycleCalculation(periodsDaysList[0])),
            };
        });
        setIsLoading('Loaded');
    };

    const handleOnPressDay = async (event) => {
        const periodDay = event.dateString;
        if (selectedDays.selected.includes(periodDay)) {
            await deletePeriodDay(session.user.id, periodDay);
            readPeriodsDays();
        } else {
            await postPeriodDay(session.user.id, periodDay);
            readPeriodsDays();
        }
    };

    const markedPeriod = (days) => {
        //cette fonction stylise les jours selectionnés en paramètre
        const markedDates = {};
        if (days.length > 0) {
            days.map((day) => {
                if (day === days[0] && days.length > 1) {
                    markedDates[day] = {
                        startingDay: true,
                        color: '#FF9A61',
                    };
                } else if (day === days[days.length - 1] && days.length > 1) {
                    markedDates[day] = {
                        selected: true,
                        endingDay: true,
                        color: '#FF9A61',
                    };
                } else {
                    markedDates[day] = {
                        selected: true,
                        color: '#FF9A61',
                    };
                }
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
        setIsLoading('Loading');
        readPeriodsDays();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading === 'Loading' ? (
                <Text>Ca charge !</Text>
            ) : (
                <CalendarList
                    pastScrollRange={6}
                    futureScrollRange={3}
                    scrollEnabled={true}
                    // displayLoadingIndicator={true}
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350,
                    }}
                    theme={{
                        backgroundColor: '#FEF6D9',
                        calendarBackground: '#FEF6D9',
                    }}
                    onDayPress={(day) => handleOnPressDay(day)}
                    markingType={'period'}
                    markedDates={{ ...selectedDays.marked, ...nextPeriod.marked }}
                />
            )}
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
});
