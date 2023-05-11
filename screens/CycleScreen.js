import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
// import { useFonts } from '@expo-google-fonts/nunito';
// import * as Font from 'expo-font';

// const screenWidth = Dimensions.get('window').width;

export default function CycleScreen() {
    // const [fontsLoaded] = useFonts({
    //     'Nunito-Regular': require('@expo-google-fonts/nunito'),
    // });

    const calculateDaysBetweenDates = (startDate, endDate) => {
        // Convert the start and end dates to UTC to avoid timezone-related issues
        const startUtc = Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        );
        const endUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        // Calculate the number of milliseconds in a day
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        // Calculate the difference in days
        const daysDifference = Math.floor((endUtc - startUtc) / millisecondsPerDay);
        return daysDifference;
    };

    // Utilisation de la fonction pour calculer le nombre de jours entre deux dates
    const startDate = new Date('2023-04-15');
    const endDate = new Date();
    const daysBetweenDates = calculateDaysBetweenDates(startDate, endDate);
    const periodStart = 28 - daysBetweenDates;

    const value = (daysBetweenDates / 28) * 100 - 1.3;
    let textDays = '';
    if (periodStart == 1 || periodStart == 0) {
        textDays = 'jour avant les prochaines règles';
    } else {
        textDays = 'jours avant les prochaines règles';
    }

    console.log(daysBetweenDates);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.number}>{periodStart}</Text>
                    {/* <Text style={styles.days}>jours</Text> */}
                    <Text style={styles.days}>{textDays}</Text>
                </View>
                <View style={styles.graphContainer}>
                    <CircularProgress
                        value={value}
                        // title={periodStart + ` jours avant les prochaines règles`}
                        // subtitle={`Jour ` + daysBetweenDates + ` du cycle`}
                        // titleStyle={{ }}
                        showProgressValue={false}
                        radius={190}
                        activeStrokeWidth={15} //vert
                        activeStrokeColor={'#FF9A61'}
                        inActiveStrokeWidth={40} //gris
                        progressValueStyle={{ fontWeight: '100', color: 'black' }}
                        activeStrokeSecondaryColor="#FF9A61"
                        inActiveStrokeColor="#ffdac4"
                        duration={1000}
                        dashedStrokeConfig={{
                            count: 28,
                            width: 50,
                        }}
                    />
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF6D9',
        position: 'relative',
    },
    textContainer: {
        position: 'absolute',
        zIndex: 1,
        width: 160,
    },
    graphContainer: {
        position: 'absolute',
    },
    number: {
        textAlign: 'center',
        color: '#86C8BC',
        fontSize: 120,
        margin: -25,
    },
    days: {
        textAlign: 'center',
        fontSize: 20,
        color: '#86C8BC',
    },
});
