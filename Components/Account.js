import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase.js';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
// import { Session } from '@supabase/supabase-js';

export default function Account({ session }) {
    const [loading, setLoading] = useState(true);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            let { data, error, status } = await supabase
                .from('users')
                .select(`pseudo, email`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setPseudo(data.pseudo);
                setEmail(data.email);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ pseudo, email }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                pseudo,
                email,
                updated_at: new Date(),
            };

            let { error } = await supabase.from('users').upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Bienvenue 'pseudo'</Text>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" value={session?.user?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Pseudo"
                    value={pseudo || ''}
                    onChangeText={(text) => setPseudo(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="email" value={email || ''} onChangeText={(text) => setEmail(text)} />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? 'Loading ...' : 'Update'}
                    onPress={() => updateProfile({ pseudo, email })}
                    disabled={loading}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },h1: {
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
