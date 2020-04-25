import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import SnapBtn from "./SnapBtn";
import {white,black,blue,grey} from '../utils/colors'
import {getLength} from '../utils/helper'

class DeckView extends Component {
	render() {
		const deck = this.props.route.params.entryId;
		const { decks } = this.props;
		const questions =decks[deck].questions

		if (deck === undefined) {
			return (
				<View>
					<Text>...loading</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<Text style={styles.mainText} >{decks[deck].title}</Text>
				<Text style = {styles.subText}>{questions? getLength(questions):null}</Text>
				<SnapBtn styles={styles} text={"Add Card"} color = {grey}
				onPress={()=> this.props.navigation.navigate('AddCard',{entryId: deck})}
				>
				</SnapBtn>

				<SnapBtn styles={styles} text={"Start Quiz"} color = {blue}
				onPress={()=> this.props.navigation.navigate('StartQuiz',{entryId: deck})}
				>
				</SnapBtn>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: white,
		padding:10,
	},
	androidBtn: {
		padding: 10,
		borderRadius: 7,
		height: 45,
		margin: 5,
		width: 170,
	},
	submitBtnText: {
		color: white,
		fontSize: 16,
		textAlign: "center",
	},
	card: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		backgroundColor: blue,
		alignSelf: "stretch",
		borderRadius: 10,
		shadowColor: "rgba(0,0,0,0.34)",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	mainText: {
		fontSize: 40,
		color: black,
	},
	subText: {
		fontSize: 30,
		color: black,
		marginBottom: 160,
	},
});

function mapStateToProps(decks) {
	return {
		decks,
	};
}
export default connect(mapStateToProps)(DeckView);
