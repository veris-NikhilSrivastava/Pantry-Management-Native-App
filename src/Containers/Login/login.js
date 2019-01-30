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
import Spinner from "../../Components/spinner/Spinner";
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
        this.setState({isLoading:true})
        e.preventDefault();
        if (this.state.email === '')
            this.setState({newEmailErrorState: true,isLoading:false})

        if (this.state.numberInPasswordError === false && this.state.newEmailErrorState === false && this.state.email !== '' && this.state.uppercaseInPasswordError === false && this.state.passwordLengthError === false)
            this.newAccountHandler();
        else {
            this.setState({newPasswordErrorState: true,isLoading:false})
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
                this.setState({passwordErrorState: true,isLoading:false});
            } else {
                if (password === '')
                    this.setState({passwordErrorState: true,isLoading:false});
                else
                    this.setState({emailErrorState: true,isLoading:false})
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
                        console.log("userID")
                        console.log(res.data.user_id)
                        this.setState({isLoggedIn: true,user_id:res.data.user_id});
                        AsyncStorage.setItem('user_details',JSON.stringify(this.state.user_id))
                        setTimeout(()=>this.props.history.replace(`/homeScreen/${res.data.user_id}`),1500);
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                this.setState({incorrectPasswordStatus: true,isLoading:false})
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
                this.setState({isLoading:false})
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
                newPasswordErrorState:false,
                incorrectPasswordStatus:false
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
                    uppercaseInPasswordError: true,
                    incorrectPasswordStatus:false
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
                {this.state.isLoading?<Spinner/>:null}
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.infoContainer}>
                            <View style={styles.imgContainer}>
                                <Image source={require('../../assets/Images/logo.gif')}
                                       style={{width: 250, height: 250}}/>
                            </View>
                            <TextInput style={styles.input}
                                       placeholder="Enter the email address"
                                       placeholderTextColor='rgb(255,255,255)'
                                       keyboardType='email-address'
                                       returnKeyType='next'
                                       autoCorrect={false}
                                       onSubmitEditing={() => this.refs.txtPass}
                                       onChangeText={(email) => this.validationEmail(email)}
                            />
                            {this.state.emailErrorState ? (
                                <Text style={{color: 'red',fontFamily:'Raleway-Light',marginTop:-20}}>Please enter an email!</Text>) : null}

                            <TextInput style={styles.input}
                                       placeholder="Enter the password"
                                       placeholderTextColor='rgb(255,255,255)'
                                       secureTextEntry
                                       returnKeyType='go'
                                       autoCorrect={false}
                                       ref={'txtPass'}
                                       onChangeText={(password) => this.validationPassword(password)}
                            />
                            {this.state.passwordErrorState ? (
                                <Text style={{color: 'red',marginTop:-20,fontFamily:'Raleway-Light'}}>Please enter valid password!</Text>) : null}
                            {this.state.incorrectPasswordStatus ? (
                                <Text style={{color: 'red',marginTop:-20,fontFamily:'Raleway-Light'}}>Invalid Password!</Text>) : null}

                            <TouchableOpacity style={styles.buttonContainer} onPress={(e) => this.handleLoginFormValidation(e)}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                marginTop: 5
                            }}>
                                <Text style={{color: 'black',fontFamily:'Raleway-Bold'}}>Not a member?</Text>
                                <Text style={{color: 'black',fontFamily:'Raleway-Bold'}}
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
                                       onBackdropPress={() => this.setState({isModalVisible: false,newEmailErrorState:false,newPasswordErrorState:false})}
                                >
                                    <View style={styles.modalContainer}>
                                        <Text style={{
                                            flexDirection: 'row',
                                            color: 'black',
                                            textAlign: 'center',
                                            fontSize: 50,
                                            marginBottom: 20,
                                            fontFamily:'Raleway-Bold'
                                        }}>Signup</Text>
                                        <TextInput style={styles.input}
                                                   placeholder="Enter the name"
                                                   placeholderTextColor='rgb(255,255,255)'
                                                   keyboardType='email-address'
                                                   returnKeyType='next'
                                                   autoCorrect={false}
                                                   onSubmitEditing={() => this.refs.txtPass}
                                                   onChangeText={(name) => this.setState({name})}
                                        />
                                        <View style={{flexDirection: 'column'}}>
                                            <TextInput style={styles.input}
                                                       placeholder="Enter the email address"
                                                       placeholderTextColor='rgb(255,255,255)'
                                                       keyboardType='email-address'
                                                       returnKeyType='next'
                                                       autoCorrect={false}
                                                       onSubmitEditing={() => this.refs.txtPass}
                                                       onChangeText={(email) => this.validationEmail(email)}
                                            />
                                            {this.state.newEmailErrorState ? (
                                                <Text style={{color: 'red',fontFamily:'Raleway-Light', alignSelf: 'flex-start',marginTop:-20}}>Please enter a
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
                                                <Text style={{color: 'red',fontFamily:'Raleway-Light',marginTop:-20}}>Please enter valid
                                                    password!</Text>) : null}
                                            <View style={{fontFamily:'Raleway-Light',flexDirection: 'row', flexWrap: 'wrap',marginTop:20}}>
                                                <Text style={{fontFamily:'Raleway-Light',}}>Make sure it contains</Text>
                                                {this.state.passwordLengthError ? (
                                                        <Text style={{fontFamily:'Raleway-Light',color: 'red'}}> at least 8 characters</Text>) :
                                                    <Text style={{fontFamily:'Raleway-Light'}}> at least 8 characters</Text>}
                                                {this.state.numberInPasswordError ? (
                                                    <Text style={{color: 'red',fontFamily:'Raleway-Light',}}> including a number </Text>) : (
                                                    <Text style={{fontFamily:'Raleway-Light',}}>including a number </Text>)}
                                                <Text style={{fontFamily:'Raleway-Light',}}> and</Text>
                                                {this.state.uppercaseInPasswordError ? (
                                                    <Text style={{color: 'red',fontFamily:'Raleway-Light',}}> a uppercase letter.</Text>) : (
                                                    <Text style={{fontFamily:'Raleway-Light',}}> a uppercase letter</Text>)}
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
        fontFamily: 'Century-Gothic'
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
        fontFamily:'Raleway-Light',
        backgroundColor: 'lightgrey',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#606e34', //72c585 disbled249e40
        paddingVertical: 15,
        borderRadius: 10,
        height:65,
        marginTop:20
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Raleway-Light',
        fontSize: 27,
        color:'white'
    },
    imgContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: -40,
        marginBottom: 50,
        alignItems: 'flex-end',
        paddingRight: 35,

    }

});

export default Login;