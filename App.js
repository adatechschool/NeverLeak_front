import { NavigationContainer } from '@react-navigation/native';

import 'react-native-url-polyfill/auto';

//Importer les routes (=screens)
import BottomNavigation from './Components/BottomNavigation';

import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';
import Auth from './screens/AuthScreen';
import { SessionContext } from './Components/SessionContext';
import { NextCycleContext } from './Components/NextCycleContext';
import ToastManager from 'toastify-react-native';

import { PaperProvider } from 'react-native-paper';

export default function App() {
    const [session, setSession] = useState(null);
    const [nextCycle, setNextCycle] = useState({
        firstday: '',
        nextCycle: [],
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            <NextCycleContext.Provider value={{ nextCycle, setNextCycle }}>
                <ToastManager />
                <PaperProvider>
                    <NavigationContainer>
                        {session && session.user ? (
                            <BottomNavigation key={session.user.id} session={session} />
                        ) : (
                            <Auth />
                        )}
                    </NavigationContainer>
                </PaperProvider>
            </NextCycleContext.Provider>
        </SessionContext.Provider>
    );
}
