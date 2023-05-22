import { NavigationContainer } from '@react-navigation/native';

import 'react-native-url-polyfill/auto';

//Importer les routes (=screens)
import BottomNavigation from './Components/BottomNavigation';

import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';
import Auth from './screens/AuthScreen';
import { SessionContext } from './Components/SessionContext';
import { NextCycleContext } from './Components/NextCycleContext';
import ToastManager, { Toast } from 'toastify-react-native';
import { getPeriodsDays, postPeriodDay, deletePeriodDay } from './api/Crud-periods.js';
import {nextCycleCalculation} from './functions/nextCycleCalculation';

export default function App() {
    const [session, setSession] = useState(null);
    const [nextCycle, setNextCycle] = useState([]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        createNextCycle();
    }, []);

    const createNextCycle = async () => {
        const periodsDaysList = await getPeriodsDays(session.user.id);
        console.log({periodsDaysList});
        setNextCycle(nextCycleCalculation(periodsDaysList[0]));
    };
    
    return (
        <SessionContext.Provider value={{ session, setSession }}>
            <NextCycleContext.Provider value={{ nextCycle, setNextCycle }}>
            <ToastManager />
            <NavigationContainer>
                {session && session.user ? (
                    <BottomNavigation key={session.user.id} session={session} />
                ) : (
                    <Auth />
                )}
            </NavigationContainer>
            </NextCycleContext.Provider>
        </SessionContext.Provider>
    );
}
