import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function CafeCard({ cafe, onPress }) {
  // Локальное состояние для времени работы
  const [workingHours, setWorkingHours] = useState(cafe.workingHours || '09:00 - 21:00');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{cafe.name}</Text>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={workingHours}
          onChangeText={setWorkingHours}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.hours}>Время работы: {workingHours} (нажми, чтобы изменить)</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Построить маршрут</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 6,
    color: '#5b3924',
  },
  hours: {
    fontSize: 14,
    color: '#7a5b3b',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    paddingVertical: 2,
    marginBottom: 10,
    color: '#5b3924',
  },
  button: {
    backgroundColor: '#683925',
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
