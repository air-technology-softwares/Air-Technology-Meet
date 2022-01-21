import * as React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../Screens/HomeScreen';
import CallScreen from '../Screens/CallScreen';
import EndScreen from '../Screens/EndScreen';
import SupportScreen from '../Screens/SupportScreen';
import LoginScreen from '../Screens/LoginScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ComScreen from '../Screens/ComScreen';
import CancelScreen from '../Screens/CancelScreen';
import ReconScreen from '../Screens/ReconScreen';

export default class SwitchNavigator extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <AppContainer/>
            </View>
        )
    }
}


const AppNavigator = createSwitchNavigator({        
    LoginScreen:LoginScreen, 
    HomeScreen:HomeScreen,
    CallScreen:CallScreen,
    ReconScreen:ReconScreen,
    EndScreen:EndScreen,
    ProfileScreen:ProfileScreen,
    SupportScreen:SupportScreen,
    RegisterScreen:RegisterScreen,
    CancelScreen:CancelScreen,

})

const AppContainer = createAppContainer(AppNavigator);