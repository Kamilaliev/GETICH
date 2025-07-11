import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSignUp = () => {
  if (!email || !password || !confirmPassword) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  if (password !== confirmPassword) {

    alert('Parollar uyğun gəlmir');
    return;

  }
  console.log("adawdadawd");
  
  fetch('http://192.168.0.103:3000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, passwordConfirm: confirmPassword }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'İstifadəçi uğurla qeydiyyatdan keçib') {
        alert('Uğurla qeydiyyatdan');
        navigation.navigate('Login');

      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert('Server bağlantısı xətası');
    });
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qeydiyyat  </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Parol"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Şifrəni təsdiqləyin"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Qeydiyyatdan keçin</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Artıq hesabınız var? Daxil ol</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.linkText}>Geri</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#683925',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    color: '#323232',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
