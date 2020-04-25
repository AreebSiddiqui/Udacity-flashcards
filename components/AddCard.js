import React, { Component } from "react";
import { blue, white } from "../utils/colors";
import { addCard } from "../actions";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";

import {
	StyleSheet,
	View,
    Text,
	TouchableOpacity,
	TextInput,
    KeyboardAvoidingView
} from "react-native";

class AddCard extends Component {
    state = {
        answer: '',
        question: '',
        correctAnswer:''
    }
    submitCardDeck = (deck) => {
           const {question,answer,correctAnswer} = this.state;
           this.props.dispatch(addCard({question,answer,correctAnswer,deck}))
           addCardToDeck(deck,{question,answer,correctAnswer})
           this.setState({ answer: '',question: '',correctAnswer:''})
           this.props.navigation.goBack(); 
    }
	render() {
        const deckCardName = this.props.route.params.entryId

		return (
			<KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
			
                <View style = {styles.container}>
            		<Text style = {styles.title}> Add your question</Text>
					<TextInput
                    style = {styles.input}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    
                    ></TextInput>
            		<Text style = {styles.title}>Answer to show!</Text>

					<TextInput
                    style = {styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    ></TextInput>

            		<Text style = {styles.title}>Please type true or false</Text>
					<TextInput
                    style = {styles.input}
                    onChangeText={(correctAnswer) => this.setState({correctAnswer})}
                    value={this.state.correctAnswer}
                                     
                                         
                    ></TextInput>
                    <TouchableOpacity style = {styles.submitBtn} onPress = {()=>this.submitCardDeck(deckCardName)}>
                        <Text style = {styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},submitBtnText:{
        color:white,
        fontSize:16,
        textAlign:'center'
    },
    title:{
        fontSize:22,
        color:'#333',
        
    },
    submitBtn:{
        borderWidth:0.5,
        borderColor:'#d6d7da',
        padding:10,
        backgroundColor:blue,
        borderRadius:7,
        overflow:'hidden'
    },
    input:{
        width:250,
        height:40,
        padding:8,
        borderWidth:1,
        borderColor:'#757575',
        margin:10,
        borderRadius:7
    }
})
export default connect()(AddCard)

