import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OffCanvasReveal from "react-native-off-canvas-menu/offcanvasReveal";
import SplashScreen from "../../Containers/Splash Screen/splashScreen";

export default class Sidebar extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen:false
        };
    }

    handleMenu=()=>{
        const {menuOpen} = this.state
        this.setState({
            menuOpen: !menuOpen
        })
    }

    render() {
        return (
            <OffCanvasReveal
                active={this.state.menuOpen}
                onMenuPress={()=>this.handleMenu()}
                backgroundColor={'#222222'}
                menuTextStyles={{color: 'white'}}
                handleBackPress={true}
                menuItems={[
                    {
                        title: 'Menu 1',
                        icon: <Icon name="camera" size={35} color='#ffffff' />,
                    },
                    {
                        title: 'Menu 2',
                        icon: <Icon name="bell" size={35} color='#ffffff' />,
                        renderScene: <SplashScreen/>
                    }
                ]}/>
        );
    }
}

