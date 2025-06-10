import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myContext = createContext()

const AppProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false)
    const [urls, setUrls] = useState([])

    const getTheme = async () => {
        const jsonValue = await AsyncStorage.getItem("darkMode");

        setDarkMode(JSON.parse(jsonValue))

        console.log("Dark Mode is set as " + jsonValue);


    }

    const getOtpUrls = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("urls");

            setUrls(JSON.parse(jsonValue))

        } catch (e) {
            console.error('Error reading OTPs:', e);
            return [];
        }
    };


    useEffect(() => {
        getOtpUrls()
        getTheme()
    }, [])



    const data = {
        darkMode,
        setDarkMode,
        urls,
        setUrls
    }


    return <myContext.Provider value={data}>{children}</myContext.Provider>

};

const useAppContext = () => useContext(myContext)

export { AppProvider, myContext, useAppContext };



