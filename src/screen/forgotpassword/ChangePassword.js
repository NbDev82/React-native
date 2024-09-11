import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ChangePassword = ({ navigation, route }) => {
  const { email, otp } = route.params;
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'Mật khẩu đã được đặt lại. Vui lòng đăng nhập.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Thất bại', data.message || 'Đặt lại mật khẩu thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lại mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu mới"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
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

export default ChangePassword;
