import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

class Layout extends Component{
    state={
        showSidebar: Math.max(document.documentElement.clientWidth)>=1200,
        showBackdrop: false
    }
    showSidebarHandler=()=>{
        this.setState({showSidebar:true, showBackdrop: true})
    }
    hideSidebarHandler=()=>{
        this.setState({showSidebar:false, showBackdrop: false})
    }
    render(){
        return(
            <View style={{backgroundColor: '#f3f3f3', minHeight:"100vh"}}>
                <Header burgerIconHandler={this.showSidebarHandler}/>
                <Sidebar show={this.state.showSidebar} />
                <View className="container-fluid">
                    {this.props.children}
                </View>
            </View>
        )
    }
}

export default Layout;
