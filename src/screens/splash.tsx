import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.png";
import styles from "./styles";
import { HOME } from "../constants/constants";
import { useApi } from "../hooks/useAppConfig";
import { searchStore } from "../stores/SearchStore";

const SplashScreen = () => {
  const navigation = useNavigation(); 
  const api = useApi();
  searchStore.updateApi(api)
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
