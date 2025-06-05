import { useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  Text,
  Platform,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
  TextInput,
  BackHandler,
} from "react-native";

export default function OtpsScreen() {

  return (
    <>

      <View className="h-screen bg-black items-center justify-center">
        <Text className="text-white">Hello from otps screen</Text>
      </View>
    </>
  );
}
