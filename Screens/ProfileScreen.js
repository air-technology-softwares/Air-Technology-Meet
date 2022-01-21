import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config';

import AppHeader from '../Components/AppHeader';

export default class ProfileScreen extends React.Component{

    constructor(props){
        super(props)

        this.state={
            userID:firebase.auth().currentUser.uid,
            Name:'',
            email:'',
            phone:'',
            plan:'',
        }
    }

    getUserData=async()=>{
        var userDetails;

        await db.ref('users/' + this.state.userID + '/').on('value', data=>{
            userDetails=data.val()
            this.setState({Name:userDetails.name, email:userDetails.email, phone:userDetails.phone, plan:userDetails.plan })
        })

    }

    cancelPlan=async()=>{
        var cancel;

        await db.ref('users/' + this.state.userID + '/').update({
            'plan':'Cancel',
        });
    }

    componentDidMount(){
        this.getUserData();
    }

    render(){
        return(
            <View>
                <AppHeader/>

                <Text style={styles.Det}>Name: {this.state.Name}</Text>
                <Text style={styles.Det}>Email: {this.state.email}</Text>
                <Text style={styles.Det}>Phone Number: {this.state.phone}</Text>
                <Text style={styles.Det}>Plan: {this.state.plan}</Text>
                <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.navigation.navigate('HomeScreen')}
                >
                    <Text style={styles.btntxt}>Back To Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.navigation.navigate('CancelScreen')}
                >
                    <Text style={styles.btntxt}>Cancel Plan</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Det:{
        textAlign:'center',
        fontSize:19,
        fontWeight: 'bold',
        marginTop: 30,
    },

    btn:{
        alignSelf:'center',
        backgroundColor:'red',
        width: 200,
        height:40,
        borderRadius: 20,
        marginTop: 20,
    },

    btntxt:{
        color:'white',
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
    },
});