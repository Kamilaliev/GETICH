import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import terra from "../assets/terra.png"

export default function CafeMenu() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Coffee');

  const categories = ['Coffee', 'Tea', 'Milkshake', 'Lemonade'];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Coffee Ser</Text>
      </View>

      {/* Promo block */}
      <View style={styles.promo}>
        <View style={{ flex: 1 }}>
          <Text style={styles.promoTime}>Time 9:00 AM – 22:00 PM</Text>
          <Text style={styles.promoText}>By one,{"\n"}get one for free</Text>
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>Buy now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/terra.png")} // замените на свою локальную картинку
          style={styles.promoImage}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryBlock}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryBtn,
                selectedCategory === category && styles.categorySelected
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Future: render menu items by category */}
      <View style={styles.placeholder}>
        <Text style={{ color: '#aaa' }}>Burada mallar olacaq: {selectedCategory}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backBtn: {
    marginRight: 10
  },
  backText: {
    fontSize: 22,
    color: '#6f4e37'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333'
  },
  promo: {
    backgroundColor: '#c09e84',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  promoTime: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5
  },
  promoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  buyBtn: {
    backgroundColor: '#6f4e37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  buyText: {
    color: '#fff',
    fontSize: 13
  },
  promoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 10
  },
  categoryBlock: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333'
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  categoryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6f4e37'
  },
  categoryText: {
    color: '#6f4e37'
  },
  categorySelected: {
    backgroundColor: '#6f4e37'
  },
  categoryTextSelected: {
    color: '#fff'
  },
  placeholder: {
    marginTop: 50,
    alignItems: 'center'
  }
});

