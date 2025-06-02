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
    user: {
        id: number;
        username: string;
    };
}

interface User {
    id: number;
    username: string;
    email: string;
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
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            await fetchUserInfo(storedToken);
            await fetchBoards(storedToken);
        }
    };

    const fetchUserInfo = async (authToken: string) => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            // 사용자 정보를 가져오는데 실패하면 로그아웃 처리
            handleLogout();
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
            await fetchUserInfo(accessToken);
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
        setUser(null);
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    const handleEditBoard = (board: Board) => {
        // Implement the logic to edit the board
        console.log('Editing board:', board);
    };

    const handleDeleteBoard = (id: number) => {
        // Implement the logic to delete the board
        console.log('Deleting board:', id);
    };

    const renderBoardItem = ({ item }: { item: Board }) => (
        <View style={styles.boardItem}>
            <Text style={styles.boardTitle}>{item.title}</Text>
            <Text style={styles.boardDescription}>{item.description}</Text>
            <Text style={styles.boardStatus}>Status: {item.status}</Text>
            <Text style={styles.boardAuthor}>Author: {item.user.username}</Text>
            {item.user.id === user?.id && (
                <View style={styles.boardActions}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEditBoard(item)}
                    >
                        <Text style={styles.actionButtonText}>{t('edit')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteBoard(item.id)}
                    >
                        <Text style={styles.actionButtonText}>{t('delete')}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>{t('boards')}</Text>
                        <Text style={styles.userInfo}>{t('welcome_user', { username: user?.username })}</Text>
                    </View>
                    <Button title={t('logout')} onPress={handleLogout} />
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
                    title={isLoading ? t('loading') : t('login')}
                    onPress={handleLogin}
                    disabled={isLoading}
                />
                <Button title={t('signup')} onPress={handleSignUp} />
            </View>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerLeft: {
        flex: 1,
    },
    userInfo: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    boardList: {
        flex: 1,
    },
    boardItem: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
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
        color: '#888',
        marginBottom: 5,
    },
    boardAuthor: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    boardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    actionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#007bff',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default BoardScreen;
