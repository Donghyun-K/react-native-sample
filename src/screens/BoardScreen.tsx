import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
    Signup: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Board {
    id: number;
    title: string;
    description: string;
    status: string;
}

const API_URL = 'http://192.168.0.65:3001';

const BoardScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [boards, setBoards] = useState<Board[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            fetchBoards(storedToken);
        }
    };

    const fetchBoards = async (authToken: string) => {
        try {
            const response = await axios.get(`${API_URL}/boards`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setBoards(response.data);
        } catch (error) {
            console.error('Failed to fetch boards:', error);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter email and password',
                position: 'top',
                visibilityTime: 3000,
            });
            return;
        }

        try {
            setIsLoading(true);
            const loginData = {
                email: email.trim(),
                password: password.trim()
            };
            
            const response = await axios.post(`${API_URL}/auth/signin`, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            const accessToken = response.data.accessToken;
            await AsyncStorage.setItem('token', accessToken);
            setToken(accessToken);
            setIsLoggedIn(true);
            await fetchBoards(accessToken);
            
        } catch (error: any) {
            console.error('Login error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response?.data?.message || 'Login failed. Please check your email and password.',
                position: 'top',
                visibilityTime: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        setBoards([]);
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    const renderBoardItem = ({ item }: { item: Board }) => (
        <View style={styles.boardItem}>
            <Text style={styles.boardTitle}>{item.title}</Text>
            <Text style={styles.boardDescription}>{item.description}</Text>
            <Text style={styles.boardStatus}>Status: {item.status}</Text>
        </View>
    );

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Boards</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
                <FlatList
                    data={boards}
                    renderItem={renderBoardItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.boardList}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('welcome')}</Text>
            <TextInput
                style={[styles.input, { color: 'black' }]}
                placeholder={t('email')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#666"
            />
            <TextInput
                style={[styles.input, { color: 'black' }]}
                placeholder={t('password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#666"
            />
            <View style={styles.buttonContainer}>
                <Button 
                    title={isLoading ? t('logging_in') : t('login')} 
                    onPress={handleLogin}
                    disabled={isLoading}
                />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
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
    boardList: {
        width: '100%',
        paddingHorizontal: 20,
    },
    boardItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    boardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    boardStatus: {
        fontSize: 12,
        color: '#999',
    },
});

export default BoardScreen;
