import {StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import EventList from '@/components/eventList';
import Calendar from '@/components/CalendarComponent'; 

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Colors } from '@/constants/Colors';

const CustomCalendar = () => {
 
  return (
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
       <View style={{backgroundColor:'red',height:50}}>

       </View>
       <Calendar/>
       <EventList />
  </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
   backgroundColor:'#E2E2E2',
  
  },
});

export default CustomCalendar;
