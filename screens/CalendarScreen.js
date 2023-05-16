import { StyleSheet, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useState } from 'react';

export default function CalendarScreen({ navigation }) {
    const [selectedDays, setSelectedDays] = useState({
        selected: [],
        marked: {},
    });

    const markedPeriod = (days) => {
        const markedDates = {};
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
                    startingDay: true,
                    endingDay: true,
                    color: '#FF9A61',
                };
            }
        });
        return markedDates;
    };

    const handleOnPressDay = (value) => {
        const periodDay = value.dateString;
        if (selectedDays.selected.includes(periodDay)) {
            const newSelected = selectedDays.selected.filter((day) => day !== periodDay);
            setSelectedDays(() => {
                return {
                    selected: newSelected,
                    marked: markedPeriod([...newSelected]),
                };
            });
        } else {
            setSelectedDays((oldValues) => {
                return {
                    selected: [...oldValues.selected, periodDay],
                    marked: markedPeriod([...oldValues.selected, periodDay]),
                };
            });
        }
    };

    return (
        <View style={styles.container}>
            <CalendarList
                pastScrollRange={6}
                futureScrollRange={3}
                scrollEnabled={true}
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
                markedDates={selectedDays.marked}
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
});
