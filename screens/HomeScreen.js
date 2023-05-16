import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CycleScreen from './CycleScreen';
import Auth from '../Components/Auth';

export default function HomeScreen({ navigation, session, setSession }) {
    return (
        <View>
            {session && session.user ? navigation.navigate('Cycle') : navigation.navigate('Auth')}
        </View>
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
