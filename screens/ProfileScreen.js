import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabase.js';
import { StyleSheet, View, Alert, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { Text } from 'react-native-elements';

import { SessionContext } from '../Components/SessionContext';
// import { Session } from '@supabase/supabase-js';
import { Toast } from 'toastify-react-native';

export default function Account() {
    const [loading, setLoading] = useState(true);
    const [pseudo, setPseudo] = useState('');
    const { session, setSession } = useContext(SessionContext);

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
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ pseudo }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                pseudo,
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
            <Text style={styles.h1}>Bienvenue {pseudo}</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    label="Pseudo"
                    value={pseudo || ''}
                    placeholder="pseudo"
                    onChangeText={(text) => setPseudo(text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    title={loading ? 'Loading ...' : 'Update'}
                    onPress={() => {
                        updateProfile({ pseudo });
                        Toast.info('Profil modifié !');
                    }}
                    disabled={loading}
                    activeOpacity={0.2}
                >
                    <Text>Modifier mon profil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    title="Sign Out"
                    onPress={() => {
                        supabase.auth.signOut();
                    }}
                    activeOpacity={0.2}
                >
                    <Text>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF6D9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 40,
        height: 50,
        marginRight: 10,
    },
    form: {
        backgroundColor: '#FEF6D9',
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    input: {
        height: 40,
        width: 250,
        borderRadius: 10,
        borderColor: '#FF9A61',
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 5,
        padding: 5,
        elevation: 5,
    },
    passwordView: {
        width: 250,
    },
    passwordText: {
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'italic',
        color: 'grey',
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
});
