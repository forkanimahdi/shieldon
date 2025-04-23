import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import Topnav from "@/components/topnav";

export default function SecuritySettingsScreen() {
    const { colorScheme } = useColorScheme();
    const darkMode = colorScheme === "dark";

    const [storedPin, setStoredPin] = useState(null);
    const [step, setStep] = useState("loading");
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const [newPin, setNewPin] = useState([]);

    const inputs = useRef([]);

    useEffect(() => {
        const checkStoredPin = async () => {
            const saved = await AsyncStorage.getItem("appPin");
            if (saved) {
                setStoredPin(saved);
                setStep("verify");
            } else {
                setStep("new");
            }
        };
        checkStoredPin();
    }, []);

    const focusNext = (index) => {
        if (index < 5) inputs.current[index + 1]?.focus();
    };

    const focusPrev = (index) => {
        if (index > 0) inputs.current[index - 1]?.focus();
    };

    const handleChange = (text, index) => {
        if (!/^\d?$/.test(text)) return; // Only digits
        const updated = [...pin];
        updated[index] = text;
        setPin(updated);

        if (text && index < 5) focusNext(index);
        if (!text && index > 0) focusPrev(index);
    };

    const getPinAsString = () => pin.join("");

    const handleNext = async () => {
        const inputPin = getPinAsString();

        if (inputPin.length < 6 || pin.includes("")) {
            Alert.alert("Error", "Please enter a full 6-digit PIN.");
            return;
        }

        if (step === "verify") {
            if (inputPin === storedPin) {
                setPin(["", "", "", "", "", ""]);
                setStep("new");
            } else {
                Alert.alert("Incorrect PIN", "Please try again.");
                setPin(["", "", "", "", "", ""]);
                inputs.current[0]?.focus();
            }
        } else if (step === "new") {
            setNewPin(pin);
            setPin(["", "", "", "", "", ""]);
            setStep("confirm");
        } else if (step === "confirm") {
            if (inputPin !== newPin.join("")) {
                Alert.alert("PINs do not match", "Please start over.");
                setPin(["", "", "", "", "", ""]);
                setStep("new");
                return;
            }

            try {
                await AsyncStorage.setItem("appPin", inputPin);
                Alert.alert("Success", "Your PIN has been saved.");
                setStoredPin(inputPin);
                setPin(["", "", "", "", "", ""]);
                setNewPin([]);
                setStep("verify");
            } catch (err) {
                Alert.alert("Error", "Failed to save PIN.");
            }
        }
    };

    const renderStepTitle = () => {
        switch (step) {
            case "verify":
                return "Enter your current PIN";
            case "new":
                return "Set a new 6-digit PIN";
            case "confirm":
                return "Confirm your new PIN";
            default:
                return "";
        }
    };

    const isPinComplete = pin.every((digit) => digit !== "");

    if (step === "loading") {
        return (
            <View className={`flex-1 items-center justify-center ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>
                <Text className={darkMode ? "text-white" : "text-black"}>Loading...</Text>
            </View>
        );
    }

    return (
        <View className={`flex-1 px-6 pt-20 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>
            <Topnav name="Security Settings" />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1 justify-start"
            >
                <Text className={`text-xl font-bold mb-8 ${darkMode ? "text-white" : "text-black"}`}>
                    {renderStepTitle()}
                </Text>

                <View className="flex-row justify-between mb-10">
                    {pin.map((digit, i) => (
                        <TextInput
                            key={i}
                            ref={(el) => (inputs.current[i] = el)}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, i)}
                            style={{
                                width: 50,
                                height: 60,
                                borderRadius: 10,
                                borderWidth: 1.5,
                                textAlign: "center",
                                fontSize: 24,
                                fontWeight: "600",
                                color: darkMode ? "#fff" : "#000",
                                backgroundColor: darkMode ? "#1c1c1e" : "#fff",
                                borderColor: darkMode ? "#3a3a3c" : "#ccc",
                            }}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    disabled={!isPinComplete}
                    onPress={handleNext}
                    className={`rounded-xl py-3 ${darkMode ? "bg-[#252728]" : "bg-[#e4e4e4]"}`}
                    style={{ opacity: isPinComplete ? 1 : 0.4 }}
                >
                    <Text className={`text-center font-medium ${darkMode ? "text-white" : "text-black"}`}>
                        Next
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}
