import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import firebase from 'firebase';

import db from '../config';
import AppHeader from '../Components/AppHeader';

export default class ReconScreen extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userUid: firebase.auth().currentUser.uid,
            callUrl:'',
        };
    }

    getUserInfo=async()=>{
        var userData;

        await db.ref('users/' + this.state.userUid + '/').on('value', data=>{
            userData = data.val();
        })

        if(userData.url !== ''){
            this.setState({callUrl:'https://meet.jit.si/'+userData.url,})
        }

        else{
            alert('No Link Found');

            this.props.navigation.navigate('HomeScreen');
        }
    }

    componentDidMount(){
        this.getUserInfo();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <AppHeader/>

                <WebView source={{uri:this.state.callUrl}}
                scalesPageToFit={true}/>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('EndScreen')}>
                <Text style={styles.btntxt}>Leave Call</Text>
            </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    btn:{
        backgroundColor:'red',
        textAlign: 'center',
        alignSelf: 'center',
        width: 1000,
       
    },

    btntxt:{
        paddingTop: 25,
        paddingBottom: 25,
        fontSize: 17,
        fontWeight: 'bold',  
        textAlign: 'center',
    },
})