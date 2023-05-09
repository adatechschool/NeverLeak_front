import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'; //Pour changer le CSS de la status bar
import Constants from 'expo-constants'; //Pour avoir la hauteur de la status bar

//A ScrollView component that handles keyboard appearance and automatically scrolls to focused TextInput
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen({ navigation }) {
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <StatusBar style="auto" />
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
