import React from "react";
import { TouchableOpacity, StyleSheet} from "react-native";


export default function CafeCard({cafe, onPress}){
    <TouchableOpacity style={styles.card}>
        <Text style = {styles.name}> {cafe.name}</Text>
        <Text style= {styles.address}>{cafe.vicinity}</Text>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf4',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#d8ccc2',
    borderWidth: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5b3924',
  },
  address: {
    fontSize: 14,
    color: '#7a6a5d',
  },
});