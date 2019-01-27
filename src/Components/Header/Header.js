import React,{Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withRouter } from "react-router";

export class CustomHeader extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Header style={{width:360}}>
                    <Left>
                        <TouchableOpacity onPress={()=>alert("implement drawer")}>
                            <Image source={require('../../assets/Images/burgerIcon.png')} style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    </Left>
                    <View style={{flexDirection:'row',marginLeft:30,width:250,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.history.replace('/homeScreen')}>
                            <Image source={require('../../assets/Images/home-icon.png')} style={{width:55,height:55}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.history.replace('/orderScreen')}>
                            <Image source={require('../../assets/Images/order-icon.png')} style={{width:55,height:55}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}}>
                            <Image source={require('../../assets/Images/pending-orders-icon.png')} style={{width:55,height:55}}/>
                        </TouchableOpacity>
                    </View>
                    <Right>
                        <TouchableOpacity>
                            <Image source={require('../../assets/Images/logout.png')} style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 30
    }
});

export default withRouter(CustomHeader);