import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import {withRouter} from "react-router";
import NumericInput from "react-native-numeric-input";

export class ArticleRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            pressed:false
        }
    }

    //handle quantity change
    handleChange=(value)=>{
        this.setState({pressed:true})
        let quantCount=value;
        this.setState({value:quantCount});
        this.props.onChange(quantCount,this.props.index,this.props.itemName)
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection:'column',flex:1}}>
                        <Text style={styles.name}>{this.props.itemName}</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <NumericInput
                            value={this.state.value}
                            onChange={value => this.handleChange(value)}
                            totalWidth={90}
                            maxValue={this.props.maxQuantity}
                            initValue={this.state.value}
                            totalHeight={30}
                            iconSize={25}
                            minValue={0}
                            step={1}
                            rounded
                            textColor='black'
                            iconStyle={{color: 'black'}}
                            rightButtonBackgroundColor='#28a745'
                            leftButtonBackgroundColor='#28a745'/>
                    </View>
                </View>
                {/* <FlatList
                    data={item}
                    showsVerticalScrollIndicator={true}
                    renderItem={({item}) =>
                        <View style={styles.flatView}>
                            <View style={styles.flatElement}>
                                <Text style={styles.name}>{item.name}</Text>
                                <NumericInput
                                    value={this.state.value}
                                    onChange={value => this.setState({value})}
                                    totalWidth={90}
                                    initValue={this.state.value}
                                    totalHeight={30}
                                    iconSize={25}
                                    step={1}
                                    rounded
                                    textColor='black'
                                    iconStyle={{ color: 'black' }}
                                    rightButtonBackgroundColor='#28a745'
                                    leftButtonBackgroundColor='#28a745'/>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical  : 20,
        // backgroundColor: 'red',
        width: 300
    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 22,
        color: 'black',

    },
});

export default withRouter(ArticleRow);