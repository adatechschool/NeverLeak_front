import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabase.js';
import { StyleSheet, View, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LogoSmall from '../Components/Logos/LogoSmall';

import { SessionContext } from '../Components/SessionContext';

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
        <>
            <LogoSmall />
            <View style={styles.bienvenue}>
                <Text style={styles.h1}>Bienvenue {pseudo}</Text>
                <View>
                    <Text style={styles.text}>Modifiez votre profil :</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Pseudo</Text>
                    <TextInput
                        style={styles.input}
                        label="Pseudo"
                        value={pseudo || ''}
                        placeholder="pseudo"
                        onChangeText={(text) => setPseudo(text)}
                    />

                    <Text style={styles.label}>Durée du cycle</Text>
                    <TextInput
                        style={styles.input}
                        label="Cycle"
                        placeholder="Durée du cycle"
                        disabled
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
                        <Text>Enregistrer les modifications</Text>
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF6D9',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    h1: {
        fontSize: 35,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    textLogo: {
        fontSize: 18,
        marginTop: 5,
    },
    text: {
        fontSize: 18,
        marginLeft: 65,
        paddingTop: 40,
    },
    bienvenue: {
        paddingTop: 30,
        backgroundColor: '#FEF6D9',
    },
    label: {
        fontSize: 12,
        marginLeft: 5,
        paddingLeft: 5,
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
    form: {
        backgroundColor: '#FEF6D9',
        paddingVertical: 10,
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
        marginBottom: 15,
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
