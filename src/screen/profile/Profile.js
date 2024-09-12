import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile'); // Replace with your API URL
        setUser(response.data.user); // Assuming the API response is in `data.user`
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`text-lg text-gray-600 mt-4`}>Loading Profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <Text style={tw`text-lg text-gray-600 mt-4`}>Failed to load profile data.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-gray-100 p-4`}>
      {/* Profile Header */}
      <View style={tw`items-center bg-white p-4 rounded-lg shadow-lg`}>
        <FastImage
          style={tw`w-32 h-32 rounded-full`}
          source={{
            uri: user.urlImage,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={tw`text-2xl font-bold text-gray-800 mt-4`}>{user.fullName}</Text>
        <Text style={tw`text-lg text-gray-500`}>{user.role}</Text>
      </View>

      {/* User Information */}
      <View style={tw`mt-6 bg-white p-4 rounded-lg shadow-lg`}>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700 font-semibold`}>Phone Number</Text>
          <Text style={tw`text-base text-gray-600`}>{user.phoneNumber}</Text>
        </View>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700 font-semibold`}>Email</Text>
          <Text style={tw`text-base text-gray-600`}>{user.email}</Text>
        </View>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-700 font-semibold`}>Date of Birth</Text>
          <Text style={tw`text-base text-gray-600`}>
            {moment(user.dateOfBirth).format('MMMM D, YYYY')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;