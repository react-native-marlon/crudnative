import React, { useState } from 'react';
import { StyleSheet, View, Platform} from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import glogalStyles from '../styles/global';
import axios from 'axios';


const NuevoCliente = ({ navigation, route }) => {

    const { guardarConsultarAPI } = route.params;

    const [ nombre, guardarNombre] =  useState('');
    const [ telefono, guardarTelefono] =  useState('');
    const [ correo, guardarCorreo] =  useState('');
    const [ empresa, guardarEmpresa] =  useState('');

    const [ alerta, guardarAlerta] =  useState(false);

    const guardarCliente = async () => {
        // Validar
        if(nombre === '' || telefono === '' || correo === '' || guardarEmpresa === '' ) {
            guardarAlerta(true);
            return;
        }
        // Gurdar al cliente
        const cliente = { nombre, telefono, empresa, correo };
        
        try {
            const urlIos = 'http://localhost:3000/clientes';
            const urlAndroid  = 'http://10.2.2.2:3000/clientes';

            if ( Platform.OS === 'ios'){
                await axios.post(urlIos, cliente);
            } else{
                await axios.post(urlAndroid, cliente);
            }
            await axios.post(url, cliente);
        
        } catch (error) {
            console.log(error)
        }
        // Redireccionar
        navigation.navigate('Inicio');
        
        // limpiar
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');
        
        guardarConsultarAPI(true);

    }

    return (
        <View style={glogalStyles.contenedor}>
            <Headline style={glogalStyles.titulo}>Añadir Nuevo Cliente</Headline>
        
        <TextInput
            label="Nombre"
            placeholder="Marlon Falcon"
            onChangeText={texto=>guardarNombre(texto)}
            value={ nombre }
            style={styles.input}
        />

        <TextInput
            label="Telefono"
            placeholder="+1222"
            onChangeText={texto=>guardarTelefono(texto)}
            style={styles.input}
            value={ telefono }
        />


        <TextInput
            label="Correo"
            placeholder="correo@correo"
            onChangeText={texto=>guardarCorreo(texto)}
            style={styles.input}
            value={ correo }
        />

        <TextInput
            label="Empresa"
            placeholder="Nombre Empresa"
            onChangeText={texto=>guardarEmpresa(texto)}
            style={styles.input}
            value={ empresa }
        />

        <Button mode="contained" onPress={ () => guardarCliente() }>
            Guardar Cliente
        </Button>

        <Portal>
            <Dialog
                visible={alerta}
                onDismiss = { () => guardarAlerta(false) }  
            >
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Todos los campos son obligatorios</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={ ()=> guardarAlerta(false) }>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
        
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;