import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

import {createDrawerNavigator} from 'react-navigation';
import {withNavigation} from 'react-navigation';

import Modal from "react-native-modal";
import {SplashScreen} from "../Splash Screen/splashScreen";

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false
        }
    };

    loginHandler = (e) => {
        e.preventDefault();
        alert("Logged in!");
        this.props.history.replace('/homeScreen');

    };

    newAccountHandler = (e) => {
        this.setState({isModalVisible: !this.state.isModalVisible});

    };

    render() {
        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {/*<View style={styles.titleContainer}>*/}

                        {/*</View>*/}

                        <View style={styles.infoContainer}>
                            <View style={styles.imgContainer}>
                                <Image source={require('../../assets/Images/logo.gif')} style={{width:300,height:300}}/>
                            </View>
                         <TextInput style={styles.input}
                                   placeholder="Enter the email address"
                                   placeholderTextColor='rgba(255,255,255,0.8)'
                                   keyboardType='email-address'
                                   returnKeyType='next'
                                   autoCorrect={false}
                                   onSubmitEditing={() => this.refs.txtPass}
                        />
                        <TextInput style={styles.input}
                                   placeholder="Enter the password"
                                   placeholderTextColor='rgba(255,255,255,0.8)'
                                   secureTextEntry
                                   returnKeyType='go'
                                   autoCorrect={false}
                                   ref={'txtPass'}
                        />
                        <TouchableOpacity style={styles.buttonContainer} onPress={(e) => this.loginHandler(e)}>
                            <Text style={styles.buttonText}>SIGN IN</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', justifyContent: 'center', fontWeight: 'bold'}}>
                            <Text style={{color: 'black'}}>Not a member?</Text>
                            <Text style={{color: 'black'}}
                                  onPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}> Sign
                                Up</Text>
                        </View>
                        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                            <Modal isVisible={this.state.isModalVisible}
                                   backdropOpacity={0.4}
                                   animationInTiming={700}
                                   animationOutTiming={700}
                                   animationIn='slideInDown'
                                   animationType='fade'
                                   onBackdropPress={() => this.setState({ isVisible: false })}

                            >
                                <View style={styles.modalContainer}>
                                    <TextInput style={styles.input}
                                               placeholder="Enter the name"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               keyboardType='email-address'
                                               returnKeyType='next'
                                               autoCorrect={false}
                                               onSubmitEditing={() => this.refs.txtPass}
                                    />
                                    <TextInput style={styles.input}
                                               placeholder="Enter the email address"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               keyboardType='email-address'
                                               returnKeyType='next'
                                               autoCorrect={false}
                                               onSubmitEditing={() => this.refs.txtPass}
                                    />
                                    <TextInput style={styles.input}
                                               placeholder="Enter the password"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               secureTextEntry
                                               returnKeyType='go'
                                               autoCorrect={false}
                                               ref={'txtPass'}
                                    />
                                    <TouchableOpacity style={styles.buttonContainer}
                                                      onPress={(e) => this.newAccountHandler(e)}>
                                        <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        );
    }
}


const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            backgroundColor: '#FFF',
            width: '100%',
            // paddingTop:20
            // flexDirection: 'column'
        },
    titleContainer: {
        marginVertical: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#f7c744',
        textAlign: 'center',
        fontSize: 30,
        opacity: 0.9,
        fontFamily: 'Raleway-Bold'
    },
    infoContainer: {
        position: 'relative',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
        marginTop: 50
    },
    modalContainer: {
        backgroundColor: 'lightblue',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        height: '65%',
        marginBottom: 20,
        justifyContent: 'center'

    },
    input: {
        height: 50,
        backgroundColor: 'lightgrey',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#28a745', //72c585 disbled
        paddingVertical: 15,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Raleway-Bold',
        fontSize: 20
    },
    imgContainer:{
        flexDirection: 'column',
        // height:100,
        // width:100,
        justifyContent:'flex-start',
        marginTop:-30,
        marginBottom:20,
        alignItems:'flex-end',

    }

});

export default Login;