import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { supabase } from '../supabase.js';
import Logo from '../assets/logo_neverleak.png';
import { Toast } from 'toastify-react-native';
import {TextInput} from 'react-native-paper';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true)

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>
                    <Text style={styles.h1}>NeverLeak</Text>
                </View>
                <TextInput
                    style={styles.input}
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
                <TextInput
                    style={styles.input}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    // secureTextEntry={true}
                    secureTextEntry={passwordVisible}
                    right={
                    <TextInput.Icon
                        icon={passwordVisible ? 'eye' : 'eye-off'}
                        onPress={()=> setPasswordVisible (!passwordVisible)}
                    />
                        }
                    placeholder="password"
                    autoCapitalize={'none'}
                  />
                <View style={styles.passwordView}>
                    <Text style={styles.passwordText}>
                        The password must contain at least 8 characters, including one upper case,
                        one lower case, one number and one special character.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    title="Se connecter"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <Text>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    title="S'inscrire"
                    disabled={loading}
                    onPress={() => {
                        signUpWithEmail();
                        Toast.info('Vérifie tes emails');
                    }}
                >
                    <Text>Créer un compte</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#86C8BC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
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
        paddingVertical: 7,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
});
