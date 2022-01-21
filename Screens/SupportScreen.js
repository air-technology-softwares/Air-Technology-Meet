import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import AppHeader from '../Components/AppHeader';
import firebase from 'firebase';
import db from '../config';

export default class SupportScreen extends React.Component{
    render(){
        return(
            <View>
                <AppHeader/>

                <Text style={styles.info}>To Get The Best Help Kindly Check Below:-</Text>
                <Text style={styles.info}>Kindly Visit: https://meet.airtechnology.in/</Text>
                <Text style={styles.info}>Call Us On: +912249612614</Text>

                <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate('HomeScreen')}>
                    <Text style={styles.btntxt}>Back To Home</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    info:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
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
