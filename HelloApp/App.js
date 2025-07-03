import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import First from './Giris/FirstScreen/First'
import Welcome from './Giris/Welcome/Welcome'
import Third from './Giris/ThirdScreen/Third'
import Second from './Giris/SecondScreen/Second'
import MainScreen from './Authentification/MainScreen/MainScreen'
import LoginScreen from './Authentification/LoginScreen/LoginScreen'
import SignUpScreen from './Authentification/SighUpScreen/SighUp'
import MapScreen from './MapScreen/MapScreen'
import Menu from './CafeMenu/Menu'



  const Stack =  createStackNavigator()

function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='First' screenOptions={{headerShown : false}}>
        <Stack.Screen name='First' component={First} />
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Third' component={Third}/>
        <Stack.Screen name='Second' component={Second}/>
        <Stack.Screen name='Main'  component={MainScreen}/>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='SignUp' component={SignUpScreen}/>
        <Stack.Screen name='MapScreen' component={MapScreen}/>
        <Stack.Screen name='Menu' component={Menu}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

