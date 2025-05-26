import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const backgroundImage = require('../assets/61d31014a73eb5f40ae23f8e3dfcb6808b44f3a1.jpg'); // Убедись, что путь правильный

const First = ({ navigation }) => {
    useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 1500); 

    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>getich.</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  }
});

export default First;
