import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SessionContext } from '../Components/SessionContext';
import { NextCycleContext } from '../Components/NextCycleContext';
// import { useFonts } from '@expo-google-fonts/nunito';
// import * as Font from 'expo-font';

import WelcomeScreen from './WelcomeScreen';

const screenWidth = Dimensions.get('window').width;
console.log(screenWidth);

export default function CycleScreen({ navigation }) {
    const { nextCycle, setNextCycle } = useContext(NextCycleContext);
    console.log({ nextCycle });
    // const [fontsLoaded] = useFonts({
    //     'Nunito-Regular': require('@expo-google-fonts/nunito'),
    // });
    let number = null;

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
    const startDate = new Date('2023-04-26');
    const endDate = new Date();
    const daysBetweenDates = calculateDaysBetweenDates(startDate, endDate);
    const periodStart = 28 - daysBetweenDates;

    const value = (daysBetweenDates / 28) * 100;
    let textDays = '';
    if (periodStart == 1 || periodStart == 0) {
        textDays = 'jour avant les prochaines règles';
    } else {
        textDays = 'jours avant les prochaines règles';
    }

    let radius = 0;
    if (screenWidth <= 300) {
        radius = 150;
    } else if (screenWidth > 300 && screenWidth < 400) {
        radius = 170;
    } else if (screenWidth >= 400) {
        radius = 190;
    }

    // console.log(daysBetweenDates);

    return (
        <>
            {!number ? (
                <View style={styles.containerWelcome}>
                    <Text style={styles.h1}>Bienvenue 'pseudo'</Text>
                    <Text style={styles.welcomeText}>
                        Ouvre le calendrier pour renseigner la date de tes dernières règles :
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Calendar');
                        }}
                    >
                        <Text>Mon calendrier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Calendar');
                        }}
                        accessibilityLabel="Go to the calendar"
                    >
                        <Text style={styles.skipButton}>Skip</Text>
                    </TouchableOpacity>
                    {/* <StatusBar style="auto" /> */}
                </View>
            ) : (
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
                            showProgressValue={false}
                            radius={radius}
                            activeStrokeWidth={20} //vert
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
            )}
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
    containerWelcome: {
        flex: 1,
        backgroundColor: '#86C8BC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FEF6D9',
        marginBottom: 20,
    },
    welcomeText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
    skipButton: {
        color: 'grey',
        fontStyle: 'italic',
    },
});
