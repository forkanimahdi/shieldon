import React from 'react';
import { useCameraPermissions, CameraView } from "expo-camera";
import { View, Text, Alert, StyleSheet, Button, Pressable, TouchableOpacity, PanResponder, } from "react-native";
import { useNavigation } from 'expo-router';
import { useAppContext } from '@/context';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CameraComponent = ({ setHasPermission }) => {
    const navigation = useNavigation();
    const { urls, setUrls } = useAppContext()

    const extractLabel = (url) => {
        try {
            const path = url.pathname;
            const label = decodeURIComponent(path.slice(1));
            return label;
        } catch (err) {
            console.error("Invalid OTP URL:", err);
            return null;
        }
    };


    


    const handleBarCodeScanned = async ({ data }) => {

        if (data.startsWith("otpauth://")) {
            try {
                const url = new URL(data);
                const secret = url.searchParams.get("secret");
                const issuer = url.searchParams.get("issuer") || "Unknown";

                let OTPEntry = { label: extractLabel(url), issuer: issuer, secret: secret, url: url, };

                const newTab = [...urls || []]

                let existingData = urls?.findIndex(e => e.secret == OTPEntry.secret)

                existingData == -1 ? newTab.push(OTPEntry) : newTab.splice(newTab[existingData], 1, OTPEntry)

                // newTab.push(OTPEntry)

                setUrls(newTab)

                const jsonValue = JSON.stringify(urls);

                await AsyncStorage.setItem("urls", jsonValue);

                setHasPermission(false)

                console.log(urls);

            } catch (error) {
                Alert.alert("Error", "Failed to parse the QR code.");
                setHasPermission(false);
            }
        } else {
            Alert.alert("Invalid QR", "This QR is not a valid MFA code.");
            setHasPermission(false);
        }
    };

    

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50) {
                setHasPermission(false);
            }
        },
    });



    return (
        <CameraView
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            {...panResponder.panHandlers}
            className='h-screen'
        >
            <View className="w-full h-screen items-center justify-end  pb-10">
                <Text className="text-white text-base opacity-70 absolute bottom-40 ">Swipe right to close camera</Text>
            </View>
        </CameraView>

    );
};

export default CameraComponent;