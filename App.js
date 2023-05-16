import { NavigationContainer } from '@react-navigation/native';

import 'react-native-url-polyfill/auto';

//Importer les routes (=screens)
import BottomNavigation from './Components/BottomNavigation';

import { useState, useEffect, createContext } from 'react';
import { supabase } from './supabase.js';
import Auth from './screens/AuthScreen';

export const SessionContext = createContext();

export default function App() {
    const [session, setSession] = useState(null);

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
            <NavigationContainer>
                {session && session.user ? (
                    <BottomNavigation key={session.user.id} session={session} />
                ) : (
                    <Auth />
                )}
            </NavigationContainer>
        </SessionContext.Provider>
    );
}
