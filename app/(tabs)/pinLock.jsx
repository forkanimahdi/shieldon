// components/PinLock.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '@/context';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/footer';

export default function PinLock({ onSuccess }) {
    const [pin, setPin] = useState('');
    const [storedPin, setStoredPin] = useState(null);
    const { darkMode } = useAppContext();
    const shakeAnimation = useState(new Animated.Value(0))[0];
    const PIN_LENGTH = 4;


    useEffect(() => {
        const fetchPin = async () => {
            const savedPin = await AsyncStorage.getItem('securePIN');

            if (savedPin) {
                setStoredPin(savedPin);
            } else {
                onSuccess();
            }
        };
        fetchPin();
    }, []);




    const verifyPin = (pin) => {
        if (pin.join("") === storedPin) {
            onSuccess();
        } else {
            Alert.alert('Incorrect PIN', 'The PIN you entered is not correct.');
            setPin([])
        }
    };



    const handlePress = async (val) => {

        if (val === "del") {
            setPin((prev) => prev.slice(0, -1));
            return;
        }

        if (pin.length >= PIN_LENGTH) return;

        const newPin = [...pin, val];
        setPin(newPin);
        

        if (newPin.length === PIN_LENGTH) {
            
            verifyPin(newPin)

        }
    };


    const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0"];

    return (
        <View className={`pt-20 px-6 h-screen ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"} `}>
            <View className="mt-10">
                <Text className={`text-2xl font-bold mb-3 text-center ${darkMode ? "text-white" : "text-black"}`}>
                    Your Pin YO GO
                </Text>
                <Text className={`mb-10 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Secure your Payeer privacy with a PIN code
                </Text>

                <Animated.View
                    className="flex-row justify-between px-2 mb-16"
                    style={{ gap: 20, transform: [{ translateX: shakeAnimation }] }}
                >
                    {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                        <View
                            key={i}
                            className={`w-16 h-16 border-2 rounded-xl ${pin[i]
                                ? darkMode
                                    ? "bg-white border-white"
                                    : "bg-black border-black"
                                : darkMode
                                    ? "border-gray-600"
                                    : "border-gray-300"
                                } flex items-center justify-center`}
                        >
                            {pin[i] ? (
                                <View className={`w-3 h-3 rounded-full ${darkMode ? "bg-black" : "bg-white"}`} />
                            ) : null}
                        </View>
                    ))}
                </Animated.View>

                <View className="flex flex-wrap gap-x-3 flex-row justify-center">
                    {keypad.map((key, i) => (
                        <Pressable
                            key={i}
                            onPress={() => handlePress(key)}
                            className={`w-24 h-24 m-2 rounded-2xl items-center justify-center ${darkMode ? "bg-[#1c1c1e]" : "bg-gray-100"}`}
                            android_ripple={{ color: "#d1d5db", borderless: false }}
                        >
                            {key === "del" ? (
                                <Ionicons name="backspace-outline" size={34} color={darkMode ? "white" : "gray"} />
                            ) : (
                                <Text className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-black"}`}>{key}</Text>
                            )}
                        </Pressable>
                    ))}
                </View>
            </View>
            <Footer />
        </View>
    );


}
