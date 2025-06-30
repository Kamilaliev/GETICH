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
import * as Location from 'expo-location';
import axios from 'axios';
import CafeCard from '../CafeCard/CafeCard';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Замените на IP вашего сервера, если тестируете на реальном устройстве
  const API_URL = 'http://192.168.0.102:3000'; // Например, ваш локальный IP сервера

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
    try {
      const response = await axios.get(`${API_URL}/cafes`, {
        params: {
          lat: coords.latitude,
          lng: coords.longitude,
          timestamp: Date.now() // Для избежания кеширования
        },
        timeout: 8000
      });
      
      if (response.data?.results) {
        setCafes(response.data.results.map(cafe => ({
          ...cafe,
          workingHours: cafe.opening_hours?.open_now 
            ? 'Открыто сейчас' 
            : 'Закрыто',
          rating: cafe.rating || 'Нет оценок'
        })));
      } else {
        setCafes([]);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error.message || error);
      Alert.alert(
        'Нет соединения', 
        'Не удалось загрузить кофейни. Пожалуйста, проверьте:\n1. Запущен ли сервер\n2. Подключение к интернету'
      );
    }
  };

  const openMaps = (lat, lng, name) => {
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const appleUrl = `http://maps.apple.com/?ll=${lat},${lng}`;
    const url = Platform.OS === 'ios' ? appleUrl : googleUrl;

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
        provider={PROVIDER_GOOGLE}  // ВАЖНО: Использовать Google Maps
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
                onPress={() => openMaps(
                  item.geometry.location.lat,
                  item.geometry.location.lng,
                  item.name
                )}
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
