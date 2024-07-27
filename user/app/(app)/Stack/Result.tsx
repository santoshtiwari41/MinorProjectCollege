import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title, Chip, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const results = [
  {
    semester: 'Semester 1',
    year: '2021',
    grades: [
      { subject: 'Engineering Mathematics I', grade: 'A' },
      { subject: 'Chemistry', grade: 'A' },
      { subject: 'Communication Technique', grade: 'B-' },
      { subject: 'Programming in C', grade: 'A' },
      { subject: 'Basic Electrical Engineering', grade: 'A' },
      { subject: 'Mechanical Workshop', grade: 'A' }
    ],
    sgpa: '3.84'
  },
  {
    semester: 'Semester 2',
    year: '2021',
    grades: [
      { subject: 'Engineering Mathematics II', grade: 'A' },
      { subject: 'Physics', grade: 'A' },
      { subject: 'Engineering Drawing', grade: 'C+' },
      { subject: 'Object Oriented Programming in C++', grade: 'B+' },
      { subject: 'Thermal Science', grade: 'A' },
      { subject: 'Applied Mechanics I', grade: 'A' }
    ],
    sgpa: '3.68'
  }
];

const ResultPage = () => {
  return (
    <LinearGradient colors={['#f0f4ff', '#d9e2ff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {results.map((result, index) => (
          <Card style={styles.card} key={index}>
            <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.cardGradient}>
              <Card.Content>
                <View style={styles.header}>
                  <Title style={styles.title}>{result.semester}</Title>
                  <Text style={styles.year}>{result.year}</Text>
                </View>
                <Divider style={styles.divider} />
                {result.grades.map((grade, idx) => (
                  <View key={idx} style={styles.gradeRow}>
                    <Text style={styles.subject}>{grade.subject}</Text>
                    <Chip style={styles.gradeChip} textStyle={styles.gradeText}>
                      {grade.grade}
                    </Chip>
                  </View>
                ))}
                <Divider style={styles.divider} />
                <Text style={styles.sgpa}>SGPA: {result.sgpa}</Text>
              </Card.Content>
            </LinearGradient>
          </Card>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 15,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardGradient: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  year: {
    color: '#888',
    fontStyle: 'italic',
  },
  divider: {
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subject: {
    color: '#555',
    fontSize: 16,
  },
  gradeChip: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
  },
  gradeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sgpa: {
    color: '#333',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default ResultPage;
