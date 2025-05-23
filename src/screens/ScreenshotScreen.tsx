import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';

const ScreenShotScreen = () => (
    <View style={styles.viewScreen}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => console.log('Camera pressed')}>
                <Text style={styles.buttonText}>가능</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    viewScreen: {
        flex: 1,
        justifyContent: 'flex-start', // 상단으로 정렬
        alignItems: 'center',
        paddingTop: 50, // 상단 여백 추가
    },
    text: {
        fontSize: 24,
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