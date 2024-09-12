
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Use this for navigation prop
import tw from 'tailwind-react-native-classnames';
import IntroVideo from '../../../assets/videos/IntroVideo.gif'; // Assuming you are using FastImage for GIFs

const Home = ({ navigation }) => {


  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`p-4 bg-blue-500 items-center`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>Home Page</Text>
      </View>

      <View style={tw`flex-col h-96 w-full justify-center items-center`}>
        <Image
        source={IntroVideo}
        style={styles.introVideo}
      />
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.createAccountText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introVideo: {
    width: '100%',
    height: '80%',
  },
  createAccountButton: {
    backgroundColor: '#1E40AF',
    padding: 10,
    borderRadius: 10,
    marginTop: -60,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E40AF',
    textAlign: 'center',
  },
  sectionContent: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quoteImage: {
    width: '30%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default Home;