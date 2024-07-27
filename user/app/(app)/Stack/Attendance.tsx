import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const demoData = {
  totalClasses: 30,
  attendedClasses: 20,
  missedClasses: 10,
};

const AttendanceScreen = () => {
  const router = useRouter();
  const { totalClasses, attendedClasses, missedClasses } = demoData;
  const attendancePercentage = (attendedClasses / totalClasses) * 100;

  const pieChartData = [
    {
      name: 'Attended',
      population: attendedClasses,
      color: '#4CAF50',
      legendFontColor: '#000',
      legendFontSize: 15,
    },
    {
      name: 'Missed',
      population: missedClasses,
      color: '#F44336',
      legendFontColor: '#000',
      legendFontSize: 15,
    },
  ];

  const back = () => {
    router.back();
  };

  return (
    <LinearGradient colors={['#E2E2E2', '#C9C9C9']} style={styles.gradient}>
      <View style={{ height: hp('7%'), backgroundColor: Colors.button }}></View>
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" size={30} color="#1A162B" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Attendance Progress</Text>

        <View style={styles.card}>
          <Ionicons name="school-outline" size={30} color="#4CAF50" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Total Classes</Text>
            <Text style={styles.cardValue}>{totalClasses}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="checkmark-done-outline" size={30} color="#4CAF50" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Classes Attended</Text>
            <Text style={styles.cardValue}>{attendedClasses}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="close-outline" size={30} color="#F44336" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Classes Missed</Text>
            <Text style={styles.cardValue}>{missedClasses}</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <PieChart
            data={pieChartData}
            width={width - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Attendance Progress</Text>
          <ProgressBar
            progress={attendancePercentage / 100}
            color="#4CAF50"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {attendancePercentage.toFixed(2)}% Attended
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingTop: 0,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    marginTop: 10,
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    color: '#1A162B',
    marginBottom: 20,
    fontFamily: 'Nunito-ExtraBold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardContent: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 17,
    color: '#1A162B',
    marginBottom: 5,
    fontFamily: 'Nunito-SemiBold',
  },
  cardValue: {
    fontSize: 22,
    color: '#333',
  },
  chartContainer: {
    alignItems: 'center',
    
  },
  progressContainer: {
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    color: '#1A162B',
    marginBottom: 10,
    fontFamily: 'Nunito-Bold',
  },
  progressBar: {
    width: '100%',
    height: 1,
    borderRadius: 5,
    backgroundColor: '#E2E2E2', 
  },
  progressText: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nunito-SemiBold',
  },
});

export default AttendanceScreen;
