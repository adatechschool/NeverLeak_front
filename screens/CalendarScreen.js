import { StyleSheet, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase.js';
import { SessionContext } from '../App';

export default function CalendarScreen({ navigation }) {
    const { session, setSession } = useContext(SessionContext);

    const [selectedDays, setSelectedDays] = useState({
        selected: [],
        marked: {},
    });

    const readPeriods = async () => {
        const { data, error } = await supabase
            .from('periods')
            .select('period_day')
            .eq('user_id', session.user.id);

            
        console.log('error read = ', error);
        console.log('data =', data);

        // showDates(data)
        return data
    };

    useEffect(() => {
        readPeriods().then(showDates(data));
    }, [selectedDays]);

    const postDay = async (day) => {
        const { data, error } = await supabase
            .from('periods')
            .insert([{ period_day: day, user_id: session.user.id }], { returning: 'minimal' });

        console.log('posts error =', error);
    };

    const deleteDay = async (day) => {
        const { data, error } = await supabase
            .from('periods')
            .delete()
            .eq('user_id', day, 'user_id', session.user.id);

        console.log('delete error = ', error);
    };

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

    const showDates = (data) => {
        const markedDates = {};
        console.log("datashowDates", data)
            if (data) {
                data.map ((day)=>{
                    console.log(day.period_day,)
                markedDates[day.period_day] = {
                    selected: true,
                    startingDay: true,
                    endingDay: true,
                    color: '#FF9A61',
                }});
            }     
    }

    const handleOnPressDay = (value) => {
        const periodDay = value.dateString;
        if (selectedDays.selected.includes(periodDay)) {
            deleteDay(periodDay);
            const newSelected = selectedDays.selected.filter((day) => day !== periodDay);
            setSelectedDays(() => {
                return {
                    selected: newSelected,
                    marked: markedPeriod([...newSelected]),
                };
            });
        } else {
            postDay(periodDay);
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
                markedDates= {selectedDays.marked}
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
