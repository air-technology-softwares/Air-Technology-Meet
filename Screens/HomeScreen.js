import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import * as Permissions from 'expo-permissions';

import AppHeader from '../Components/AppHeader';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = { hasCameraPermissions: null, 
          userId:firebase.auth().currentUser.uid,
          userName:"",
          plan:"",
          version:"",
          all:"",
        }
      }

      getUserData=async(user)=>
      {
        var userName;
        await db.ref("users/"+user+"/").on("value",(data)=>
        {
          userName=data.val();
          this.setState({userName:userName.name, plan:userName.plan, goURl:'https://meet.airtechnology.in/plan.'});
        })
      
      }

      versionGet=async()=>
      {
        await db.ref("Version").on("value", (data)=>
        {
          var getver=data.val();
          this.setState({version:getver})
        })
      }

      userSignOut=()=>
      {
        
        firebase.auth().signOut();
        this.props.navigation.navigate("LoginScreen");
      }

      getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermissions: status === 'granted' });
      }

      componentDidMount() {
        this.getCameraPermissions();
        this.getUserData(this.state.userId);
        this.versionGet();
      }

      render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const plan=this.state.plan;
        const ver=this.state.version;
        if(ver!==7)
        {
          return(
            <View>
              <AppHeader/>
              <Text style={{textAlign:'center', marginTop:10}}>Update!</Text>
              <Text style={{textAlign:'center', marginTop:10}}>Kindly Update Your App {this.state.name} </Text>
            </View>
          )
        }
        else if(!hasCameraPermissions)
        {
          return (
            <View>
            <AppHeader/>
              <Text style={styles.acc}>
                sorry!!{this.state.userName} we did not get access to your camera kindly click the below
                button to allow 
              </Text>
             <TouchableOpacity onPress={() => {
                  this.getCameraPermissions();
                }}
                style={styles.accbtn}>
                <Text style={styles.accbtntext}>Click Here To Allow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  this.userSignOut();
                }}
                style={styles.accbtn}>
                <Text style={styles.accbtntext}>Sign Out</Text>
                </TouchableOpacity>
            </View>
          );
        }
        else if( plan ==="none" || plan==="Bronze" || plan === "Free" ||plan === "Cancel" )
        {
          return(
          <View>
          <AppHeader/>
          <Text style={{textAlign:'center', marginTop:60,}}>Sorry!! {this.state.userName}, Your {this.state.plan} Plan Does Not Support our App Kindly Upgrade To Use Our App.</Text>
          </View>
          )
        }

         else{

        return(
            <View style={{flex:1}}>
                <AppHeader/>
  
                <Text style={styles.title}>Welcome To Meet {this.state.userName}</Text>

                <Text style={styles.cont}>What Would You Like To Do Today?</Text>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('CallScreen')}>
                    <Text style={styles.btntxt}>Start A Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('ReconScreen')}>
                  <Text style={styles.btntxt}>Reconnect To Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                    <Text style={styles.btntxt}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('SupportScreen')}>
                    <Text style={styles.btntxt}>Need Help?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => {this.userSignOut()}}>
                    <Text style={styles.btntxt}>Sign Out</Text>
                </TouchableOpacity>
                
            </View>
        )
        }
      }
     
  }
    


const styles = StyleSheet.create({
    title:{
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        marginTop: 30,
    },

    cont:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 25,
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

    accbtn:{
        backgroundColor:'skyblue',
        height:40,
        marginTop:30,
          },
          accbtntext:{
        color:'black',
        fontWeight:'bold',
        fontSize:18,
        marginTop:5,
        marginLeft:82,
          },
});