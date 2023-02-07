import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import SplashScreen from './SplashScreen';
import RouteScreen from './RouteScreen';

const MainScreen = () => {
    const [isSplashScreenVisible, setSplashScreenVisibility] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSplashScreenVisibility(false);
        }, 3000);
    }, []);

    return (
        isSplashScreenVisible ? (<SplashScreen />) : (
            <RouteScreen />
        )
    );
}

export default MainScreen