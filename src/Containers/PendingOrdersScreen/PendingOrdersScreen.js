import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button,FlatList } from "react-native";
import CustomHeader from "../../Components/Header/Header";

export default class PendingOrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderRow(data) {
        return (
            <Text style={{
                borderBottomWidth: 1,
                borderStyle:'dashed',
                borderBottomColor:'#ccc',
                textIndent: 25,
                height: 'auto',
                padding: 10,
                textTracks: 'capitalize'
            }}>{`\u2022 ${data.item_name}`}</Text>
        );
    }


    render(){

        return (
            <View style={styles.container}>
                <CustomHeader/>
               <Text>Pending Orders</Text>
                <Text>Notes</Text>

                <View style={{
                    borderLeftWidth:1,
                    borderLeftColor:'#ffaa9f',
                    borderRightWidth: 1,
                    borderRightColor:'#ffaa9f',
                    width: 3,
                    height: 495,
                    marginLeft: 40}}>

                <FlatList
                    style= {{
                        color: '#555',
                        fontSize: 50,
                        padding: 0,
                        width: 500,
                        fontFamily: 'courier',
                        borderBottomWidth: 1,
                        borderBottomColor:'#dedede'
                    }}
                    data={[
                        {
                            item_name:'juice'
                        },
                        {
                            item_name:'LMAO'
                        },
                        {
                            item_name:'greentea'
                        },
                        {
                            item_name:'aaloo'
                        },
                        {
                            item_name:'black coffee'
                        }
                    ]}
                    renderItem={({item,key})=>this.renderRow(item)}
                    />

                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        // flex: 1,
        backgroundColor: "#F5FCFF",
    },
});
