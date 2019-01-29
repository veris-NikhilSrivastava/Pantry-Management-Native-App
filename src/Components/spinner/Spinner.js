import React,{Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withRouter } from "react-router";
import Sidebar from "../Sidebar/sidebar";

export class Spinner extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSidebarVisible: false
        };
    }

    sidebarVisibility=()=>{
        this.setState({isSidebarVisible:false})
        console.log('sidebarFalse')
    }

    render(){
        return(
            <View style={styles.container}>
                                <ActivityIndicator size={100} color="rgba(61, 160, 4,0.5)"/>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.4)',
    },

});

export default Spinner;