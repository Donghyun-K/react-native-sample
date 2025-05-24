import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { NativeModules, Platform } from 'react-native';

const { ScreenSecurity } = NativeModules;

// ScreenSecurity.enableFlagSecure(); // 실시간 ON
// ScreenSecurity.disableFlagSecure(); // 실시간 OFF

const ScreenShotScreen = () => {
    useFocusEffect(
        React.useCallback(() => {
            if (Platform.OS === 'ios') {
            } else if (Platform.OS === 'android') {
                // 화면 진입 시
                ScreenSecurity.enableFlagSecure();
                return () => {
                    // 화면 벗어날 때
                    ScreenSecurity.disableFlagSecure();
                };
            }
        }, [])
    );

    return (
        <View style={styles.viewScreen}>
            <Text style={styles.text}>스크린샷 불가능한 화면</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewScreen: {
        flex: 1,
        justifyContent: 'flex-start', // 상단으로 정렬
        alignItems: 'center',
        paddingTop: 50, // 상단 여백 추가
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row', // 버튼을 가로로 배치
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        borderWidth: 1, // 테두리 추가
        borderColor: '#2196f3',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10, // 버튼 간격
        backgroundColor: '#ffffff', // 버튼 배경색
    },
    buttonText: {
        fontSize: 16,
        color: '#2196f3',
        textAlign: 'center',
    },
});

export default ScreenShotScreen;
