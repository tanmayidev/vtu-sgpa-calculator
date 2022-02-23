import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenA from './screens/ScreenA';
import ScreenB from './screens/ScreenB';
import Header from './shared/Header'
import AppIntroSlider from 'react-native-app-intro-slider';
import { StyleSheet, Text, View, Image } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);

  function onDone(){
    setShowRealApp(true)
  }

  function RenderItem({item} ){
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (<NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header:Header
        }}
      >
        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen name="ScreenB" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 300,
    height: 300,
  },
  introTextStyle: {
    fontWeight:"bold",
    fontFamily:"monospace",
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    marginTop:15,
    fontFamily:"monospace",
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    title: 'SGPA Calculator',
    text: 'Gets the job done',
    image: require('./assets/calculatorNew.png'),
    backgroundColor: '#1b5c62',
  },
  {
    key: 's2',
    title: 'Developed By',
    text: 'Mohammed Sanaullah and Tanmayi.D',
    image: require('./assets/coding.gif'),
    backgroundColor: '#007080',
  },
  {
    key: 's3',
    text: 'Built with ❤ by Expo',
    title: 'Powered By',
    image: require('./assets/reactLogo.gif'),
    backgroundColor: '#212121',
  },
];
