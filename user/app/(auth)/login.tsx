import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import LoginImage from "@/data/LoginImage";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { studentLogin } from "@/services/api";
import {
  getFcmToken,
  getUserId,
  setId,
  storeData,
} from "@/services/asyncStorage";
import notificationServices from "@/services/notificationServices";

interface LogInProps {}
const LogIn: React.FC<LogInProps> = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  notificationServices();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getFcmToken();
      setExpoPushToken(token);
      console.log("expo token", token);
    };
    fetchToken();
  }, []);
  
  const router = useRouter();
  const handleForgotPassword = () => {
    router.push("/forgotPassword");
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const loginMutation = useMutation({
    mutationFn: studentLogin,
    onSuccess: async (data) => {
      const value = data.data.accessToken;
      await storeData(value);
      await setId(value);
      setError(false);
      setErrorMessage("");
      router.replace("/ButtomTab/home");
    },
    onError: (error) => {
      setError(true);
      setErrorMessage("Invalid username or password !")
      
    },
  });

  const handleLogin = async () => {
    if (expoPushToken != null) {
      if (email === "" && password === "") {
        setError(true);
        setErrorMessage("All Fields are required !")
      } else {
        loginMutation.mutate({
          email,
          password,
          expoPushToken,
        });
      }
    }

    if (loginMutation.isPending) {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <Animated.View style={{ flex: 1, backgroundColor: "#E2E2E2" }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={200}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: hp("4%"),
            marginTop: hp("-14%"),
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: hp("1%"),
              gap: hp("4%"),
            }}
          >
            <Text style={styles.title}>Welcome to Hamro College!</Text>
            <LoginImage />
          </View>
          {error && (
            <View style={{width:wp('90%'),height:hp('3%'),marginBottom:-20}}>
              <Text style={{textAlign:'center',color:'red',fontFamily:'Nunito-ExtraBold'}}>{errorMessage}</Text>
            </View>
          )}
          <InputField
            icon="mail"
            placeholder="Enter  Email"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordField
            icon="key"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.row}>
            <View style={styles.rememberMeContainer}>
              <TouchableOpacity onPress={toggleRememberMe}>
                <Fontisto
                  name={rememberMe ? "checkbox-active" : "checkbox-passive"}
                  size={20}
                  color={rememberMe ? "#1A162B" : "black"}
                />
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordButtonText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin}>
            <Button title="Log In" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Nunito-ExtraBold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
  },
  rememberMeContainer: {
    flexDirection: "row",
    gap: wp("3%"),
  },
  rememberMeText: {
    fontSize: 14.5,
    fontFamily: "Nunito-BoldItalic",
  },
  forgotPasswordButtonText: {
    color: "#1A162B",
    textDecorationLine: "underline",
    fontSize: 14.5,
    fontFamily: "Nunito-ExtraBoldItalic",
  },
});

export default LogIn;
