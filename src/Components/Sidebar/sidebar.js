import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';
import { withRouter } from "react-router";

export class Sidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){
        this.getUserId();
    }

    getUserId=async ()=>{
        let id= await AsyncStorage.getItem('user_details')
        this.setState({userId:id})

    }

    render() {
        return (
                <Modal isVisible={this.props.isSidebarVisible}
                       backdropOpacity={0.7}
                       animationInTiming={700}
                       animationOutTiming={700}
                       animationIn='slideInLeft'
                       animationOut='slideOutLeft'
                       onBackdropPress={() =>this.props.handleSidebarVisibility()}
                >
                    <View style={styles.modalContainer}>
                        <View style={{height:270,justifyContent:'flex-start',flexWrap: 'wrap'}}>
                            <Image source={require('../../assets/Images/logo.gif')} style={{marginTop:20,marginHorizontal:33,width:190,height:190}}/>
                            <Text style={{fontFamily:'Raleway-Light',fontSize:16,paddingBottom:10,paddingTop:10,color:'grey',alignSelf:'center',paddingHorizontal:12}}>Get food on your workdesk!</Text>
                        </View>

                        <TouchableHighlight underlayColor='#adebdd' style={{paddingTop: 5}} onPress={()=>this.props.history.replace(`/homeScreen/${this.state.userId}`)}>
                                <View style={{flexDirection:'row',height:70,borderTopWidth: 1,borderBottomWidth:1,borderTopColor:'lightgrey',borderBottomColor:'lightgrey'}}>
                                     <Image source={require('../../assets/Images/home-icon.png')} style={{marginLeft:10,width:55,height:55}}/>
                                     <Text style={{paddingLeft:20,paddingTop:10,fontSize:20,fontFamily:'Raleway-Light'}}>Home</Text>
                                </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#adebdd' style={{paddingTop: 5}} onPress={()=>this.props.history.replace('/orderScreen')}>
                            <View style={{flexDirection:'row',height:70,borderBottomWidth:1,borderBottomColor:'lightgrey'}}>
                                    <Image source={require('../../assets/Images/order-icon.png')} style={{marginLeft:10,width:55,height:55}}/>
                                    <Text style={{paddingLeft:20,paddingTop:10,fontSize:20,fontFamily:'Raleway-Light'}}>Orders</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#adebdd' style={{paddingTop: 5}} onPress={()=>this.props.history.replace(`/pendingOrders/${this.state.userId}`)}>
                            <View style={{flexDirection:'row',height:70,borderBottomWidth:1,borderBottomColor:'lightgrey'}}>
                                <Image source={require('../../assets/Images/pending-orders-icon.png')} style={{marginLeft:10,width:55,height:55}}/>
                                <Text style={{paddingLeft:20,paddingTop:10,fontSize:20,fontFamily:'Raleway-Light'}}>Pending Orders</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                </Modal>

        );
    }
}
const styles=StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        // borderRadius: 10,
        // paddingTop: 10,
        width:265,
        marginLeft:-17,
        // paddingBottom: 10,
        // paddingHorizontal: 10,
        height: 615,
        // justifyContent: 'center'

    },
});
export default withRouter(Sidebar);

