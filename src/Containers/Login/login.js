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
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage
} from "react-native";

import Axios from 'axios';
import Modal from "react-native-modal";
import SpinnerButton from 'react-native-spinner-button';
const loginURL = 'https://awkn0po82h.execute-api.us-east-1.amazonaws.com/authenticate';
const signupURL = 'https://6xiyxvrwqg.execute-api.us-east-1.amazonaws.com/join';

const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const numberRegex = new RegExp('[0-9]+');
const lengthRegex = new RegExp('.{8,}');
const uppercaseRegex = new RegExp('[A-Z]+');


const axios = Axios.create({});

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            name: '',
            email: '',
            password: '',
            passwordErrorState: false,
            passwordLengthError: true,
            emailErrorState: false,
            numberInPasswordError: true,
            uppercaseInPasswordError: true,
            incorrectPasswordStatus: false,
            isLoading:false

        };
    }

    //checks for basic form validation like empty fields for SIGNUP API
    handleSignupFormValidation = (e) => {
        e.preventDefault();
        if (this.state.email === '')
            this.setState({newEmailErrorState: true})

        if (this.state.numberInPasswordError === false && this.state.newEmailErrorState === false && this.state.email !== '' && this.state.uppercaseInPasswordError === false && this.state.passwordLengthError === false)
            this.newAccountHandler();
        else {
            this.setState({newPasswordErrorState: true})
        }

    };

    //handles basic form validations like empty fields for LOGIN API
    handleLoginFormValidation = (e) => {
        this.setState({incorrectPasswordStatus: false})
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        if (email !== '' && password !== '') {
            this.setState({isLoading: true})
            this.loginHandler(e);
        }
        else {
            if (email === '' && password === '') {
                this.setState({emailErrorState: true});
                this.setState({passwordErrorState: true});
            } else {
                if (password === '')
                    this.setState({passwordErrorState: true});
                else
                    this.setState({emailErrorState: true})
            }
        }
    };

    //handles LOGIN API
    loginHandler = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post(loginURL, data)
            .then(res => {
                switch (res.status) {
                    case 200:
                        alert("Logged in!");
                        console.log("userID")
                        console.log(res.data.user_id)
                        this.setState({isLoggedIn: true,user_id:res.data.user_id,isLoading:false});
                        AsyncStorage.setItem('user_details',JSON.stringify(this.state.user_id))
                        setTimeout(()=>this.props.history.replace(`/homeScreen/${res.data.user_id}`),1500);
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                this.setState({incorrectPasswordStatus: true})
            })
    };

    //handles SIGNUP API
    newAccountHandler = (e) => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post(signupURL, data)
            .then(res => {
                alert("Successfully signed up!!");
                this.setState({isModalVisible: !this.state.isModalVisible});
            })
            .catch(err => {
                switch (err.response.status) {
                    case 409:
                        alert("Email already exists");
                        break;
                    default:
                        alert("Something went wrong");
                        break;

                }
            })

    };

    //checks for new valid password against Regexes
    validationPassword = (value) => {
        this.setState({password: value}, () => {
            this.setState({
                passwordErrorState: false,
                newPasswordErrorState:false
            })
            if (lengthRegex.test(this.state.password) !== true)//if false
                this.setState({passwordLengthError: true});
            else
                this.setState({passwordLengthError: false});

            if (numberRegex.test(this.state.password) !== true)
                this.setState({numberInPasswordError: true});
            else
                this.setState({numberInPasswordError: false});

            if (uppercaseRegex.test(this.state.password) !== true)
                this.setState({uppercaseInPasswordError: true});
            else
                this.setState({uppercaseInPasswordError: false});

            if (lengthRegex.test(this.state.password) === true && numberRegex.test(this.state.password) === true && uppercaseRegex.test(this.state.password) === true)
                this.setState({newPasswordErrorState: false,passwordErrorState:false})

            if (this.state.password === "")
                this.setState({
                    passwordErrorState: false,
                    newPasswordErrorState:false,
                    passwordLengthError: true,
                    numberInPasswordError: true,
                    uppercaseInPasswordError: true
                });
        })
    };

    //checks for email validation against regex
    validationEmail = (email) => {
        this.setState({email: email}, () => {
            this.setState({
                emailErrorState: false,
                newEmailErrorState:false
            })
            if (emailRegex.test(this.state.email) !== true)
                this.setState({emailErrorState: true,newEmailErrorState:true});
            else
                this.setState({emailErrorState: false,newEmailErrorState:false});
            if (this.state.email === "")
                this.setState({emailErrorState: false,newEmailErrorState:false});
        })
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.infoContainer}>
                            <View style={styles.imgContainer}>
                                <Image source={require('../../assets/Images/logo.gif')}
                                       style={{width: 300, height: 300}}/>
                            </View>
                            <SpinnerButton
                                indicatorCount={10}
                                isLoading={true}
                                size={50}
                                buttonStyle={{justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 50,
                                        backgroundColor: '#25CAC6',
                                    }}
                            />
                            <TextInput style={styles.input}
                                       placeholder="Enter the email address"
                                       placeholderTextColor='rgba(255,255,255,0.8)'
                                       keyboardType='email-address'
                                       returnKeyType='next'
                                       autoCorrect={false}
                                       onSubmitEditing={() => this.refs.txtPass}
                                       onChangeText={(email) => this.validationEmail(email)}
                            />
                            {this.state.emailErrorState ? (
                                <Text style={{color: 'red',marginTop:-20}}>Please enter an email!</Text>) : null}

                            <TextInput style={styles.input}
                                       placeholder="Enter the password"
                                       placeholderTextColor='rgba(255,255,255,0.8)'
                                       secureTextEntry
                                       returnKeyType='go'
                                       autoCorrect={false}
                                       ref={'txtPass'}
                                       onChangeText={(password) => this.validationPassword(password)}
                            />
                            {this.state.passwordErrorState ? (
                                <Text style={{color: 'red',marginTop:-20}}>Please enter valid password!</Text>) : null}
                            {this.state.incorrectPasswordStatus ? (
                                <Text style={{color: 'red'}}>Invalid Password!</Text>) : null}

                            <TouchableOpacity style={styles.buttonContainer} onPress={(e) => this.handleLoginFormValidation(e)}>
                                <Text style={styles.buttonText}>Login</Text>
                                {this.state.isLoading?
                                <ActivityIndicator size={50} style={{flex:1,flexDirection:'column'}} color='rgba(245, 245,245,0.5)'/>:null}
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                marginTop: 5
                            }}>
                                <Text style={{color: 'black'}}>Not a member?</Text>
                                <Text style={{color: 'black'}}
                                      onPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}> Sign
                                    Up</Text>
                            </View>
                            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                                <Modal isVisible={this.state.isModalVisible}
                                       backdropOpacity={0.7}
                                       animationInTiming={700}
                                       animationOutTiming={700}
                                       animationIn='slideInDown'
                                       animationOut='slideOutUp'
                                       transparent={true}
                                       onBackdropPress={() => this.setState({isModalVisible: false})}
                                >
                                    <View style={styles.modalContainer}>
                                        <Text style={{
                                            flexDirection: 'row',
                                            color: 'black',
                                            textAlign: 'center',
                                            fontSize: 50,
                                            marginBottom: 20
                                        }}>Signup</Text>
                                        <TextInput style={styles.input}
                                                   placeholder="Enter the name"
                                                   placeholderTextColor='rgba(255,255,255,0.8)'
                                                   keyboardType='email-address'
                                                   returnKeyType='next'
                                                   autoCorrect={false}
                                                   onSubmitEditing={() => this.refs.txtPass}
                                                   onChangeText={(name) => this.setState({name})}
                                        />
                                        <View style={{flexDirection: 'column'}}>
                                            <TextInput style={styles.input}
                                                       placeholder="Enter the email address"
                                                       placeholderTextColor='rgba(255,255,255,0.8)'
                                                       keyboardType='email-address'
                                                       returnKeyType='next'
                                                       autoCorrect={false}
                                                       onSubmitEditing={() => this.refs.txtPass}
                                                       onChangeText={(email) => this.validationEmail(email)}
                                            />
                                            {this.state.newEmailErrorState ? (
                                                <Text style={{color: 'red', alignSelf: 'flex-start',marginTop:-20}}>Please enter a
                                                    valid email!</Text>) : null}
                                        </View>
                                        <TextInput style={styles.input}
                                                   placeholder="Enter the password"
                                                   placeholderTextColor='rgba(255,255,255,0.8)'
                                                   secureTextEntry
                                                   returnKeyType='go'
                                                   autoCorrect={false}
                                                   ref={'txtPass'}
                                                   onChangeText={(value) => this.validationPassword(value)}
                                        />
                                        <View style={{marginBottom: 10}}>
                                            {this.state.newPasswordErrorState ? (
                                                <Text style={{color: 'red',marginTop:-20}}>Please enter valid
                                                    password!</Text>) : null}
                                            <View style={{flexDirection: 'row', flexWrap: 'wrap',marginTop:20}}>
                                                <Text>Make sure it contains</Text>
                                                {this.state.passwordLengthError ? (
                                                        <Text style={{color: 'red'}}> at least 8 characters</Text>) :
                                                    <Text> at least 8 characters</Text>}
                                                {this.state.numberInPasswordError ? (
                                                    <Text style={{color: 'red'}}> including a number </Text>) : (
                                                    <Text>including a number </Text>)}
                                                <Text> and</Text>
                                                {this.state.uppercaseInPasswordError ? (
                                                    <Text style={{color: 'red'}}> a uppercase letter.</Text>) : (
                                                    <Text> a uppercase letter</Text>)}
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.buttonContainer}
                                                          onPress={(e) => this.handleSignupFormValidation(e)}>
                                            <Text style={styles.buttonText}>Signup</Text>
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
        fontFamily: 'Octicon'
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
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        height: '90%',
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
        backgroundColor: '#249e40', //72c585 disbled
        flexDirection:'row',
        // flex:1,
        paddingVertical: 15,
        borderRadius: 10,
        height:65
    },
    buttonText: {
        flexDirection:'column',
        // backgroundColor:'red',
        textAlign: 'center',
        fontFamily: 'Raleway-Bold',
        fontSize: 27,
        flex:2,
         paddingLeft:10,
        marginLeft: 30,
        marginRight: -20
    },
    imgContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: -50,
        marginBottom: 30,
        alignItems: 'flex-end',

    }

});

export default Login;