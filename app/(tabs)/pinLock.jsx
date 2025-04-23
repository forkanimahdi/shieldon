// components/PinLock.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PinLock({ onSuccess }) {
    const [pin, setPin] = useState('');
    const [storedPin, setStoredPin] = useState(null);

    useEffect(() => {
        const fetchPin = async () => {
            const savedPin = await AsyncStorage.getItem('securePin');
            if (savedPin) {
                setStoredPin(savedPin);
            } else {
                onSuccess(); 
            }
        };
        fetchPin();
    }, []);

    const verifyPin = () => {
        if (pin === storedPin) {
            onSuccess();
        } else {
            Alert.alert('Incorrect PIN', 'The PIN you entered is not correct.');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-8">
            <Text className="text-xl font-semibold mb-4">Enter your secure PIN</Text>
            <TextInput
                secureTextEntry
                keyboardType="numeric"
                value={pin}
                onChangeText={setPin}
                className="border rounded-xl w-full p-3 text-center text-lg"
                placeholder="Enter PIN"
                maxLength={6}
            />
            <TouchableOpacity
                onPress={verifyPin}
                className="mt-4 bg-blue-500 px-6 py-3 rounded-xl"
            >
                <Text className="text-white font-bold">Unlock</Text>
            </TouchableOpacity>
        </View>
    );
}
