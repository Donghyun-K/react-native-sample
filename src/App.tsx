import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenshotScreen from './screens/ScreenshotScreen';
import CameraGalleryScreen from './screens/CameraGalleryScreen';
import LocalizationScreen from './screens/LocalizationScreen';
import BoardScreen from './screens/BoardScreen';
import './i18n';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: any) => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    return (
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
                <Button
                    title={t('bt_screenshot')}
                    onPress={() => navigation.navigate('Screenshot')}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title={t('bt_camera_gallery')}
                    onPress={() => navigation.navigate('CameraGallery')}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title={t('bt_language')}
                    onPress={() => navigation.navigate('Localization')}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button title={t('bt_board')} onPress={() => navigation.navigate('Board')} />
            </View>
        </View>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Screenshot" component={ScreenshotScreen} />
                <Stack.Screen name="CameraGallery" component={CameraGalleryScreen} />
                <Stack.Screen name="Localization" component={LocalizationScreen} />
                <Stack.Screen name="Board" component={BoardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // 위에서 아래로 정렬
        alignItems: 'stretch', // 버튼이 부모의 너비를 채우도록 설정
        paddingVertical: 20, // 위아래 여백 추가
    },
    buttonWrapper: {
        borderWidth: 1,
        borderColor: '#2196f3',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 6,
        marginHorizontal: 20, // 좌우 여백 추가
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
