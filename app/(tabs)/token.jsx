// screens/TokenScreen.js
import { GenerateTOTP } from "@/components/generateTOTP";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";



export default function TokenScreen() {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const secret = "5LRK6DQHULVZBNJW";

    const updateOtp = () => {
      const token = GenerateTOTP(secret);
      setOtp(token);
    };

    updateOtp();
    const interval = setInterval(updateOtp, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Generated OTP</Text>
      <Text style={styles.otp}>{otp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, marginBottom: 20 },
  otp: { fontSize: 40, fontWeight: "bold" },
});
