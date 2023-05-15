import { NavigationContainer } from '@react-navigation/native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();

import 'react-native-url-polyfill/auto';

//Importer les routes (=screens)
// import MenuScreen from './screens/MenuScreen';
import CalendarScreen from './screens/CalendarScreen';
// import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import CycleScreen from './screens/CycleScreen';
import ProfileScreen from './screens/ProfileScreen';
//import { Session } from '@supabase/supabase-js';
import BottomNavigation from './Components/BottomNavigation';

export default function App() {
    return (
        <NavigationContainer>
            <BottomNavigation />
            {/* <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                <Stack.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{ title: 'Calendar' }}
                />
                <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ title: 'Registration' }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="Cycle" component={CycleScreen} options={{ title: 'Cycle' }} />
            </Stack.Navigator> */}
        </NavigationContainer>
    );
}
