import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
                <Button
                    title="Go to View A"
                    onPress={() => navigation.navigate('ViewA')}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="Go to View B"
                    onPress={() => navigation.navigate('ViewB')}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="Go to View C"
                    onPress={() => navigation.navigate('ViewC')}
                />
            </View>
        </View>
    );
};

const ViewA = () => (
    <View style={styles.viewScreen}>
        <Text style={styles.text}>This is View A</Text>
    </View>
);

const ViewB = () => (
    <View style={styles.viewScreen}>
        <Text style={styles.text}>This is View B</Text>
    </View>
);

const ViewC = () => (
    <View style={styles.viewScreen}>
        <Text style={styles.text}>This is View C</Text>
    </View>
);

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ViewA" component={ViewA} />
                <Stack.Screen name="ViewB" component={ViewB} />
                <Stack.Screen name="ViewC" component={ViewC} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonWrapper: {
        borderWidth: 1,
        borderColor: '#2196f3',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 6,
        width: 200,
    },
    viewScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa',
    },
    text: {
        fontSize: 24,
    },
});
