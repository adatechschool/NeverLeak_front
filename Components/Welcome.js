import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Bienvenue</Text>
            <Text style={styles.welcomeText}>
                Ouvre le calendrier pour renseigner la date de tes dernières règles :
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Calendar');
                }}
            >
                <Text>Mon calendrier</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Calendar');
                }}
                accessibilityLabel="Go to the calendar"
            >
                <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
            {/* <StatusBar style="auto" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#86C8BC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FEF6D9',
        marginBottom: 20,
    },
    welcomeText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: '#FF9A61',
        elevation: 5,
    },
    skipButton: {
        color: 'grey',
        fontStyle: 'italic',
    },
});
