import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignup = () => {
        if (!email || !password || !confirmPassword || !username) {
            Alert.alert(t('error'), t('please_fill_all_fields'));
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(t('error'), t('passwords_do_not_match'));
            return;
        }

        // TODO: Implement actual signup logic here
        console.log('Signup attempt:', { email, username });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('signup')}</Text>

            <TextInput
                style={styles.input}
                placeholder={t('username')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder={t('email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder={t('password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder={t('confirm_password')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>{t('signup')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginLink}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.loginLinkText}>{t('already_have_account')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2196f3',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginLinkText: {
        color: '#2196f3',
        fontSize: 16,
    },
});

export default SignupScreen; 