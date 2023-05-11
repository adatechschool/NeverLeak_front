import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig, CalendarList } from 'react-native-calendars';
import { useEffect, useState } from 'react';

export default function CalendarScreen({ navigation }) {
    const [selectedDays, setSelectedDays] = useState([]);
    const [markedDatesObj, setMarkedDatesObj] = useState({});

    useEffect(() => {
        setMarkedDatesObj(markedPeriod(selectedDays));
    }, [selectedDays]);

    const markedPeriod = (days) => {
        const markedDates = {};
        days.map((day) => {
            markedDates[day] = { selected: true, marked: true, selectedColor: '#FF9A61' };
        });
        console.log('obj markedDates = ', markedDates);
        return markedDates;
    };

    return (
        <View style={styles.container}>
            <CalendarList
                pastScrollRange={12}
                futureScrollRange={6}
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
                onDayPress={(day) => {
                    const periodDay = day.dateString;
                    console.log('selected day', periodDay);
                    setSelectedDays([...selectedDays, periodDay]);
                    console.log('selectedDays = ', selectedDays);
                }}
                markedDates={markedDatesObj}
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
