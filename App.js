import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import SplashScreen from "./src/Containers/Splash Screen/splashScreen";
import Login from "./src/Containers/Login/login";
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox
} from 'react-native-router-flux';


import {NativeRouter, Switch, Route} from 'react-router-native';
// import { BrowserRouter } from 'react-router-dom'

import {createDrawerNavigator, DrawerItems, NavigationActions} from 'react-navigation'
import {HomeScreen} from "./src/Containers/HomeScreen/HomeScreen";
import OrderScreen from "./src/Containers/OrderScreen/OrderScreen";
import PendingOrdersScreen from "./src/Containers/PendingOrdersScreen/PendingOrdersScreen";

export class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showSplash: true
        };
        setTimeout(() => this.setState({showSplash: false}), 2000);

    }

    render() {
        return (


            <NativeRouter>
                <View style={styles.container}>
                    <Switch>
                        <Route exact path="/" component={SplashScreen}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/homeScreen/:id" component={HomeScreen}/>
                        <Route exact path="/orderScreen" component={OrderScreen}/>
                        <Route exact path="/pendingOrders/:id" component={PendingOrdersScreen}/>
                    </Switch>
                </View>
            </NativeRouter>
        );
    }
}

export default App;
// const CustomDrawerComponent = (props) => (
//     <SafeAreaView style={{flex: 1}}>
//         <View style={{height: 150, backgroundColor: 'white'}}>
//             <Image source={require('./src/assets/Images/logo.gif')} sty
//                    le={{height: 120, width: 120, borderRadius: 60}}/>
//         </View>
//         <ScrollView>
//             <DrawerItems {...props}/>
//         </ScrollView>
//     </SafeAreaView>
//
// );

// const AppDrawerNavigator = createDrawerNavigator({
//
//         // For each screen that you can navigate to, create a new entry like this:
//         HomeScreen: HomeScreen,
//         Login: Login
//
//     }, {
//         contentComponent: CustomDrawerComponent,
//         // navigationOptions: ({navigation}) => ({
//         //     headerLeft: <HomeScreen navigate={navigation.navigate}/>
//         // })
//     },
//     {
//         initialRouteName: '/',
//         drawerPosition: 'left',
//         contentComponent: CustomDrawerComponent,
//         drawerOpenRoute: 'DrawerOpen',
//         drawerCloseRoute: 'DrawerClose',
//         drawerToggleRoute: 'DrawerToggle'
//     });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FFCF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});




