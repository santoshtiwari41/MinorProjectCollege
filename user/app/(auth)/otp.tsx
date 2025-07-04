import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OtpImage from "@/data/otpImage";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "@/components/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/services/api";

const Otp: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);
  const fourthInput = useRef<TextInput>(null);
  const fifthInput = useRef<TextInput>(null);
  const sixthInput = useRef<TextInput>(null);

  const inputRefs = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  const [otpp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [allOtp, setAllOtp] = useState(false);

  const enteredOtp = Object.values(otpp).join("");
  const otpMutation = useMutation({
    mutationFn: verifyOtp,
    onError: (error) => {
      console.log(error.message);
      setOtp({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
      setAllOtp(true);
      setError(true);
      setErrorMessage("Invalid OTP");
    },
    onSuccess: () => {
      setError(false);
      setErrorMessage("");
      router.push({
        pathname: `/(auth)/changePassword`,
        params: { email },
      });
    },
  });

  const handleOtp = () => {
    if (Object.values(otpp).some((value) => value === "")) {
      setAllOtp(true);
      setError(true);
      setErrorMessage("Please enter all OTP digits");
      return;
    }
    setAllOtp(false);
    otpMutation.mutate({
      otp: enteredOtp,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={30} onPress={() => router.back()} />
      </View>
      <View style={styles.svg}>
        <OtpImage />
      </View>
      
      <Text style={styles.content}>Enter the OTP number just sent to you</Text>
      {error && (
            <View style={{ width: wp('90%'), height: hp('3%'),}}>
              <Text style={{ textAlign: 'center', color: 'red', fontFamily: 'Nunito-ExtraBold', }}>{errorMessage}</Text>
            </View>
          )}
      <View style={styles.otpContainer}>
        {inputRefs.map((inputRef, index) => (
          <View key={index} style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRef}
              onChangeText={(text) => {
                const updatedOtp = { ...otpp, [index + 1]: text };
                setOtp(updatedOtp);

                if (text && index < 5) {
                  const nextInputRef = inputRefs[index + 1];
                  nextInputRef?.current?.focus();
                } else if (text && index === 5) {
                  inputRef.current?.blur();
                }
              }}
            />
          </View>
        ))}
      </View>
      
      
      <TouchableOpacity onPress={handleOtp} style={{ alignItems: "center" }}>
        <ButtonComponent title="Verify" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E2E2E2",
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  otpNumberText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 50,
  },
  otpText: {
    fontSize: 17,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: -170,
    marginLeft: 10,
  },
  svg: {
    alignItems: "center",
    marginBottom: 50,
  },
});

export default Otp;
