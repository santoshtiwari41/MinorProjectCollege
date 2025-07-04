import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import Button from "@/components/Button";
import PasswordField from "@/components/PasswordField";
import Animated from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { changePassword} from "@/services/api";

import { useRouter, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
const LogIn = () => {
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const {email}=useLocalSearchParams()
  const router = useRouter();

//   const changePasswordMutation = useMutation({
//     mutationFn: changePassword,
//     onSuccess: async (data) => {
//       console.log('password changed');
//       router.replace('/(auth)/login');
//     },
//     onError: (error) => {
//       console.log('error occurs in change password ' + error.message);
//     },
//   });
const handleChangePassword = () => {
    if (!password ||!cpassword) {
      return;
    }
    if (password!== cpassword) {
      return;
    }
    // changePasswordMutation.mutate({
    //   email:email,
    //   password: cpassword,
    // });
    console.log('changed password')
  };
//   if (changePasswordMutation.isPending) {
//     return <Text>Loading...</Text>;
//   }
const back = () => {
  router.back();
};

  return (
    <Animated.View style={{ flex: 1, backgroundColor: "#E2E2E2" }}>
      <View style={{backgroundColor:Colors.button,height:hp('7%')}}></View>
     <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" size={30} color="#1A162B" />
        </TouchableOpacity>
        
      </View>
      <View  style={{
              alignItems: "center",
              justifyContent:'center',
            }} >
        <Text style={styles.title}>Change your Password</Text></View>
          <View style={styles.container}>
          <PasswordField
            icon="key"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />
          
          <PasswordField
            icon="key"
            placeholder="Enter Confirm Password"
            value={cpassword}
            onChangeText={setCPassword}
          />

          <TouchableOpacity onPress={handleChangePassword} style={styles.buttonContainer}>
            <Button title="Change Password" />
          </TouchableOpacity>
        </View>
    
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap:hp('4%'),
   
  },
  buttonContainer: {
    marginTop: 20,
  },header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
   marginTop:10
  },
  

  title:{
    
    alignItems:'center',
    justifyContent:'center', 
    fontSize: 24,
    fontFamily: "Nunito-ExtraBold",
  }
});

export default LogIn;
