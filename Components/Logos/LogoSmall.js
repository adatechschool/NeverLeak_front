import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from '../../assets/logo_neverleak.png';

// Import custom fonts
import { useFonts } from 'expo-font';
import Alegreya from '../../assets/fonts/Alegreya Bold.ttf';

// Keep the splash screen visible while resources are fetched
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const LogoSmall = () => {
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

export default LogoSmall;

const styles = StyleSheet.create({
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
    textLogo: {
        fontSize: 18,
        marginTop: 5,
        fontFamily: 'Alegreya Bold',
    },
});
