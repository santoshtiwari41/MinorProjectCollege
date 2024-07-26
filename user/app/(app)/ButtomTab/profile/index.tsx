import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Title, Caption, Divider, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { removeData } from '@/services/asyncStorage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { RootState } from '@/redux/store';
import { Colors } from '@/constants/Colors';

const ProfileScreen: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [imageUri, setImageUri] = useState<string>("");

  const router = useRouter();

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri); // Set the image URI
    }
  };

  const handleLogout = async () => {
    await removeData();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ backgroundColor: Colors.button, height: hp('5%') }}></View>
      <View style={styles.header}>
        <TouchableOpacity onPress={selectImage}>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <FontAwesome name="camera" size={40} color="#FFF" />
                <Text style={styles.placeholderText}>Select Image</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Title style={styles.title}>{profile?.name || 'Loading...'}</Title>
        <Caption style={styles.caption}>{'@' + (profile?.email.split('@')[0] || 'username')}</Caption>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.profileInfoSection}>
        {[
          { label: 'Student ROLL:', value: profile?.crn || 'Loading...' },
          { label: 'Email:', value: profile?.email || 'Loading...' },
          { label: 'Department:', value: profile?.batch?.department?.name || 'Loading...' },
          { label: 'Year:', value: `${profile?.batch?.startYear} - ${profile?.batch?.endYear}` },
          { label: 'Phone:', value: profile?.phone || 'Loading...' }
        ].map((item, index) => (
          <View key={index} style={styles.profileInfoRow}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <Divider style={styles.divider} />

      <View style={styles.buttonSection}>
        <Button
          mode="outlined"
          style={[styles.button, { borderColor: '#4e247d' }]}
          onPress={() => router.push('/(app)/ButtomTab/profile/changePassword')}
        >
          Change Password
        </Button>
        <Button
          mode="outlined"
          labelStyle={{ color: '#8b41e0' }}
          style={[styles.button, { borderColor: '#8b41e0' }]}
          onPress={() => router.push('/ButtomTab/profile/setting')}
        >
          Settings
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={handleLogout}
        >
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.button,
    paddingBottom: hp('2%'),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Nunito-Bold',
  },
  divider: {
    marginVertical: 10, 
    width: '100%', 
    height: 2,
  },
  profileInfoSection: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  profileInfoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    width: wp('30%'), 
  },
  valueContainer: {
    flex: 1, 
    marginLeft: 10, 
  },
  value: {
    color: '#555',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  placeholder: {
    backgroundColor: 'grey',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
  },
  placeholderText: {
    color: '#FFF',
    marginTop: 5,
  },
});

export default ProfileScreen;
