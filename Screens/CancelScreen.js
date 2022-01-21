import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import firebase from 'firebase';

import AppHeader from '../Components/AppHeader';
import db from '../config';

export default class CancelScreen extends React.Component{

    constructor(props){
        super(props)

        this.state={
            userUID: firebase.auth().currentUser.uid,
            email:'',
            inemail:'',
        }
    }

    getUserInfo=async()=>{
        var userInfo;

        await db.ref('users/' + this.state.userUID + '/').on('value', data=>{
            userInfo = data.val();

            this.setState({email:userInfo.email})
        })

    }

    checkEmail=async()=>{
        if(this.state.email === this.state.inemail){
            await db.ref('users/' + this.state.userUID + '/').update({
                'plan':'Cancel',
            })

            this.props.navigation.navigate('HomeScreen');
        }
        else{
            alert('This Is An Incorrect Email');
        }
    }

    componentDidMount(){
        this.getUserInfo();
    }

    render(){
        return(
            <View>
                <AppHeader/>

                <Text style={styles.title}>Kindly Enter Your Email Below</Text>

                <TextInput placeholder='Enter Your Email Here' style={styles.intxt}
                onChangeText={text=>{this.setState({inemail:text})}}/>

                <TouchableOpacity style={styles.btn}
                onPress={()=>{this.checkEmail()}}>
                    <Text style={styles.btntxt}>Cancel My Plan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}
                onPress={() => this.props.navigation.navigate('HomeScreen')}>
                    <Text style={styles.btntxt}>Back To Home</Text>
                </TouchableOpacity>

            </View>
        )
    }

}


const styles = StyleSheet.create({

    title:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },

    intxt:{
        textAlign:'center',
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 30,
        width: 300,
        height: 40,
        alignSelf: 'center',
    },

    btn:{
        backgroundColor:'deepskyblue',
        width: 250,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 50,
        borderWidth: 1,
        borderRadius: 50,
    },

    btntxt:{
        paddingTop: 25,
        paddingBottom: 25,
        fontSize: 17,
        fontWeight: 'bold',  
        textAlign: 'center',
            
    },

})