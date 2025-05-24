import React, { useState } from 'react';
import {
    View,
    Button,
    Alert,
    Platform,
    Text,
    Image,
    PermissionsAndroid,
    StyleSheet,
    Linking,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        return result === RESULTS.GRANTED;
    }
};

const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
        const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        return result === RESULTS.GRANTED;
    }
};

const CameraGalleryScreen = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert(
                '카메라 접근 권한이 필요합니다',
                '설정 > 앱 권한에서 카메라 접근을 허용해주세요',
                [
                    { text: '취소', style: 'cancel' },
                    {
                        text: '설정 열기',
                        onPress: () => {
                            Linking.openSettings(); // iOS 권한 설정 열기
                        },
                    },
                ]
            );
            return;
        }

        launchCamera({ mediaType: 'photo', saveToPhotos: true }, res => {
            if (res.didCancel || !res.assets) return;
            if (res.errorMessage) {
                Alert.alert('에러', res.errorMessage);
                return;
            }
            const uri = res.assets[0].uri;
            setImageUri(uri ?? null);
        });
    };

    const openGallery = async () => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) {
            Alert.alert(
                '갤러리 접근 권한이 필요합니다',
                '설정 > 앱 권한에서 갤러리 접근을 허용해주세요',
                [
                    { text: '취소', style: 'cancel' },
                    {
                        text: '설정 열기',
                        onPress: () => {
                            Linking.openSettings(); // iOS 권한 설정 열기
                        },
                    },
                ]
            );
            return;
        }

        launchImageLibrary({ mediaType: 'photo' }, res => {
            if (res.didCancel || !res.assets) return;
            if (res.errorMessage) {
                Alert.alert('에러', res.errorMessage);
                return;
            }
            const uri = res.assets[0].uri;
            setImageUri(uri ?? null);
        });
    };

    return (
        <View style={styles.container}>
            <Button title="카메라 열기" onPress={openCamera} />
            <View style={{ height: 10 }} />
            <Button title="갤러리 열기" onPress={openGallery} />
            {imageUri && (
                <>
                    <Text style={styles.uriText}>📎 URI: {imageUri}</Text>
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    uriText: { marginVertical: 10, fontSize: 12, color: '#444' },
    image: {
        width: 250,
        height: 250,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default CameraGalleryScreen;
