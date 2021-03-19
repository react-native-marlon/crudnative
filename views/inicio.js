import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import axios from 'axios';
import { List, Headline , Button, FAB} from 'react-native-paper';
import glogalStyles from '../styles/global';

const Inicio = ( { navigation } ) => {

    const [clientes, guardarClientes ] = useState([]);
    const [consultarAPI, guardarConsultarAPI ] = useState(true);

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                const urlIos = 'http://localhost:3000/clientes';
                const urlAndroid  = 'http://10.2.2.2:3000/clientes';
                let url = ""
                if ( Platform.OS === 'ios'){
                    url = urlIos
                } else{
                    url = urlAndroid
                }
                const resultado =  await axios.get(url, clientes);
                // console.log(resultado);
                guardarClientes(resultado.data);
                guardarConsultarAPI(false);

            } catch (error) {
                console.log(error)
            }
        }

        if (consultarAPI){
            obtenerClientesApi();
        }

        
    }, [ consultarAPI ]);

    return (
        <View style={glogalStyles.contenedor}>

            <Button onPress={ ()=>navigation.navigate("NuevoCliente", { guardarConsultarAPI }) }>
                + Nuevo Cliente
            </Button>

            <Headline style={glogalStyles.titulo}> {  clientes.length  > 0  ? "Clientes" : "No hay Clientes" }</Headline>

            <FlatList
              data = { clientes }
              keyExtractor = { clientes => (clientes.id).toString() }
              renderItem={ ({item}) => (
                <List.Item
                    title={ item.nombre }
                    description={ item.empresa }
                />
              )}
            />

            <FAB
            icon="plus"
            style={styles.fab}
            onPress={ ()=>navigation.navigate("NuevoCliente", { guardarConsultarAPI }) }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab : {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})

export default Inicio;