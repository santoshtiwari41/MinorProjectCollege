import React from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, Image } from 'react-native';
import { Card, List, Divider, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
const settingsOptions = [
  { title: 'Profile', icon: 'account' },
  { title: 'Notifications', icon: 'bell' },
  { title: 'Privacy', icon: 'shield' },
  { title: 'Language', icon: 'earth' },
  { title: 'Dark Mode', icon: 'theme-light-dark', isSwitch: true },
];

const SettingsScreen = () => {
  const router=useRouter();
  const back = () => {
    router.back();
  };
  
  const { profile } = useSelector((state: RootState) => state.profile);
  const [darkMode, setDarkMode] = React.useState(false);
console.log(profile?.profile?.image)
  return (
    <LinearGradient colors={['#f0f4ff', '#d9e2ff']} style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.profileCard}>
          <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.cardGradient}>
            <Card.Content style={styles.profileContent}>
            
              <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/80' }} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{profile?.name}</Text>
                <Text style={styles.profileEmail}>{profile?.email}</Text>
              </View>
            </Card.Content>
          </LinearGradient>
        </Card>
        {settingsOptions.map((option, index) => (
          <Card key={index} style={styles.card}>
            <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.cardGradient}>
              <List.Item
                title={option.title}
                left={(props) => <List.Icon {...props} icon={option.icon} />}
                right={(props) =>
                  option.isSwitch ? (
                    <Switch
                      value={darkMode}
                      onValueChange={() => setDarkMode(!darkMode)}
                      {...props}
                    />
                  ) : null
                }
                titleStyle={styles.listItemTitle}
              />
            </LinearGradient>
            {index < settingsOptions.length - 1 && <Divider style={styles.divider} />}
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
  profileCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  profileText: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    marginBottom: 10,
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
  listItemTitle: {
    color: '#555',
    fontSize: 16,
  },
  divider: {
    marginHorizontal: 10,
    backgroundColor: '#e0e0e0',
  },
});

export default SettingsScreen;
