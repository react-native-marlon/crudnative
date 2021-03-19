import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import glogalStyles from '../styles/global';
import { List, Headline , Button, FAB, Text} from 'react-native-paper';
import axios from 'axios';

const DetallesCliente = ( { route, navigation } ) => {
    const { guardarConsultarAPI } = route.params

    const { nombre, telefono, correo, empresa, id } = route.params.item;
    
    const mostrarConfirmcion = () => {
        Alert.alert(
            'Deseas eliminar el cliente ?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si Eliminar', onPress: () => eliminarContacto() },
                { text: 'Cancelar', style: 'cancel' },
            ]
        )
    }

    const eliminarContacto = async () => {
        try {
            const url = `http://localhost:3000/clientes/${id}`;
            await axios.delete(url);
        } catch (error) {
            console.log(error);
        }


        // Redireccionar
        navigation.navigate('Inicio')
        
        // Consultar la api
        guardarConsultarAPI(true);
    }

    return (
        <View style={glogalStyles.contenedor}>
            <Headline style={glogalStyles.titulo}> { nombre } </Headline>
            <Text style={styles.texto}>Empresa: { empresa }</Text>
            <Text style={styles.texto}>Teléfono: { telefono }</Text>
            <Text style={styles.texto}>Correo: { correo }</Text>

            <Button style={styles.boton} 
                    mode="contained" 
                    icon="cancel"
                    onPress={ ()=>mostrarConfirmcion() }
                    >
                Eliminar Cliente
            </Button>

            <FAB
            icon="pencil"
            style={styles.fab}
            onPress={ ()=>navigation.navigate("NuevoCliente", { cliente: route.params.item ,guardarConsultarAPI }) }
            />


        </View>
        
    );
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton : {
        marginTop: 100,
        backgroundColor: 'red'
    },
    fab : {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }

})


export default DetallesCliente;