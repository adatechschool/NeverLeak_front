import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SessionContext } from '../Components/SessionContext';
import { NextCycleContext } from '../Components/NextCycleContext';
import { getPeriodsDays } from '../api/Crud-periods';
import { nextCycleCalculation } from '../functions/nextCycleCalculation';
import { useIsFocused } from '@react-navigation/native';
import WelcomeScreen from '../Components/Welcome';
import LogoSmall from '../Components/Logos/LogoSmall';

export default function CycleScreen({ navigation }) {
    const { session, setSession } = useContext(SessionContext);
    const { nextCycle, setNextCycle } = useContext(NextCycleContext);
    const [daysLeft, setDaysLeft] = useState(0);
    const [cyclePercentage, setCyclePercentage] = useState(null);
    const [textContent, setTextContent] = useState('');
    const [radius, setRadius] = useState(0);
    const [periodDuration, setPeriodDuration] = useState(28);

    const isFocused = useIsFocused();

    const handleRadius = () => {
        const screenWidth = Dimensions.get('window').width;
        if (screenWidth <= 300) {
            setRadius(150);
        } else if (screenWidth > 300 && screenWidth < 400) {
            setRadius(170);
        } else if (screenWidth >= 400) {
            setRadius(190);
        }
    };

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

    const displayNextCycle = async () => {
        // Font();

        const periodsDaysList = await getPeriodsDays(session.user.id);
        setNextCycle(() => {
            return {
                firstday: periodsDaysList[0],
                nextCycle: nextCycleCalculation(periodsDaysList[0]),
            };
        });

        const startDate = new Date(periodsDaysList[0]);
        const endDate = new Date();
        const daysBetweenDates = calculateDaysBetweenDates(startDate, endDate);

        const handleChanges = () => {
            if (daysBetweenDates > periodDuration) {
                setTextContent('jours de retard');
                setDaysLeft(daysBetweenDates - periodDuration);
                setCyclePercentage((periodDuration / daysBetweenDates) * 100);
            } else if (daysLeft == 1 || daysLeft == 0) {
                setTextContent('jour avant les prochaines règles');
            } else {
                setTextContent('jours avant les prochaines règles');
                setDaysLeft(periodDuration - daysBetweenDates);
                setCyclePercentage((daysBetweenDates / periodDuration) * 100);
            }
        };
        handleChanges();
    };

    useEffect(() => {
        handleRadius();
        displayNextCycle();
    }, [isFocused]);

    // console.log({ daysLeft });

    return (
        <>
            {!nextCycle.firstday ? (
                <WelcomeScreen navigation={navigation} />
            ) : (
                <View style={styles.container}>
                    <View>
                        <LogoSmall />
                    </View>
                    <View style={styles.cycleContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.number}>{daysLeft}</Text>
                            {/* <Text style={styles.days}>jours</Text> */}
                            <Text style={styles.days}>{textContent}</Text>
                        </View>
                        <View style={styles.graphContainer}>
                            <CircularProgress
                                value={cyclePercentage}
                                showProgressValue={false}
                                radius={radius}
                                activeStrokeWidth={20}
                                activeStrokeColor={'#FF9A61'}
                                inActiveStrokeWidth={40}
                                progressValueStyle={{ fontWeight: '100', color: 'black' }}
                                activeStrokeSecondaryColor="#FF9A61"
                                inActiveStrokeColor="#ffdac4"
                                duration={1000}
                                dashedStrokeConfig={{
                                    count: { periodDuration },
                                    width: 50,
                                }}
                            />
                        </View>
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
    },
    cycleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    logoContainer: {
        backgroundColor: '#FEF6D9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    logo: {
        width: 20,
        height: 25,
        marginRight: 10,
    },
    textLogo: {
        fontSize: 18,
        marginTop: 5,
    },
});
