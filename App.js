import * as React from 'react';
import { View} from 'react-native';


import SwitchNavigator from './Navigation/SwitchNavigator';


export default class App extends React.Component{
  render(){
    return(
      <View style={{flex:1}}>
        <SwitchNavigator/>
      </View>
    )
  }
}