import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './views/inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

// Definir Theme 
const theme = {
  ...DefaultTheme,
  colors : {
    ...DefaultTheme.colors,
    primary: '#1754F2',
    accent: '#0655BF'
  }
}


export default function App() {
  return (
    <>
      <NavigationContainer >
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
           <Stack.Screen
            name="Inicio"
            component={Inicio}
            options = {  (  {navigation, route} ) => ({
              headerTitleAlign: 'center',
              headerLeft: (props) => <BarraSuperior {...props} 
                          navigation={ navigation }
                          route= { route}
              
              />
            })}
           />

            <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options = {{
              title: "Nuevos Clientes"
            }}
           />

          <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options = {{
              title: "Detalles Clientes"
            }}
           />
        </Stack.Navigator>
      </NavigationContainer >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
