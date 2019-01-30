import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";

export default class PendingOrdersRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let itemData = this.props.singleOrderData.items;
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: 'white', borderRadius: 10, width: 320}}>
                    <View style={{
                        marginHorizontal: 4,
                        marginBottom: 4,
                        borderRadius: 10,
                        borderTopColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderRightColor: 'black',
                        borderBottomColor: 'black',
                        borderLeftColor: 'black',
                        borderBottomWidth: 1,
                        marginTop: 15,
                    }}>
                        <View style={{marginBottom: 20}}>
                            <Text style={{
                                marginHorizontal: 5,
                                fontSize: 30,
                                fontFamily: 'Raleway-Regular',
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: -22,
                                marginTop: 6,
                            }}>Order #{this.props.singleOrderData.order_id}</Text>
                        </View>
                        {itemData.map((food, key) => (
                            <View key={key} style={{flexDirection: 'row', paddingTop: 3}}>
                                <View>
                                    <Text style={{
                                        fontFamily: 'Raleway-Light',
                                        fontSize: 16,
                                        paddingLeft: 20,

                                    }}>{food.item_name} x {food.order_qty}</Text>
                                </View>
                            </View>
                        ))}
                        {itemData.map((itemTime,key)=>(
                            <View key={key} style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                                <Text style={{paddingRight:5,marginTop:-20}}>{itemTime.timestamp.substr(itemTime.timestamp.indexOf('T')+1,5)}</Text>
                            </View>
                        ))}

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: "rgb(243,243,243)",
        marginBottom: 5,
        marginTop: 10
    },
});


