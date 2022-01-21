import * as React from 'react';
import { View, Text, Button } from 'react-native';

import AppHeader from '../Components/AppHeader';


export default class EndScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <AppHeader/>
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 20, marginTop: 30, marginBottom: 50,}}>Thank You!!</Text>
                <Button title='Go To Home' onPress={() => this.props.navigation.navigate('HomeScreen')}/>
            </View>
        )
    }
}