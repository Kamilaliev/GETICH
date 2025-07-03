import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Linking,
  Alert,
  Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import terra from "../assets/terra.png"
import moffie from "../assets/coffemofiie.png"
import united from "../assets/United.jpg"

import CafeCard from '../CafeCard/CafeCard';

const { width, height } = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyC0_QjeURgqq5F0W7UA87YU-hLZ647PSzU'; // Вставь свой ключ

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Требуется разрешение',
          'Для работы карты необходимо разрешение на геолокацию',
          [{ text: 'OK' }]
        );
        return;
      }

      setLoading(true);
      try {
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        setLocation(loc.coords);
        await fetchCafes(loc.coords);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось определить ваше местоположение');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchCafes = async (coords) => {
    const staticCafes = [
      {
        place_id: 'terra-coffee-1',
        name: 'Terra Coffee',
        vicinity: '28 May Street 15, Baku',
        geometry: {
          location: {
            lat: 40.3773,
            lng: 49.8526
          }
        },
        opening_hours: { open_now: true },
        rating: 4.7,
        photo: terra,
        workingHours: 'Открыто до 23:00',
        menuUrl: 'https://terra-coffee.az/menu'
      },
      {
        place_id: 'coffee-shop-2',
        name: 'Coffee Moffie',
        vicinity: 'Rashid Behbudov Street 49, Baku',
        geometry: {
          location: {
            lat: 40.3781,
            lng: 49.8492
          }
        },
        opening_hours: { open_now: true },
        rating: 4.5,
        photo: moffie,
        workingHours: 'Открыто до 22:30',
        menuUrl: 'https://coffeemoffie.az/menu'
      },
      {
        place_id: 'coffee-shop-3',
        name: 'United Coffee Beans ',
        vicinity: '28 Mall, Baku',
        geometry: {
          location: {
            lat: 40.3788,
            lng: 49.8567
          }
        },
        opening_hours: { open_now: false },
        rating: 4.6,
        photo: united,
        workingHours: 'Закрыто (открывается в 09:00)',
        menuUrl: 'https://espressolab.az/menu'
      }
    ];

    setCafes(staticCafes);
  };

  const openMaps = (lat, lng, name) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lng}`,
      android: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    });

    Linking.openURL(url).catch(() => {
      Alert.alert('Ошибка', 'Не удалось открыть карты');
    });
  };

  if (loading || !location) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Определяем ваше местоположение...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
      >
        {selectedCafe && (
          <MapViewDirections
            origin={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            destination={{
              latitude: selectedCafe.geometry.location.lat,
              longitude: selectedCafe.geometry.location.lng
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="blue"
            mode="WALKING"
          />
        )}

        {cafes.map((cafe) => (
          <Marker
            key={cafe.place_id}
            coordinate={{
              latitude: cafe.geometry.location.lat,
              longitude: cafe.geometry.location.lng,
            }}
            title={cafe.name}
            description={cafe.vicinity}
            onPress={() => setSelectedCafe(cafe)}
          />
        ))}
      </MapView>

      <View style={styles.listContainer}>
        <Text style={styles.header}>Кофейни рядом</Text>
        {cafes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Не найдено кофеен поблизости</Text>
          </View>
        ) : (
         <FlatList
  data={cafes}
  keyExtractor={(item) => item.place_id}
  renderItem={({ item }) => (
    <CafeCard
      cafe={item}
      onRoutePress={() => setSelectedCafe(item)}  // Правильно
      onMenuPress={() => navigation.navigate('Menu', { cafe: item })}
    />
  )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    width: '100%',
    height: height * 0.4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  listContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f8f8'
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#888'
  },
  listContent: {
    paddingBottom: 20
  }
});
