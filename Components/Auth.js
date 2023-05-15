import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { supabase } from '../supabase.js';
import Logo from '../assets/logo_neverleak.png';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        <View style={styles.form}>
            <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>
                <Text style={styles.h1}>NeverLeak</Text>
            </View>
            <TextInput
                style={styles.input}
                label="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={'none'}
            />
            <TextInput
                style={styles.input}
                label="Password"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize={'none'}
            />
            <View style={styles.passwordView}>
                <Text style={styles.passwordText}>
                    The password must contain at least 8 characters, including one upper case, one
                    lower case, one number and one special character.
                </Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    title="Sign in"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <Text>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    title="Sign up"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                >
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 40,
        // padding: 12,
        flex: 1,
        backgroundColor: '#86C8BC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 40,
        textAlign: 'center',
        // alignItems: 'flex-end',
        marginBottom: 20,
    },
    logoContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'flex-end',
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
