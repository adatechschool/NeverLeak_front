import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;

export default function CycleScreen() {
    const data = {
        // labels: ['Apple', 'Banana', 'Cherry'],
        data: [0.2],
    };
    return (
        <View style={styleSheet.MainContainer}>
            <ProgressChart
                data={data}
                width={screenWidth - 15}
                height={500}
                chartConfig={{
                    // backgroundColor: '#86C8BC',
                    backgroundGradientFrom: '#FEF6D9',
                    backgroundGradientTo: '#FEF6D9',
                    //decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255,154,97, ${opacity})`,
                }}
                style={{
                    borderRadius: 15,
                }}
                strokeWidth={40}
                hideLegend={true}
                radius={150}
            />
            <Text style={{ fontSize: 28, textAlign: 'center' }}>
                {' '}
                Progress Chart in React Native{' '}
            </Text>
        </View>
    );
}
const styleSheet = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF6D9',
    },
});
