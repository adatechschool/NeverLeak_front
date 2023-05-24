// import React, { useCallback } from 'react';

// // Import custom fonts
// import { useFonts } from 'expo-font';
// import Nunito from '../assets/fonts/Nunito Regular.ttf';

// // Keep the splash screen visible while resources are fetched
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();

// const Font = () => {
//     const [fontsLoaded] = useFonts({
//         'Nunito Regular': Nunito,
//     });

//     //Lorsque la font est téléchargée, on cache l'écran de téléchargement et on montre l'écran souhaité
//     const onLayoutRootView = useCallback(async () => {
//         if (fontsLoaded) {
//             await SplashScreen.hideAsync();
//         }
//     }, [fontsLoaded]);

//     if (!fontsLoaded) {
//         return null;
//     }
//     return onLayoutRootView;
// };

// export { Font };
