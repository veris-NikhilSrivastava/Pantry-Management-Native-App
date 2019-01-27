import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    AsyncStorage,
    Dimensions,
    TouchableOpacity, TextInput, TouchableWithoutFeedback
} from 'react-native';
import CustomHeader from "../../Components/Header/Header";
import NumericInput from 'react-native-numeric-input';
import {ArticleRow} from "./ArticleRow/ArticleRow";
import Modal from "react-native-modal";
import {ModalArticleRow} from "./ModalArticlesRow/ModalArticleRow";

export class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            itemArray: [],
            modalClosed:false

        }
    }

    /* async componentDidMount() {
         const users = await ajax.fetchUsers();
         this.setState({users});
     }*/

    saveProductDetails = () => {
        AsyncStorage.setItem('items', JSON.stringify(this.state.itemArray))
        this.display(key)
    }
    handleChangeProductQuantity = (quantity,key,name) => {
        let flag = 0;
        let arr = this.state.itemArray;
        const obj = {
            itemId: key,
            itemName:name,
            quantityOrdered: quantity
        };
        if (arr.length === 0) {
            arr.push(obj);
        } else {
            arr.map((item, index) => {
                if (item.itemId === key) {
                    item.quantityOrdered = quantity
                    flag = 1
                }
            });
            if (flag === 1)
                null;
            else
                arr.push(obj)
        }

        this.setState({itemArray: arr}, this.saveProductDetails);
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
    handleDeleteItems = (key) => {
        let arr = this.state.itemArray;
        arr.splice(key, 1);
        this.setState({itemArray: arr}, this.saveProductDetails);
        if(this.state.itemArray.length===0)
            this.setState({isModalVisible:false})
    };

    display = (key) = async () => {
        try {
            let user = await AsyncStorage.getItem('items');
            let parsed = JSON.parse(user)
            /*alert(parsed.itemId)
            console.log("parsed ")
            console.log(JSON.parse(user));*/
        } catch (e) {
            alert(e)
        }
    };


    render() {
        let data = [
            {
                "id": 1,
                "name": "Chips",
                "quantity": 3
            },
            {
                "id": 2,
                "name": "Bourbon",
                "quantity": 5
            },
            {
                "id": 3,
                "name": "Masala Peanuts",
                "quantity": 6
            },
            {
                "id": 4,
                "name": "Poha",
                "quantity": 2
            },
            {
                "id": 5,
                "name": "Maggi",
                "quantity": 9
            },
            {
                "id": 6,
                "name": "Juice",
                "quantity": 12
            },
            {
                "id": 7,
                "name": "Juice",
                "quantity": 12
            },
            {
                "id": 8,
                "name": "Juice",
                "quantity": 12
            },
            {
                "id": 9,
                "name": "Juice",
                "quantity": 12
            },

        ];
        return (
            <View style={styles.container}>
                <CustomHeader/>
                <View style={{borderRadius:10,borderColor:'lightgrey',borderBottomWidth:2,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,height: 390,marginTop:30}}>
                    <ScrollView
                        onContentSizeChange={this.onContentSizeChange}
                    >
                        {
                            data.map((item, key) => (
                                <ArticleRow
                                    modalClosed={this.state.modalClosed}
                                    modValue={this.state.value}
                                    key={key}
                                    index={key}
                                    itemName={item.name}
                                    onChange={this.handleChangeProductQuantity}
                                />

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
                       onBackdropPress={() => this.setState({ isModalVisible: false,modalClosed:!this.state.modalClosed})}
                >
                    <View style={styles.modalContainer}>
                    {this.state.itemArray.map((item,key)=>(
                        <ModalArticleRow
                            key={key}
                            onDelete={()=>this.handleDeleteItems(key)}
                            itemName={item.itemName}
                            quantity={item.quantityOrdered}
                            index={key}
                        />

                    ))}
                        <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#24973e',width:250,marginHorizontal:30,marginTop:40,height:50,borderRadius:10}} onPress={()=>alert('order placed')}>
                            <Text style={{textAlign:'center',fontSize: 23,paddingVertical: 8,paddingHorizontal: 50}}>PLACE ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#24973e',width:180,marginTop: 20,height:50,borderRadius: 10}} onPress={()=>this.setState({isModalVisible:!this.state.isModalVisible})}>
                    <Text style={{textAlign:'center',fontSize: 23,paddingVertical: 8,paddingHorizontal: 40}}>View Cart</Text>
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
        backgroundColor: 'lightblue',
        borderRadius: 10,
        paddingTop: 80,
        // paddingBottom: 10,
        paddingHorizontal: 10,
        height: '78%',
        marginTop: 18,
        justifyContent: 'center'

    },

});