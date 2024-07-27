import React from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ComingSoonScreen: React.FC = () => {
  const router = useRouter();

  const back = () => {
    router.back();
  };

  const [fontsLoaded] = useFonts({
    'Nunito-Black': require('../../../assets/fonts/Nunito-Black.ttf'),
    'Nunito-Regular': require('../../../assets/fonts/Nunito-Regular.ttf'),
  });

  const image = Asset.fromModule(require('../../../assets/images/logo3.jpeg')).uri;

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <LinearGradient
      colors={['#f0f4ff', '#d9e2ff']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity style={styles.backButton} onPress={back}>
        <Ionicons name="arrow-back" size={30} color="#1A162B" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.description}>
          We’re working hard on this feature. Stay tuned for updates!
        </Text>
        <Text style={styles.placeholder}>Stay Tuned!</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Ensure the back button is above other content
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for content
    borderRadius: 20,
    paddingVertical: 30,
    elevation: 5,
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: "Nunito-Black",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontFamily: "Nunito-Regular",
    color: "#555", // Slightly lighter text color for description
    textAlign: "center",
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: "#777",
  },
});

export default ComingSoonScreen;
