import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text, StyleSheet } from 'react-native';
import BoardScreen from './screens/BoardScreen';
import SignupScreen from './screens/SignupScreen';
import ScreenshotScreen from './screens/ScreenshotScreen';
import CameraGalleryScreen from './screens/CameraGalleryScreen';
import LocalizationScreen from './screens/LocalizationScreen';
import Toast, { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';
import './i18n';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        backgroundColor: 'white',
        height: 60,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
      }}
      text2Style={{
        fontSize: 14,
        color: 'black',
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        backgroundColor: 'white',
        height: 60,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
      }}
      text2Style={{
        fontSize: 14,
        color: 'black',
      }}
    />
  ),
};

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
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingVertical: 20,
    },
    buttonWrapper: {
        borderWidth: 1,
        borderColor: '#2196f3',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 6,
        marginHorizontal: 20,
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
