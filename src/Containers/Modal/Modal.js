import React,{Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import Axios from 'axios';
import Spinner from "../../Components/spinner/Spinner";
const beverageURL='https://h3sp46qcq0.execute-api.us-east-1.amazonaws.com/beverage'

const axios = Axios.create({});
export class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state={
            modalState:this.props.modalState,
        }
    }


    //handles preferences setting PATCH API
    handlePreferences=(value)=> {
        this.setState({morningPref:4});
        this.setState({eveningPref:4});
        if(this.props.title==='Morning Beverage')
        {
            switch(value)
            {
                case 'Coffee':
                    this.setState({morningPref:4});
                    break;
                case 'Tea':
                    this.setState({morningPref:3});
                    break;
                case 'Iced Tea':
                    this.setState({morningPref:7});
                    break;
                case 'Green Tea':
                    this.setState({morningPref:8});
                    break;
                default:
                    break;
            }
        }
        else{
            switch(value)
            {
                case 'Coffee':
                    this.setState({eveningPref:4});
                    break;
                case 'Tea':
                    this.setState({eveningPref:3});
                    break;
                case 'Iced Tea':
                    this.setState({eveningPref:7});
                    break;
                case 'Green Tea':
                    this.setState({eveningPref:8});
                    break;
                default:
                    break;

            }
        }
        this.setState({isLoading:true})
        const obj= {
            user_id: this.props.userId,
            morning: this.state.morningPref,
            evening: this.state.eveningPref
        }

        axios
            .patch(beverageURL,obj)
            .then(res=>{
                this.props.onPreferencesChange(this.state.morningPref,this.state.eveningPref)
                this.setState({modalState:false})
                this.setState({isLoading:false})
            })
            .catch(err=>{
                console.log(err.response)
            })
    }


    render(){
        let data = [
            {
            value:'Coffee'}
            ,
            {value:'Tea'}
            , {
            value:'Iced Tea'
            },
        ];
        return(
            <View style={styles.container}>
                {this.state.isLoading?<Spinner/>:null}
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
                        <Text style={{fontSize:37,textAlign: 'center',height:70,paddingTop:-20,color:'black'}}>{this.props.title}</Text>
                        <Text style={{fontSize:20,flexWrap:'wrap',textAlign:'center'}}>{this.props.message}</Text>
                        <Image source={this.props.url} style={{width:200,height:200}}/>
                        <Dropdown
                            containerStyle={{width:'80%'}}
                            label='Set Preference'
                            dropdownPosition={-2}
                            data={data}
                            // value={this.state.value}
                            onChangeText={(value)=>this.handlePreferences(value)}
                        />
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
        marginVertical: 30,
        zIndex: -40
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingBottom: 40,
        paddingHorizontal: 10,
        height: '75%',
        marginBottom: 20,
        alignItems:'center',
        justifyContent: 'center',
        zIndex: -40

    },
});

export default CustomModal;