import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Vibration, Dimensions, Animated, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context";
import Topnav from "@/components/topnav";
import { router } from "expo-router";
import Footer from "@/components/footer";

const PIN_LENGTH = 4;
const screenWidth = Dimensions.get("window").width;

export default function PhoneStylePin() {
    const [pin, setPin] = useState([]);
    const [storedPin, setStoredPin] = useState(null);
    const [step, setStep] = useState("setup");
    const [tempPin, setTempPin] = useState(null);
    const { darkMode } = useAppContext();
    const shakeAnimation = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const loadPIN = async () => {
            const saved = await AsyncStorage.getItem("securePIN");
            console.log(saved);

            if (saved) {
                setStoredPin(saved);
                setStep("verify");
            }
        };
        loadPIN();
    }, []);

    useEffect(() => {

        setPin([])
    }, [step])


    const triggerShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 6, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const handlePress = async (val) => {
        Vibration.vibrate(10);

        if (val === "del") {
            setPin((prev) => prev.slice(0, -1));
            return;
        }

        if (pin.length >= PIN_LENGTH) return;

        const newPin = [...pin, val];
        setPin(newPin);

        if (newPin.length === PIN_LENGTH) {
            switch (step) {
                case "setup":
                    setTempPin(newPin.join(""));
                    setPin([]);
                    setStep("confirm");
                    break;
                case "confirm":
                    if (newPin.join("") === tempPin) {
                        await AsyncStorage.setItem("securePIN", newPin.join(""));
                        setStoredPin(newPin.join(""));
                        Alert.alert("PIN Set", "Your PIN has been securely saved.");
                        setStep("verify");
                        // router.navigate("/")
                    } else {
                        triggerShake();
                        Alert.alert("Error", "PINs do not match. Try again.");
                    }
                    setPin([]);
                    break;
                case "verify":
                    if (newPin.join("") === storedPin) {
                        Alert.alert("Access Granted", "You can now manage your PIN.", [
                            { text: "Change PIN", onPress: () => setStep("new") },
                            { text: "Deactivate PIN", onPress: () => deactivatePIN() },
                        ]);
                        setStep("verified");
                    } else {
                        triggerShake();
                        Alert.alert("Wrong PIN", "Try again.");
                        setPin([]);
                    }
                    break;
                case "new":
                    setTempPin(newPin.join(""));
                    setPin([]);
                    setStep("confirm");
                    break;
            }
        }
    };

    const deactivatePIN = async () => {
        await AsyncStorage.removeItem("securePIN");
        setStoredPin(null);
        setPin([]);
        setStep("setup");
        Alert.alert("Deactivated", "PIN code has been removed.");
    };

    const getPromptText = () => {
        if (step === "setup") return "Create a new PIN code";
        if (step === "confirm") return "Confirm your new PIN";
        if (step === "verify") return "Enter your current PIN code";
        if (step === "new") return "Enter your new PIN";
        return "Manage your security PIN";
    };

    const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0"];

    return (
        <View className={`pt-20 px-6 h-screen ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"} `}>
            <Topnav backto={"/settings"} name="Security" />
            <View className="mt-10">
                <Text className={`text-2xl font-bold mb-3 text-center ${darkMode ? "text-white" : "text-black"}`}>
                    {getPromptText()}
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
