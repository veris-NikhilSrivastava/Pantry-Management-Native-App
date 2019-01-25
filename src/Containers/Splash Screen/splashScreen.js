import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


const {uri}='../../assets/Images/logo.gif'
export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        setTimeout(() => this.props.history.replace('/login'), 2000);
    };

    render() {

        return (
            <Image source={require('../../assets/Images/logo.gif')} style={styles.imgContainer}/>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        // backgroundColor:'black',
        alignItems:'center',
        marginLeft:20,
        width:'50%',
        height:'50%',


    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        fontFamily: 'Raleway'
    }
})

export default SplashScreen;