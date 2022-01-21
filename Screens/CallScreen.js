import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import firebase from 'firebase';
import db from '../config';
import AppHeader from '../Components/AppHeader';



export default class CallScreen extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userUid:firebase.auth().currentUser.uid,
            CallUrl:'',
            check:'check',
        };
    };

    createUrl=async()=>{
        var userData;
        
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            
        //specify the length for the new string
var lenString = 30;
var randomstring = '';

        //loop to select a new character in each iteration
for (var i=0; i<lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum+1);}

        await this.setState({CallUrl:'air technology '+randomstring})

        await db.ref('users/' + this.state.userUid + '/').update({
            url:this.state.CallUrl,
        })

    };

    componentDidMount(){
        this.createUrl();
    }

    render(){
        return(

            <View style={{flex:1}}>
            <AppHeader/>
            
            <WebView
            source={{uri:'https://meet.jit.si/'+this.state.CallUrl}}
            scalesPageToFit={true}
            />

            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('EndScreen')}>
                <Text style={styles.btntxt}>Leave Call</Text>
            </TouchableOpacity>

            </View>
        )
    }
}


const styles =StyleSheet.create({
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
});