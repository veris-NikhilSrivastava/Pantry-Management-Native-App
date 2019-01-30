import React,{Component} from 'react';
import {View,ActivityIndicator} from 'react-native';


export class Spinner extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSidebarVisible: false
        };
    }
    render(){
        return(
            <View style={{backgroundColor:'rgba(250,250,250,0.8)',zIndex:1000,top:0,left:0,position:'absolute',height:'120%',width:'100%'}}>
                <ActivityIndicator size={80} style={{position: 'absolute',alignSelf: 'center',justifyContent:'center',marginTop: '80%'}} color='rgb(0,0,0)'/>
            </View>
        );
    }
}


export default Spinner;