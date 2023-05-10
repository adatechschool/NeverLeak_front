import { useState, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar'; //Pour changer le CSS de la status bar
import Constants from 'expo-constants'; //Pour avoir la hauteur de la status bar

// Import custom fonts
import { useFonts } from 'expo-font';
import RozhaOne from '../assets/fonts/RozhaOne-Regular.ttf';

// Keep the splash screen visible while resources are fetched
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

// A ScrollView component that handles keyboard appearance and automatically scrolls to focused TextInput
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//const windowHeight = Dimensions.get('window').height;

export default function RegistrationScreen({ navigation }) {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const [fontsLoaded] = useFonts({
        'RozhaOne-Regular': RozhaOne,
    });

    //Lorsque la font est téléchargée, on cache l'écran de téléchargement et on montre l'écran souhaité
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.form}>
                <Text style={styles.h1}>NeverLeak</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your e-mail"
                    value={mail}
                    onChangeText={(text) => {
                        setMail(text);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Check your password"
                    secureTextEntry={true}
                    value={checkPassword}
                    onChangeText={(text) => {
                        setCheckPassword(text);
                    }}
                />
                <View style={styles.passwordView}>
                    <Text style={styles.passwordText}>
                        The password must contain at least 8 characters, including one upper case,
                        one lower case, one number and one special character.
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Welcome');
                        }}
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
                {/* <StatusBar style="auto" /> */}
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
        fontFamily: 'RozhaOne-Regular',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
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
    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
});
