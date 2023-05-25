import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from '../assets/logo_neverleak.png';

// Import custom fonts
import { useFonts } from 'expo-font';
import Alegreya from '../assets/fonts/Alegreya-Bold.ttf';

// Keep the splash screen visible while resources are fetched
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function LogoComponent() {
    const [fontsLoaded] = useFonts({
        'Alegreya-Bold': Alegreya,
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
            <Text style={{ fontFamily: 'Alegreya-Bold', fontSize: 40 }}>NeverLeak</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 40,
        fontFamily: 'Alegreya-Bold',
        textAlign: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
});
