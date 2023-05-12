import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-url-polyfill/auto';

//Importer les routes (=screens)
// import MenuScreen from './screens/MenuScreen';
import CalendarScreen from './screens/CalendarScreen';
// import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen.js';
import CycleScreen from './screens/CycleScreen';
import ProfileScreen from './screens/ProfileScreen';
//import { Session } from '@supabase/supabase-js';

export default function App() {
    return (
        <NavigationContainer>
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
            <Tab.Navigator
                activeColor="#FEF6D9"
                inactiveColor="black"
                screenOptions={{
                    tabBarActiveTintColor: '#FEF6D9',
                    tabBarInactiveTintColor: 'black',

                    tabBarStyle: { backgroundColor: '#86C8BC', height: 60, padding: 5 },
                }}
            >
                <Tab.Screen
                    name="Cycle"
                    component={CycleScreen}
                    options={{
                        tabBarLabel: 'Cycle',
                        tabBarLabelStyle: { padding: 5 },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="refresh-outline" color={'black'} size={30} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                        tabBarLabel: 'Calendrier',
                        tabBarLabelStyle: { padding: 5 },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="calendar-outline" color={'black'} size={30} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarLabel: 'Connexion',
                        tabBarLabelStyle: { padding: 5 },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="log-in-outline" color={'black'} size={30} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{
                        tabBarLabel: 'Inscription',
                        tabBarLabelStyle: { padding: 5 },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-add-outline" color={'black'} size={30} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{
                        tabBarLabel: 'Bienvenue',
                        tabBarLabelStyle: { padding: 5 },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="happy-outline" color={'black'} size={30} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Mon compte"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Mon compte',
                        tabBarLabelStyle: { padding: 5 },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" color={'black'} size={30} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
