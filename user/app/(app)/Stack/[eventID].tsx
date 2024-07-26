import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
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
    <ScrollView style={styles.container}>
      <View style={{backgroundColor:Colors.button,height:hp('7%')}}>

      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Event Detail</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
        <Text style={styles.eventDescription}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: Colors.button,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: wp('4%'),
  },
  eventTitle: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#1A162B',
    marginBottom: hp('1%'),
  },
  eventDate: {
    fontSize: 16,
    color: '#7D7D7D',
    marginBottom: hp('2%'),
  },
  eventDescription: {
    fontSize: 18,
    color: '#333',
    lineHeight: hp('2.5%'),
  },
});
