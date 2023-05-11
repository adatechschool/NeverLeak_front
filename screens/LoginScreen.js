import { StyleSheet, Text, View } from 'react-native';
import Auth from '../Components/Auth.js';
import Account from '../Components/Account';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase.js';

//A ScrollView component that handles keyboard appearance and automatically scrolls to focused TextInput
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen({ navigation }) {
    // const [mail, setMail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [message, setMessage] = useState('');
    // const [password, setPassword] = useState('');

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
