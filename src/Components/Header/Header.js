import React,{Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withRouter } from "react-router";
import Sidebar from "../Sidebar/sidebar";

export class CustomHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSidebarVisible: false
        };
    }

    sidebarVisibility=()=>{
        this.setState({isSidebarVisible:false})
    }

    render(){
        return(
            <View>
                <Header style={{width:360,backgroundColor:'lightgrey',height:70}}>
                    <Left>
                        <TouchableOpacity onPress={()=>this.setState({isSidebarVisible:true},console.log(this.state.isSidebarVisible))}>
                            <Image source={require('../../assets/Images/burgerIcon.png')} style={{marginTop:10,width:40,height:40}}/>
                        </TouchableOpacity>
                    </Left>
                    <Sidebar
                        userId={this.props.userId}
                        isSidebarVisible={this.state.isSidebarVisible}
                        handleSidebarVisibility={this.sidebarVisibility}
                    />
                    <Right>
                        <TouchableOpacity onPress={()=>this.props.history.replace('/login')}>
                            <Image source={require('../../assets/Images/logout.png')} style={{marginTop:10,width:30,height:30}}/>
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
    },

});

export default withRouter(CustomHeader);