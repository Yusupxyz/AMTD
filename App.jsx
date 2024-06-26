import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Beranda from './src/Beranda';
import Menu from './src/Menu';
import Detail from './src/Detail';
import Video from './src/Video';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator ();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Beranda"
          screenOptions={{
            headerShown: true,
          }}
          >
          <Stack.Screen name='Beranda' component={Beranda} 
              options={{
          headerShown: false, // change this to `false`
        }} />
          <Stack.Screen name='Menu' component={Menu}         
         options={{
          title: 'Menu',
          headerStyle: {
            backgroundColor: '#d8d0ad',
          },
          // headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
         />
          <Stack.Screen name='Detail' component={Detail} 
          options={{
            title: 'Detail',
            headerStyle: {
              backgroundColor: '#f8f4e1',
            },
            // headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
          <Stack.Screen name='Video' component={Video} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;