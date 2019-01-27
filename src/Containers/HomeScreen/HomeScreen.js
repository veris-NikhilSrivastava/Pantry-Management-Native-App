import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {createDrawerNavigator, DrawerActions, DrawerItems} from "react-navigation";
import Login from "../Login/login";
import SplashScreen from "../Splash Screen/splashScreen";
import {Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-material-cards'
import Modal from "react-native-modal";
import CustomHeader from "../../Components/Header/Header";
import CustomModal from "../Modal/Modal";

const user = {

        morning:{
            beverages:[
                {
                value:'Coffee'
            },{
                 value:'Tea'
                }
            ],
            url:require('../../assets/Images/morning-beverage.png'),
            title:'Morning Beverage',
            message:'What would you like to start your day with?'
        },
        evening:{
            beverages:[{
                value:'Tea'
            },{
                value:'Coffee'
                }
                ],
            url:require('../../assets/Images/evening-beverage.jpg'),
            title:'Evening Beverage',
            message:'Ahhh! Tiring day. Want some refreshment?'

        },
        lunch: {
            timings:[
                {
                    value:'1:30'
                },
                {
                    value:'2:30'
                }
            ],
            title:'Lunch Slot',
            url:require('../../assets/Images/lunch-slot.jpg'),
            message:'Feeling hungy? Meet me in the Pantry'
        }
};


export class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            morningBeverageModal: false,
            lunchModal: false,
            eveningBeverageModal: false
        }
    };

    modalHandler=()=>{
        this.setState({
            morningBeverageModal:false,
            lunchModal: false,
            eveningBeverageModal: false

        })
    }

    render() {
        let pic = {
            uri: user.evening.url
        };
        return (
            <View style={styles.container}>
                <CustomHeader/>
                <View style={styles.infoContainer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 150,
                        marginTop: -20,
                        marginBottom: 10
                    }}>
                        <Image source={require('../../assets/Images/plate-icon.png')}
                               style={{width: 150, height: 150}}/>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10}}>
                        <Text style={{fontSize: 20}}>You will be served </Text>
                        <TouchableOpacity
                            onPress={() => this.setState({morningBeverageModal: !this.state.morningBeverageModal})}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Coffee </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20}}>in the Morning, Lunch at </Text>
                        <TouchableOpacity onPress={() => this.setState({lunchModal: !this.state.lunchModal})}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>1:30 </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20}}>and </Text>
                        <TouchableOpacity
                            onPress={() => this.setState({eveningBeverageModal: !this.state.eveningBeverageModal})}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Tea </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20}}>in the evening.</Text>
                    </View>
                </View>



                {this.state.morningBeverageModal?
                    <CustomModal
                        modalState={this.state.morningBeverageModal}
                        data={user.morning.beverages}
                        title={user.morning.title}
                        message={user.morning.message}
                        url={user.morning.url}
                    />:null}

                {this.state.eveningBeverageModal?
                    <CustomModal
                        modalState={this.state.eveningBeverageModal}
                        data={user.evening.beverages}
                        title={user.evening.title}
                        message={user.evening.message}
                        url={user.evening.url}
                    />:null}

                {this.state.lunchModal?
                    <CustomModal
                        modalState={this.state.lunchModal}
                        data={user.lunch.timings}
                        title={user.lunch.title}
                        message={user.lunch.message}
                        url={user.lunch.url}
                    />:null}


                {/* <Modal isVisible={this.state.eveningBeverageModal}
                       backdropOpacity={0.4}
                       animationInTiming={700}
                       animationOutTiming={700}
                       animationIn='slideInDown'
                       animationOut='slideOutUp'
                       animationType='fade'
                       onBackdropPress={() => this.setState({eveningBeverageModal: false})}

                >
                    <View style={styles.modalContainer}>
                        <Text style={{fontSize:37,textAlign: 'center',height:70,paddingTop:-20}}>Evening Beverage</Text>
                        <Text style={{fontSize:20,flexWrap:'wrap',textAlign:'center'}}>Endh?</Text>
                            <Image source={user.evening.url} style={{width:200,height:200}}/>
                    </View>
                </Modal>*/}
            </View>
        );
    }
}

{/*// const CustomDrawerComponent = (props) => (
                // <SafeAreaView style={{flex: 1}}>
                // <View style={{height: 150, backgroundColor: 'white'}}>
                // <Image source={require('../../assets/Images/logo.gif')}
                //                    style={{height: 120, width: 120, borderRadius: 60}}/>
                //         </View>
                //         <ScrollView>
                //             <DrawerItems {...props}/>
                //         </ScrollView>
                //     </SafeAreaView>
                //
                // );
                //
                // const AppDrawerNavigator = createDrawerNavigator({
                //
                //     // For each screen that you can navigate to, create a new entry like this:
                //     Login: Login,
                //     Splash: SplashScreen
                //
                // }, {
                //     contentComponent: CustomDrawerComponent
                // });
*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(243,243,243)'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: 'black',
        fontFamily: 'Raleway'
    },
    cardTitle: {
        fontSize: 40
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100,
        height: '45%',
        width: '90%',
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingBottom: 40,
        paddingHorizontal: 10,
        height: '75%',
        marginBottom: 20,
        justifyContent: 'center'

    },
    buttonContainer: {
        marginTop: -200,
        alignSelf: 'center'
    },
});

export default HomeScreen;