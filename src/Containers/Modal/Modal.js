import React,{Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Modal from "react-native-modal";

export class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state={
            modalState:this.props.modalState
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Modal isVisible={this.state.modalState}
                       backdropOpacity={0.4}
                       animationInTiming={700}
                       animationOutTiming={700}
                       animationIn='slideInDown'
                       animationOut='slideOutUp'
                       animationType='fade'
                       onBackdropPress={() =>this.setState({modalState:false})}
                >
                    <View style={styles.modalContainer}>
                        <Text style={{fontSize:37,textAlign: 'center',height:70,paddingTop:-20}}>{this.props.title}</Text>
                        <Text style={{fontSize:20,flexWrap:'wrap',textAlign:'center'}}>{this.props.message}</Text>
                        <Image source={this.props.url} style={{width:200,height:200}}/>
                    </View>
                </Modal>
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
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingBottom: 40,
        paddingHorizontal: 10,
        height: '75%',
        marginBottom: 20,
        alignItems:'center',
        justifyContent: 'center'

    },
});

export default CustomModal;