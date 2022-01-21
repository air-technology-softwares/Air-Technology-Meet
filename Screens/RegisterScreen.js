import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableOpacityBase, KeyboardAvoidingView } from 'react-native';

import firebase from 'firebase';
import db from '../config';
import AppHeader from '../Components/AppHeader';

export default class RegisterScreen extends React.Component{

    constructor(){
        super()

        this.state={
            fname:'',
            email:'',
            phone:'',
            pass:'',
            compass:'',
            plan:'none',
        }
    }

    UserSignUp=()=>{
        if(this.state.pass !== this.state.compass){
            alert('Your Passwords Do Not Match!')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(()=>{
                db.ref('users/' + firebase.auth().currentUser.uid).update({
                    name:this.state.fname,
                    email:this.state.email,
                    phone:this.state.phone,
                    plan:this.state.plan,
                })

                alert('User Created!')
            })

            .catch((error)=>{
                var error_code = error.code;
                var error_message = error.message;

                alert(error_message);
            })
        }
    }
    render(){
        return(
            <View>
                <AppHeader/>
<KeyboardAvoidingView>
                <Text style={{textAlign:'center', fontSize: 25, marginTop: 20,}}>Register Your self now</Text>
                <Text style={{textAlign:'center', marginTop: 10,}}>Note: This will only register you to our app. you will have to buy a plan from meet.airtechnology.in</Text>

                <TextInput placeholder='Enter Your Name Here' style={styles.intxt}
                onChangeText={text=>{this.setState({fname:text})}}/>

                <TextInput placeholder='Enter Your Email Here' style={styles.intxt}
                onChangeText={text=>{this.setState({email:text})}}/>

                <TextInput placeholder='Enter Your Phone Number Here' style={styles.intxt}
                onChangeText={text=>{this.setState({phone:text})}}/>

                <TextInput placeholder='Enter A Password Of Your Choice' style={styles.intxt} secureTextEntry={true}
                onChangeText={text=>{this.setState({pass:text})}}/>

                <TextInput placeholder='Kindly Comfirm Your PassWord' style={styles.intxt} secureTextEntry={true}
                onChangeText={text=>{this.setState({compass:text})}}/>

                <TouchableOpacity
                style={styles.btn}
                onPress={()=>{this.UserSignUp()}}
                >
                    <Text style={styles.btntxt}>Create</Text>

                </TouchableOpacity>

                </KeyboardAvoidingView>

                <Text style={{marginTop: 10, textAlign:'center',}} onPress={() => this.props.navigation.navigate('LoginScreen')}>Go Back</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    intxt:{
        textAlign:'center',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        width: 300,
        height: 40,
        alignSelf: 'center',
    },

    btn:{
        alignSelf:'center',
        backgroundColor:'blue',
        width: 300,
        height: 40,
        marginTop: 30,
        borderRadius: 60,
    },

    btntxt:{
        color:'white',
        fontWeight:'bold',
        fontSize: 17,
        textAlign:'center',
    },
})