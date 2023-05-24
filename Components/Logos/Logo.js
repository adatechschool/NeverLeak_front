import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from '../../assets/logo_neverleak.png';

// Import custom fonts
import { useFonts } from 'expo-font';
import Alegreya from '../../assets/fonts/Alegreya Bold.ttf';

// Keep the splash screen visible while resources are fetched
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const LogoComponent = () => {
    const [fontsLoaded] = useFonts({
        'Alegreya Bold': Alegreya,
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
        <View style={styles.logoContainer} onLayout={onLayoutRootView}>
            <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>
            <Text style={styles.textLogo}>NeverLeak</Text>
        </View>
    );
};

export default LogoComponent;

const styles = StyleSheet.create({
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
    textLogo: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Alegreya Bold',
    },
});
