import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.png";
import styles from "./styles";
import { HOME } from "../constants/constants";

const SplashScreen = () => {
  const navigation = useNavigation(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(HOME); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Image source={Logo} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default SplashScreen;
