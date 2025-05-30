import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Signup: undefined;
    // Add other screens here as needed
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BoardScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { t } = useTranslation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 실제 로그인 로직 구현 필요
        if (!username || !password) {
            Alert.alert(t('error'), t('please_enter_username_password'));
            return;
        }
        Alert.alert(t('notice'), t('login_not_implemented'));
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('welcome')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('username')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder={t('password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title={t('login')} onPress={handleLogin} />
                <View style={styles.buttonSpacer} />
                <Button title={t('signup')} onPress={handleSignUp} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    input: {
        width: 240,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSpacer: {
        width: 16,
    },
});

export default BoardScreen;
