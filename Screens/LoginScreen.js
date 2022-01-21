import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Touchable } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Helmet} from "react-helmet";

import AppHeader from '../Components/AppHeader';

export default class LoginScreen extends React.Component{

    constructor(){
        super()

        this.state = {
            Email: '',
            Pass: '',
            version: '',
            cversion: '5',
            
        }
    }
    emailLogin=(email)=>
    {
        if(email==="")
        {
            alert("Please input a valid email id")
        }
        else
        {
            firebase.auth().sendSignInLinkToEmail(email).then(()=>
            {
                alert("Link sent");
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
              });
        }

    }
    forgotPass=(email)=>
    {
        if(email==="")
        {
            alert("Please input a valid email id")
        }
        else
        {
            firebase.auth().sendPasswordResetEmail(email).then(()=>
            {
                alert("Email to reset pass has been sent");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
              });
        }

    }
    login () {
        if(this.state.Email === '' || this.state.Pass === ''){
            alert('The Above Entry Is Empty')
        }

        else{
            firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Pass)
            .then(() => {
            this.props.navigation.navigate('HomeScreen')
            last_login: Date.now();

            })

            .catch(function(error){
                var error_code = error.code
                var error_message = error.message

                alert(error_message)
            })
        }
    }

    versionCheck=async()=>{
        var Version;

        await db.ref('/').on("value", data=>{
            Version=data.val()
            this.setState({version:Version.Version})
        })

       
    }

    componentDidMount(){
        this.versionCheck()
    }

    render(){
        return(
            <View>
                <AppHeader/>

                <KeyboardAvoidingView>

                <Text style = {styles.title}>Kindly Login To Start</Text>

                <TextInput placeholder='Enter Your Email' style={styles.input} onChangeText={text => {this.setState({Email:text})}}/>

                <TextInput placeholder='Enter Your Password' style={styles.input} onChangeText={text => {this.setState({Pass:text})}} secureTextEntry={true}/>

                <Text style={styles.note}>Note that the password must be more than 6 characters</Text>

               
                <TouchableOpacity
                style={styles.btn}
                onPress={() => {this.login()}}
                >
                    <Text style={styles.btntxt}>Login</Text>
                </TouchableOpacity>

                </KeyboardAvoidingView>

                <Text onPress={() => {this.forgotPass(this.state.Email)}} style={{textAlign:'center'}}>Forgot Your Password?</Text>

                <Text onPress={() => this.props.navigation.navigate('RegisterScreen')} style={{textAlign:'center',marginTop:20}}>Do not have an account?Create one now</Text>
               

            </View>
        )

       
    }
}

const styles = StyleSheet.create({
    title:{
        textAlign:'center',
        fontSize: 19,
        marginTop: 30,
    },

    input:{
        textAlign: 'center',
        height: 60,
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 40,
    },

    note:{
        textAlign:'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25,
    },

    btn:{
        alignSelf: 'center',
        backgroundColor: 'blue',
        width: 300,
        height: 40,
        marginTop: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        alignContent: 'center',
    },

    btntxt:{
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        fontWeight: 'bold',
        fontSize: 17,
    },
});