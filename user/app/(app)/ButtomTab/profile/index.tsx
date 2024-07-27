import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Title, Caption, Divider, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { getData, removeData } from '@/services/asyncStorage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Asset } from 'expo-asset';
import { RootState } from '@/redux/store';
import { Colors } from '@/constants/Colors';
import { useMutation } from '@tanstack/react-query';
import { profilePicture } from '@/services/api';



const staticimg = Asset.fromModule(require("../../../../assets/images/placeholder.png")).uri;

const ProfileScreen: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [imageUri, setImageUri] = useState<string>("");

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await profilePicture(formData); 
    },
    onSuccess: () => {
      alert('Profile picture updated successfully!');
    },
    onError: (error) => {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture.');
    }
  });
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      console.log(selectedAsset);

      setImageUri(selectedAsset.uri);

      const formData = new FormData();
      formData.append('profile', {
        uri: selectedAsset.uri,
        name: selectedAsset.fileName || 'profile.jpg',
        type: selectedAsset.mimeType || 'image/jpeg',
      } as unknown as Blob); 

      mutation.mutate(formData);
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
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Image source={{ uri: staticimg }} style={styles.image} />
            )}
            <MaterialIcons name="photo-camera" size={50} color="#FFF" style={styles.camera} />
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
          onPress={() => router.push('/(app)/Stack/changePassword')}
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
  camera:{
    bottom:hp('8%'),
    left:wp('14%'),
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
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    top: hp('10%'), 
    right: -wp('5%'), 
  },
  placeholderText: {
    color: '#FFF',
    marginTop: 5,
  },
});

export default ProfileScreen;
