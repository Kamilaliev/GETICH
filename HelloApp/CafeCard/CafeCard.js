import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CafeCard({ cafe, onRoutePress }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image source={ cafe.photo } style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{cafe.name}</Text>
        <Text style={styles.address}>{cafe.vicinity}</Text>
        <Text style={styles.hours}>{cafe.workingHours}</Text>
        <Text style={styles.rating}>⭐ {cafe.rating}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#6f4e37' }]}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.buttonText}>Меню</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#388e3c' }]}
            onPress={onRoutePress}
          >
            <Text style={styles.buttonText}>Маршрут</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: 150,
    height: 150
  },
  info: {
    flex: 1,
    padding: 10
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  address: {
    fontSize: 14,
    color: '#555'
  },
  hours: {
    fontSize: 14,
    color: '#009688',
    marginTop: 4
  },
  rating: {
    fontSize: 14,
    marginTop: 2
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 13
  }
});
