import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function Second({ navigation }) {
    return (
        <ImageBackground
            source={require('../../assets/0a79b35f93cd27d1c6bcfc3a56ba51e79f01a676.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Getich{"\n"}nədir?</Text>
                <Text style={styles.subtitle}>Getich — bu mobil tətbiqdir, yaxınlıqdakı kafeləri tapmağa, onlayn qəhvə sifariş etməyə və növbə gözləmədən götürməyə imkan verir.</Text>

                <View style={styles.indicatorWrapper}>
                    <View style={styles.dot} />
                    <View style={styles.activeDot} />
                    <View style={styles.dot} />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('Third')}
                >
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        color: '#ddd',
        marginTop: 8,
        marginBottom: 20
    },
    indicatorWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4
    },
    activeDot: {
        width: 20,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#6C3F2B',
        marginHorizontal: 4
    },
    button: {
        backgroundColor: '#6C3F2B',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Second
