import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import CustomHeader from "../../Components/Header/Header";
import CustomModal from "../Modal/Modal";
import Axios from 'axios';
import Spinner from "../../Components/spinner/Spinner";

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

/*
* GET user Id>>>>
* */

const axios = Axios.create({});


export class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            morningBeverageModal: false,
            lunchModal: false,
            eveningBeverageModal: false,
            beverageDetails:[],
            morningLabel:'',
            eveningLabel:'',
        }
    };
    handleBeveragesAPI=()=>{
        const beverageURL=`https://h3sp46qcq0.execute-api.us-east-1.amazonaws.com/beverage?user_id=${this.props.match.params.id}`;
        // console.log(beverageURL)
        axios
            .get(beverageURL)
            .then(res=>{
                switch (res.data[0].morning) {
                    case 4: this.setState({morningLabel:'Coffee'})
                        break;
                    case 3: this.setState({morningLabel:'Tea'})
                        break;
                    case 7: this.setState({morningLabel:'Iced Tea'})
                        break;
                    case 8: this.setState({morningLabel:'Green Tea'})
                        break;
                    default:
                        break;
                }
                switch (res.data[0].evening) {
                    case 4: this.setState({eveningLabel:'Coffee'})
                        break;
                    case 3: this.setState({eveningLabel:'Tea'})
                        break;
                    case 7: this.setState({eveningLabel:'Iced Tea'})
                        break;
                    case 8: this.setState({eveningLabel:'Green Tea'})
                        break;
                }
                this.setState({isLoading:false})
            })
            .catch(err=>{
                alert('something wrong happened')
            })
    }

    componentDidMount(){
        this.setState({isLoading:true})
        this.getUserId();
        this.handleBeveragesAPI();
        const slotsURL=`https://4np5t34b52.execute-api.us-east-1.amazonaws.com/slots?user_id=${this.props.match.params.id}`;
        console.log(slotsURL)
        axios
            .get(slotsURL)
            .then(res=>{
                    console.log(res.data)
                    this.setState({lunchSlotsData:res.data})
                switch(res.data.selected){
                    case 0:
                        this.setState({lunchSlot:'1:30-2:00'})
                        break;
                    case 1:
                        this.setState({lunchSlot:'2:00-2:30'})
                        break;
                    case 2:
                        this.setState({lunchSlot:'2:30-3:00'})
                        break;
                    case 3:
                        this.setState({lunchSlot:'3:00-3:30'})
                        break;
                    default:
                        this.setState({lunchSlot:'Select'})

                }
                    // console.log(res.data.lunchSlots)
            })


    }

    getUserId=(key)= async ()=> {
        try {
            let id = await AsyncStorage.getItem('user_details');
            this.setState({userId:id})
        } catch (e) {
            alert(e)
        }
    }

  //handles defaults beverages specific to a user
    handlePreferencesLabels=(mornLabel,evenLabel)=>{
        switch (mornLabel) {
            case 4: this.setState({morningLabel:'Coffee',isLoading:false})
                break;
            case 3: this.setState({morningLabel:'Tea',isLoading:false})
                break;
            case 7: this.setState({morningLabel:'Iced Tea',isLoading:false})
                break;
            case 8: this.setState({morningLabel:'Green Tea',isLoading:false})
                break;
            default:
                break;

        }
        switch (evenLabel) {
            case 4: this.setState({eveningLabel:'Coffee',isLoading:false})
                break;
            case 3: this.setState({eveningLabel:'Tea',isLoading:false})
                break;
            case 7: this.setState({eveningLabel:'Iced Tea',isLoading:false})
                break;
            case 8: this.setState({eveningLabel:'Green Tea',isLoading:false})
                break;
            default:
                break;

        }
    }

    handleSlotBooking=(slotId)=>{
        switch (slotId) {
            case 0:this.setState({lunchSlot:'1:30-2:30'})
                break;
            case 1:this.setState({lunchSlot:'2:00-2:30'})
                break;
            case 2:this.setState({lunchSlot:'2:30-3:00'})
                break;
            case 3:this.setState({lunchSlot:'3:00-3:30'})
                break;


        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading?<Spinner/>:null}
                <CustomHeader
                userId={this.props.match.params.id}
                />
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

                    <View style={{flexDirection: 'row', flexWrap: 'wrap',textAlign:'center', marginLeft: 10}}>
                        <Text style={{fontSize: 20,textAlign:'center',fontFamily:'Raleway-Light'}}>You will be served </Text>
                        <TouchableOpacity
                            onPress={() => this.setState({morningBeverageModal: !this.state.morningBeverageModal})}>
                            <Text style={{fontWeight: 'bold', fontSize: 20,fontFamily:'Raleway-Bold'}}>{this.state.morningLabel} </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20,fontFamily:'Raleway-Light'}}>in the Morning, Lunch at </Text>
                        <TouchableOpacity onPress={() => this.setState({lunchModal: !this.state.lunchModal})}>
                            <Text style={{fontWeight: 'bold', fontSize: 20,fontFamily:'Raleway-Bold'}}>{this.state.lunchSlot} </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20,fontFamily:'Raleway-Light'}}>and </Text>
                        <TouchableOpacity
                            onPress={() => this.setState({eveningBeverageModal: !this.state.eveningBeverageModal})}>
                            <Text style={{fontWeight: 'bold', fontSize: 20,fontFamily:'Raleway-Bold'}}>{this.state.eveningLabel} </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20,fontFamily:'Raleway-Light'}}>in the evening.</Text>
                    </View>
                </View>

                {this.state.morningBeverageModal?
                    <CustomModal
                        userId={this.props.match.params.id}
                        morningLabel={this.state.morningLabel}
                        eveningLabel={this.state.eveningLabel}
                        modalState={this.state.morningBeverageModal}
                        title='Morning Beverage'
                        message='What would you like to start your day with?'
                        url={user.morning.url}
                        onPreferencesChange={this.handlePreferencesLabels}
                    />:null}

                {this.state.eveningBeverageModal?
                    <CustomModal
                        userId={this.props.match.params.id}
                        morningLabel={this.state.eveningLabel}
                        eveningLabel={this.state.eveningLabel}
                        modalState={this.state.eveningBeverageModal}
                        title='Evening Beverage'
                        message='Ahhh! Tiring day. Want some refreshment?'
                        url={user.evening.url}
                        onPreferencesChange={this.handlePreferencesLabels}
                    />:null}

                {this.state.lunchModal?
                    <CustomModal
                        userId={this.props.match.params.id}
                        modalState={this.state.lunchModal}
                        lunchSlotsData={this.state.lunchSlotsData}
                        title="Lunch Slots"
                        message="Have some food"
                        url={user.lunch.url}
                        onSlotsBook={this.handleSlotBooking}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(243,243,243)',
        zIndex:-100
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