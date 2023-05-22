import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Importer les routes (=screens)
import CalendarScreen from '../screens/CalendarScreen.js';
import CycleScreen from '../screens/CycleScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const getPeriods = async () => {
        const { data, error } = await supabase
            .from('periods')
            .select('period_day')
            .eq('user_id', session.user.id)
            .order('period_day', { ascending: true });

        console.log({ data });
        console.log('error read = ', error);

        let routeName = '';
        if (!data) {
            routeName = 'Profile';
        } else {
            routeName = 'Cycle';
        }
    };

    useEffect(() => {
        getPeriods();
    }, []);

    return (
        <Tab.Navigator
            activeColor="#FEF6D9"
            inactiveColor="black"
            initialRouteName={{ routeName }}
            screenOptions={{
                tabBarActiveTintColor: '#FEF6D9',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { backgroundColor: '#86C8BC', height: 60, padding: 5 },
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
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="calendar-outline" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarLabelStyle: { padding: 5 },
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
