import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useLocalSearchParams,useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Params = {
  id: string;
  date: string;
  title: string;
  description: string;
};
export default function EventDetail() {
  const router = useRouter();
  const { id, date, title, description } = useLocalSearchParams<Params>();
  const back = () => {
    router.back();
  };
  return (
      <View
    style={styles.container}
  >
    <View style={{backgroundColor:Colors.button,height:hp('7%')}}></View>
    <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" size={30} color="#1A162B" />
        </TouchableOpacity>
        <Text style={styles.title}>Event List</Text>
      </View>
    <Text>hello</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    gap: hp('2%')
  },
  title: {
    fontSize: 24,
    fontFamily:'Nunito-Bold',
    flexShrink: 1,
  },
  
});
