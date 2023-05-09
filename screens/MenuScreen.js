import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function MenuScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* <StatusBar style="auto" /> */}

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Registration');
                }}
            >
                <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Welcome');
                }}
            >
                <Text>Welcome</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Calendar');
                }}
            >
                <Text>Calendar</Text>
            </TouchableOpacity>
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
    button: {
        alignItems: 'center',
        width: 100,
        paddingVertical: 5,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
});
