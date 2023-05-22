import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Device from 'expo-device';

// Import the routes (=screens)
import CalendarScreen from '../screens/CalendarScreen.js';
import CycleScreen from '../screens/CycleScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const deviceModel = Device.modelName;
    let tabBarIconSize;
    let tabBarLabelStyle;
    let tabBarStyle;

    if (
        deviceModel.includes('iPhone 14') ||
        deviceModel.includes('iPhone 14 Pro Max') ||
        deviceModel.includes('iPhone 14 Pro') ||
        deviceModel.includes('iPhone 14 Plus') ||
        deviceModel.includes('iPhone 13') ||
        deviceModel.includes('iPhone 13 Pro') ||
        deviceModel.includes('iPhone 13 Pro Max') ||
        deviceModel.includes('iPhone 13 mini') ||
        deviceModel.includes('iPhone 12') ||
        deviceModel.includes('iPhone 12 Pro Max') ||
        deviceModel.includes('iPhone 12 Pro') ||
        deviceModel.includes('iPhone 12 mini') ||
        deviceModel.includes('iPhone X')
    ) {
        tabBarIconSize = 23;
        tabBarLabelStyle = {
            padding: 0,
            marginBottom: -18,
        };
        tabBarStyle = {
            height: 60,
            padding: 0,
            backgroundColor: '#86C8BC',
        };
    } else {
        tabBarIconSize = 30;
        tabBarLabelStyle = {
            padding: 5,
        };
        tabBarStyle = {
            height: 60,
            padding: 5,
            backgroundColor: '#86C8BC',
        };
    }

    return (
        <Tab.Navigator
            activeColor="#FEF6D9"
            inactiveColor="black"
            screenOptions={{
                tabBarActiveTintColor: '#FEF6D9',
                tabBarInactiveTintColor: 'black',
                tabBarStyle,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Cycle"
                component={CycleScreen}
                options={{
                    tabBarLabel: 'Cycle',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="refresh-outline" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'Calendrier',
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="calendar-outline" color={color} size={tabBarIconSize} />
                    ),
                }}
            />

            <Tab.Screen
                name="Cycle"
                component={CycleScreen}
                options={{
                    tabBarLabel: 'Cycle',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="refresh-outline" color={color} size={30} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarLabelStyle,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" color={color} size={tabBarIconSize} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
