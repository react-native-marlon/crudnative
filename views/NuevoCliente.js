import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const NuevoCliente = ( { navigation } ) => {

    return (
        <View style={styles.contenendor}>
            <Text style={styles.texto}>Nuevo Cliente</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenendor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: '#000'
    }
})

export default NuevoCliente;