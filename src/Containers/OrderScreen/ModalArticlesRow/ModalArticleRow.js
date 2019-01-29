import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Title} from 'native-base';
import {withRouter} from "react-router";
import Icon from 'react-native-vector-icons/Ionicons';

import NumericInput from "react-native-numeric-input";
import Modal from "react-native-modal";

export class ModalArticleRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: this.props.visible
        }
    }

    /* handleChange=(value)=>{
         let quantCount=value;
         this.setState({value:quantCount});
         this.props.onChange(quantCount,this.props.index,this.props.itemName)
     };*/
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', width: 280, marginHorizontal: 10, marginBottom: 10}}>
                    <Text style={styles.name}>{this.props.itemName}</Text>
                    <Text style={{color:'black',fontSize:18,paddingTop:3,paddingRight:2}}>x</Text>
                    <Text style={styles.quantity}>{this.props.quantity}</Text>
                    <TouchableOpacity style={{width:20, alignItems: 'center',paddingTop:2}} onPress={() => this.props.onDelete()}>
                        <Image source={require('../../../assets/Images/trash-can-black.png')} style={{width:24,height:24,marginLeft:20}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor:'red',
        alignItems: 'center',
        marginBottom: 10
        // marginVertical: 20,
        // width: 300
    },
    name: {
        flex: 3,
        fontFamily: 'Verdana',
        fontSize: 22,
        color: 'black',

    },
    quantity: {
        fontFamily: 'Verdana',
        fontSize: 22,
        color: 'black',
    }
});

export default withRouter(ModalArticleRow);