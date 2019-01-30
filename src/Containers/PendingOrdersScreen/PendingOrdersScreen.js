import React, {Component} from "react";
import {StyleSheet, View, Text, Image, Button, FlatList, ScrollView} from "react-native";
import CustomHeader from "../../Components/Header/Header";
import Axios from 'axios';
import PendingOrdersRow from "./PendingOrdersRow/PendingOrdersRow";
import Spinner from "../../Components/spinner/Spinner";

const axios = Axios.create({});

export default class PendingOrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersData:[]
        };
    }

    getOrdersDetails=()=>{
        const getPendingOrdersURL = `https://uksxx8ggx7.execute-api.us-east-1.amazonaws.com/pending?user_id=${this.props.match.params.id}`
        console.log(getPendingOrdersURL)
        axios
            .get(getPendingOrdersURL)
            .then(res => {
                this.setState({ordersData:res.data})
                this.setState({isLoading:false})

            })
            .catch(err => {
                alert(err)
            })
    }

    componentDidMount() {
        this.setState({isLoading:true})
        this.getOrdersDetails();
    }

    render() {
        let ordersData=this.state.ordersData
        return (
            <View style={styles.container}>
                {this.state.isLoading?<Spinner/>:null}

                <CustomHeader/>
                <ScrollView
                    style={{marginTop: 15,marginBottom:20}}
                >
                {
                    ordersData.map((item,key)=> (
                    <PendingOrdersRow
                        index={key}
                        key={key}
                        singleOrderData={item}
                    />
                ))
                }
                </ScrollView>




            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "rgb(243,243,243)",
    },
});
