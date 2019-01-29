import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


const {uri} = '../../assets/Images/logo.gif'

export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        setTimeout(() => this.props.history.replace('/login'), 2000);
    };

    render() {

        return (
            <View style={{backgroundColor: 'white',width: '100%',height: '100%'}}>
                <Image source={require('../../assets/Images/logo.gif')} style={styles.imgContainer}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    imgContainer: {
        // backgroundColor:'black',
        // alignItems: 'center',
        marginLeft: 13,
        marginTop:'35%',
        width: 320,
        height: 320,
        // justifyContent: 'center',
        alignSelf: 'center',


    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        fontFamily: 'Raleway'
    }
})

export default SplashScreen;