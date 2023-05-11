import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import CircularProgress from 'react-native-circular-progress-indicator';

// const screenWidth = Dimensions.get('window').width;

export default function CycleScreen() {
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
    const startDate = new Date('2023-05-03');
    const endDate = new Date();
    const daysBetweenDates = calculateDaysBetweenDates(startDate, endDate);
    const periodStart = 28 - daysBetweenDates;

    // const data = {
    //     // labels: ['Apple', 'Banana', 'Cherry'],
    //     data: [0.2],
    // };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.number}>{periodStart}</Text>
                        {/* <Text style={styles.days}>jours</Text> */}
                        <Text style={{ textAlign: 'center' }}>
                            jours avant les prochaines règles
                        </Text>
                    </View>
                </View>
                <View style={styles.graphContainer}>
                    <CircularProgress
                        value={daysBetweenDates}
                        // title={periodStart + ` jours avant les prochaines règles`}
                        // subtitle={`Jour ` + daysBetweenDates + ` du cycle`}
                        // titleStyle={{ }}
                        showProgressValue={false}
                        maxValue={28}
                        radius={150}
                        inActiveStrokeOpacity={0.5}
                        activeStrokeWidth={28} //vert
                        activeStrokeColor={'#FF9A61'}
                        inActiveStrokeWidth={28} //gris
                        progressValueStyle={{ fontWeight: '100', color: 'black' }}
                        activeStrokeSecondaryColor="#FF9A61"
                        inActiveStrokeColor="black"
                        duration={1000}
                        strokeLinecap={'square'}
                        dashedStrokeConfig={{
                            count: 28,
                            width: 13,
                        }}
                    />
                </View>
            </View>
            {/* <View style={styleSheet.MainContainer}>
                    <ProgressChart
                        data={data}
                        width={screenWidth - 15}
                        height={500}
                        chartConfig={{
                            // backgroundColor: '#86C8BC',
                            backgroundGradientFrom: '#FEF6D9',
                            backgroundGradientTo: '#FEF6D9',
                            //decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255,154,97, ${opacity})`,
                        }}
                        style={{
                            borderRadius: 15,
                        }}
                        strokeWidth={40}
                        hideLegend={true}
                        radius={150}
                    />
                </View> */}
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
    },
    graphContainer: {
        position: 'absolute',
    },
    number: {
        textAlign: 'center',
        fontSize: 60,
        padding: 0,
    },
    days: {
        textAlign: 'center',
        fontSize: 40,
        padding: 0,
    },
});
