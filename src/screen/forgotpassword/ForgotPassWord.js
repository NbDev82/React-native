import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'OTP đã được gửi đến email của bạn');
        navigation.navigate('VerifyOtp', { email });
      } else {
        Alert.alert('Thất bại', data.message || 'Đã xảy ra lỗi');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Gửi mã OTP" onPress={handleSendOtp} />
      <View style={styles.loginRedirect}>
        <Text>Nhớ mật khẩu? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </Pressable>
      </View>
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
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
