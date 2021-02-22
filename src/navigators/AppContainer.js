import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '@screens/Home'
import Detail from '@screens/Detail'

const Stack = createStackNavigator()

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: "Rooms" }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ title: "Reservations" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
