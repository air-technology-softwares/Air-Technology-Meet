import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AppHeader extends React.Component{
    render(){
        return(
            <View style={styles.main}>
                <Text style={styles.text}>Air Technology</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'blue',
        
    },
    text:{
        color:'white',
        fontSize: 25,
        paddingBottom: 15,
        paddingTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default AppHeader;