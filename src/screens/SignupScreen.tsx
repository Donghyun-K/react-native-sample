import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.0.65:3001';

const SignupScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword || !username) {
            Alert.alert(t('error'), t('please_fill_all_fields'));
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(t('error'), t('passwords_do_not_match'));
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/auth/signup`, {
                email,
                password,
                username
            });

            if (response.status === 201) {
                Alert.alert(t('success'), t('signup_success'), [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]);
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert(t('error'), t('signup_failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('signup')}</Text>

            <TextInput
                style={styles.input}
                placeholder={t('email')}
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />

            <TextInput
                style={styles.input}
                placeholder={t('username')}
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!loading}
            />

            <TextInput
                style={styles.input}
                placeholder={t('password')}
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />

            <TextInput
                style={styles.input}
                placeholder={t('confirm_password')}
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
            />

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleSignup}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>{t('signup')}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.loginLink} 
                onPress={() => navigation.goBack()}
                disabled={loading}
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
        color: '#000',
    },
    button: {
        backgroundColor: '#2196f3',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#90caf9',
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
