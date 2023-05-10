import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Logo from '../assets/logo_neverleak.png';

// Import custom fonts
import { useFonts } from 'expo-font';
import Roboto from '../assets/fonts/Roboto-Bold.ttf';

// Keep the splash screen visible while resources are fetched
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function MenuScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'Roboto-Bold': Roboto,
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
            {/* <StatusBar style="auto" /> */}
            <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 40 }}>NeverLeak</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Registration');
                    }}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Welcome');
                    }}
                >
                    <Text>Welcome</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Calendar');
                    }}
                >
                    <Text>Calendar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 40,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        // alignItems: 'flex-end',
    },
    button: {
        alignItems: 'center',
        width: 100,
        paddingVertical: 5,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
    logoContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'flex-end',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
});
