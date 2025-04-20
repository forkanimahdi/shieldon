# 🔐 OTP Authenticator App (Expo + React Native)

A sleek and secure mobile OTP (One-Time Password) Authenticator app,  built using **Expo**, **React Native**, and **Time-based OTP algorithms (TOTP)**. The app allows users to scan QR codes, securely store secrets, and display time-synced OTP codes that refresh every 30 seconds.

---

## 🚀 Features

- 📸 **Scan QR Codes** using your phone camera to add new OTP entries
- 🔐 **TOTP Algorithm** to generate time-based OTP codes
- ⏱ **Live Countdown Animation** that visually indicates the time left before code refresh
- 🎨 **Dark Mode & Light Mode** UI support
- 🛡️ **Professional UI Design** with animated security shield and modern color schemes
- 📋 **Clipboard Support** to copy OTP code with native toast/alert feedback
- 📁 **Local Storage Integration** to persist added OTP entries
- 📱 Built with **native components**, optimized for smooth mobile performance

---

## 🧠 How It Works

1. When you scan a QR code with the camera, the app extracts the `otpauth://` URL and parses:
   - `issuer` (e.g. GitHub, Google)
   - `label` (e.g. username)
   - `secret` (used to generate TOTP codes)
2. The app stores these securely in state/local storage.
3. A new TOTP code is generated every 30 seconds using the shared secret.
4. Visual indicators and toasts enhance user feedback and experience.

---

## 🛠️ Built With

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [NativeWind](https://github.com/marklawlor/nativewind) (Tailwind CSS for RN)
- [react-native-svg](https://docs.expo.dev/versions/latest/sdk/svg/) for scalable vector graphics
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) for QR scanning
- [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/) for clipboard functionality
- [Base32 decoding + HMAC-SHA1] to support OTP generation

---

<!-- ## 🖼 Screenshots

> Add screenshots here if you have them

--- -->


logic

## 👤 Owner

Developed and maintained by Mehdi Forkani

📸 [Instagram](https://www.instagram.com/forkanimahdi)

💻 [GitHub](https://github.com/forkanimahdi)

💼 [linkedin](https://www.linkedin.com/in/forkanimahdi)



Copyright (c) 2025 Mehdi Forkani

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/forkanimahdi/shieldon.git

cd shieldon

# Install dependencies
npm install

# Start the Expo server
npx expo start


