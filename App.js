import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';
import Auth from './Components/Auth.js';
import Account from './Components/Account';
import { View } from 'react-native';
//import { Session } from '@supabase/supabase-js';

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
        <View>
            {session && session.user ? (
                <Account key={session.user.id} session={session} />
            ) : (
                <Auth />
            )}
        </View>
    );
}
