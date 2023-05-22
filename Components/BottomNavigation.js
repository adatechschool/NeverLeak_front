import { useEffect, useContext } from 'react';
import { supabase } from '../supabase.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SessionContext } from '../Components/SessionContext';

//Importer les routes (=screens)
import CalendarScreen from '../screens/CalendarScreen.js';
import CycleScreen from '../screens/CycleScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const { session, setSession } = useContext(SessionContext);

    const getPeriods = async () => {
        const { data, error } = await supabase
            .from('periods')
            .select('period_day')
            .eq('user_id', session.user.id)
            .order('period_day', { ascending: true });

        console.log({ data });
        console.log('error read = ', error);

        let routeName = 'Profile'; // Default to 'Profile'
        if (data && data.length > 0) {
            routeName = 'Cycle';
        }

        return routeName;
    };

    useEffect(() => {
        getPeriods();
    }, []);

    return (
        <Tab.Navigator
            activeColor="#FEF6D9"
            inactiveColor="black"
            initialRouteName={getPeriods()}
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
