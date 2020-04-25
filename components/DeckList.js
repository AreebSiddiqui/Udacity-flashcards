import React, { Component } from "react";
import { StyleSheet, View, Text, Button , ScrollView} from "react-native";
import {connect} from 'react-redux';
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import { blue, white } from "../utils/colors";
import {getLength} from '../utils/helper'
class DeckList extends Component {
    

	componentDidMount() {
		getDecks()
		.then(decks => {this.props.dispatch(receiveDecks(decks))}
		)
	}

	render() {
		const {decks} = this.props;
		if(decks===undefined){
            return(
                <View>
                    <Text>
                        loading
                    </Text>
                </View>
            )
        }
		return (
			<ScrollView style = {styles.container}>
				{Object.keys(decks).map((deck) => {
					const { title, questions } = decks[deck]
					return (
						<View key={deck} style = {styles.cardLook}>
							<Text style = {styles.cardText}>{title}</Text>
							<Text style = {styles.cardText}>{questions ? getLength(questions): null}</Text>

							<Button style = {styles.cardBtn} onPress= {()=> this.props.navigation.navigate('DeckView',{entryId:deck})} 
							title= 'view deck' />
						</View>
					);
				})}
            </ScrollView>
		);
	}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignSelf:'stretch',
        padding:5
    },
    cardLook:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:blue,
        margin:8,
        height:200,
        borderRadius:10,
        shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset:{
            width:0,
            height:3
        },
        shadowRadius:4,
        shadowOpacity:1
    },
    cardText:{
        fontSize:30,
        color:white
    },
    cardBtn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})




function mapStateToProps(decks) {
	return {decks}
}


export default connect(mapStateToProps)(DeckList);
