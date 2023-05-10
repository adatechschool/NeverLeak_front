import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//Importer les routes (=screens)
import MenuScreen from './screens/MenuScreen';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen.js';
import CycleScreen from './screens/CycleScreen';

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
