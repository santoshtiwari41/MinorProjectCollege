import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const demoData = {
  totalClasses: 30,
  attendedClasses: 22,
  missedClasses: 8,
};

const AttendanceScreen = () => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Attendance Progress</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Classes</Text>
        <Text style={styles.cardValue}>{totalClasses}</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Classes Attended</Text>
        <Text style={styles.cardValue}>{attendedClasses}</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Classes Missed</Text>
        <Text style={styles.cardValue}>{missedClasses}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E2E2E2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 22,
    color: '#333',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default AttendanceScreen;
