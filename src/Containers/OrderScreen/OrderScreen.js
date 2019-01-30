import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    AsyncStorage,
    Image,
    TouchableOpacity,
} from 'react-native';
import CustomHeader from "../../Components/Header/Header";
import NumericInput from 'react-native-numeric-input';
import {ArticleRow} from "./ArticleRow/ArticleRow";
import Modal from "react-native-modal";
import {ModalArticleRow} from "./ModalArticlesRow/ModalArticleRow";
import Axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast'
import Spinner from "../../Components/spinner/Spinner";


const inventoryURL='https://2kyff8ynsi.execute-api.us-east-1.amazonaws.com/inventory';
const orderURL='https://gthxv5x713.execute-api.us-east-1.amazonaws.com/orders';

const axios=Axios.create({});
export class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            itemArray: [],
            modalClosed: false,
            inventoryData:[],
            updatedQty:0,
            stockOutFlag:false
        }
    }

    //getting user id from Async storage
    getUserId=async ()=>{
        let id= await AsyncStorage.getItem('user_details')
        this.setState({userId:id})

    }

    componentDidMount(){
        this.setState({isLoading:true})
        this.getUserId();
        this.getInventoryData();
    }

    getInventoryData=()=>{
        axios
            .get(inventoryURL)
            .then(res=>{
                this.setState({inventoryData:res.data,isLoading:false})
            })
            .catch(err=>{
                alert("Oops! Something went wrong!")
            })
    }

    /* saveProductDetails = () => {
         AsyncStorage.setItem('items', JSON.stringify(this.state.itemArray))
         this.display(key)
     }*/

    //handles product quantity change and updates it to Async
    handleChangeProductQuantity = (quantity, key, name) => {
        let flag = 0;
        let arr = this.state.itemArray;
        const obj = {
            item_id: ++key,
            item_name: name,
            qty: quantity
        };
        if (arr.length === 0) {
            arr.unshift(obj);
        } else {
            arr.map((item, index) => {
                if (item.item_id === key) {
                    item.qty = quantity
                    flag = 1
                }
            });
            if (flag === 1)
                null;
            else
                arr.unshift(obj)
        }

        this.setState({itemArray: arr});
        console.log(this.state.itemArray)
        /*// console.log(this.state.itemArray)
        // arr[key]['quantityOrdered']=quantity;

        /!*arr.forEach((item,key)=>{
            if(item.itemId===key)s
                this.setState({quantityOrdered:quantity})
            else
                arr.push(obj);
        });*!/

        // arr[obj.itemId]['quantityOrdered']=quantity;*/
    }

    //handles item deletion from cart
    handleDeleteItems = (key) => {
        let arr = this.state.itemArray;
        arr.map((item,index)=>{
            console.log("key is below")
            console.log(key)
            console.log("index is below")
            console.log(index)

            if (index === key)
            {
                if(item.qty>1)
                {
                    console.log("im here")
                    --item.qty
                }
                else
                {
                    console.log("im splice")
                    arr.splice(key, 1);
                }
            }
        })

        this.setState({itemArray: arr}, this.saveProductDetails);
        console.log("deleted below")
        console.log(this.state.itemArray)
        if (this.state.itemArray.length === 0)
            this.setState({isModalVisible: false})
    };

    display = (key) = async () => {
        try {
            let user = await AsyncStorage.getItem('items');
            let parsed = JSON.parse(user)
            /*alert(parsed.itemId)
            console.log("parsed ")
            */
            console.log("ASyn");
            console.log(JSON.parse(user));
        } catch (e) {
            alert(e)
        }
    };

    //handle place order API
    placeOrder=()=>{
        this.setState({isLoading:true})
        let data=this.state.itemArray;
        const orderData={
            user_id:this.state.userId,
            orderItems:data
        };
        axios
            .post(orderURL,orderData)//4
            .then(res=>{
                alert('order Placed');
                this.getInventoryData();
                this.setState({isModalVisible:false})
                this.setState({isLoading:false})

            })
            .catch(err=>{
                console.log(err.response.data);
                this.getInventoryData();
                err.response.data.map((responseItem,key)=>{
                    if(responseItem.qty===0){
                        this.state.itemArray.map((item,key)=>{
                            if(responseItem.item_name===item.item_name)
                            {
                                // let updatedQuantity=responseItem.qty;
                                this.setState({updatedQty:responseItem.qty,stockOutFlag:true})
                                // console.log(item.updatedQty)
                            }
                        })
                    }
                })
            }
            )
    }


    render() {
        let data = this.state.inventoryData;
        console.log("inventory is")
        console.log(data)
        return (
            <View style={styles.container}>
                {this.state.isLoading?<Spinner/>:null}
                <CustomHeader/>
                <Text style={{fontFamily:'Raleway-Regular',color:"grey",marginTop:10,fontSize:45, textAlign:'center'}}>Inventory</Text>
                <View style={{height: 390, marginTop: 7}}>
                    {data.length===0?<Text style={{fontFamily:'Raleway-Light',color:"grey",marginTop:70,marginLeft:5,marginRight:5,fontSize:28,textAlign:'center'}}>Sorry! People are very hungry. We'll restock the items soon</Text>:null}
                    <ScrollView
                        onContentSizeChange={this.onContentSizeChange}
                    >
                        {
                            data.map((item, key) => (
                                    item.qty?
                                        <ArticleRow
                                            modalClosed={this.state.modalClosed}
                                            modValue={this.state.value}
                                            key={key}
                                            maxQuantity={item.qty}
                                            index={key}
                                            itemName={item.item_name}
                                            onChange={this.handleChangeProductQuantity}
                                        />:null
                            ))
                        }
                    </ScrollView>
                </View>

                <Modal isVisible={this.state.isModalVisible}
                       backdropOpacity={0.7}
                       animationInTiming={700}
                       animationOutTiming={700}
                       animationIn='slideInDown'
                       animationOut='slideOutUp'
                       onBackdropPress={() => this.setState({
                           isModalVisible: false,
                           modalClosed: !this.state.modalClosed
                       })}
                >
                    <View style={styles.modalContainer}>
                        <Text style={{fontSize:35,textAlign:'center',paddingBottom: 20,fontFamily:'Raleway-Light'}}>Order Summary</Text>
                        <Image source={require('../../assets/Images/empty-cart.jpg')}style={{width:160,height:100,marginHorizontal:80,marginBottom:10}}/>
                        <ScrollView>
                            {this.state.itemArray.map((item, key) => (
                                <ModalArticleRow
                                    key={key}
                                    onDelete={() => this.handleDeleteItems(key)}
                                    itemName={item.item_name}
                                    quantity={this.state.stockOutFlag?this.state.updatedQty:item.qty}
                                    index={key}
                                />

                            ))}
                        </ScrollView>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgba(210,38,49,0.7)',
                            width: 250,
                            marginHorizontal: 30,
                            marginVertical: 10,
                            height: 50,
                            borderRadius: 10
                        }} onPress={() => this.placeOrder()}>
                            <Text style={{textAlign: 'center',color:'white',fontSize: 22,fontFamily:'Raleway-Light', paddingVertical: 10, paddingHorizontal: 50}}>PLACE
                                ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    backgroundColor: '#24973e',
                    width: 180,
                    marginTop: 15,
                    height: 50,
                    borderRadius: 10
                }} onPress={() => this.setState({isModalVisible: !this.state.isModalVisible})}>
                    <Text style={{textAlign: 'center', fontSize: 23, paddingVertical: 10, paddingHorizontal: 40}}>View
                        Cart</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default OrderScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(243,243,243)',
    },
    flatView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 30,
        width: 300,
        borderRadius: 2,
    },
    flatElement: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 18
    },
    quantity: {
        color: 'red'
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 10,
        // paddingBottom: 10,
        paddingHorizontal: 10,
        height: '70%',
        marginTop: 18,
        justifyContent: 'center'

    },

});