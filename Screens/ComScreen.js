import * as React from 'react';
import { View, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import db from '../config';
import firebase from 'firebase';

import AppHeader from '../Components/AppHeader';
import { async } from 'q';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ComScreen extends React.Component{

    constructor(){

        super()

        this.state={
            plan:''
        }
    }

    getPlan = async()=>{
        var planVal;
        await db.ref('users/' + firebase.auth().currentUser.uid + '/').on('value', data=>{
            
            planVal = data.val()

            this.setState({plan:planVal.plan});
        })
    }
    render(){            
        return(
            <View style={{flex:1}}>
                <AppHeader/>
                <WebView
                source={{uri:'https://communityhub.airtechnology.in/'}}
                scalesPageToFit={true}
                />
                <Button title='Go To Home' onPress={() => this.props.navigation.navigate('HomeScreen')}/>
            </View>
        )  
       
    }
}