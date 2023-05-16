import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Importer les routes (=screens)
import CalendarScreen from '../screens/CalendarScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import CycleScreen from '../screens/CycleScreen.js';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import RegistrationScreen from '../screens/RegistrationScreen.js';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
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
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarLabel: 'Connexion',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: () => <Ionicons name="log-in-outline" color={'black'} size={30} />,
                }}
            />
            <Tab.Screen
                name="Cycle"
                component={CycleScreen}
                options={{
                    tabBarLabel: 'Cycle',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: () => <Ionicons name="refresh-outline" color={'black'} size={30} />,
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'Calendrier',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: () => (
                        <Ionicons name="calendar-outline" color={'black'} size={30} />
                    ),
                }}
            />

            <Tab.Screen
                name="Register"
                component={RegistrationScreen}
                options={{
                    tabBarLabel: 'Register',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: () => (
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
                    tabBarIcon: () => <Ionicons name="happy-outline" color={'black'} size={30} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: () => <Ionicons name="person-outline" color={'black'} size={30} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
