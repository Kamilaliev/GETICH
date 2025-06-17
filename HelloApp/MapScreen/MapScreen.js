import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import CafeCard from '../CafeCard/CafeCard';

const { width, height } = Dimensions.get('window');
const GOOGLE_API_KEY = 'AIzaSyC0_QjeURgqq5F0W7UA87YU-hLZ647PSzU';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchCafes(loc.coords);
    })();
  }, []);

  const fetchCafes = async (coords) => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=1000&type=cafe&key=${GOOGLE_API_KEY}';
    const res = await axios.get(url);
    setCafes(res.data.results);
  };

  const openRoute = (lat, lng) => {
    const link = 'https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}';
    Linking.openURL(link);
  };

  if (!location) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#a0764b" />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {cafes.map((cafe) => (
          <Marker
            key={cafe.place_id}
            coordinate={{
              latitude: cafe.geometry.location.lat,
              longitude: cafe.geometry.location.lng,
            }}
            title={cafe.name}
            onPress={() => setSelectedCafe(cafe)}
          />
        ))}
      </MapView>

      <View style={styles.listContainer}>
        <Text style={styles.header}>Ближайшие кофейни</Text>
        <FlatList
          data={cafes}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <CafeCard
              cafe={item}
              onPress={() => openRoute(item.geometry.location.lat, item.geometry.location.lng)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width,
    height: height * 0.5,
  },
  listContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fdf7f2',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#5b3924',
  },
});