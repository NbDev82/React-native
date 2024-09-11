import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const VerifyOtp = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'Mã OTP chính xác. Vui lòng nhập mật khẩu mới.');
        navigation.navigate('ChangePassword', { email, otp });
      } else {
        Alert.alert('Thất bại', data.message || 'Mã OTP không chính xác');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác minh OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã OTP"
        onChangeText={(text) => setOtp(text)}
        value={otp}
      />
      <Button title="Xác minh OTP" onPress={handleVerifyOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default VerifyOtp;
