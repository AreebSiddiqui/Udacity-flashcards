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
    state ={
        ans: '',
        ques: '',
        correctAns:''
    }
    submitCardDeck = (deck) => {
           const {ques,ans,correctAns} = this.state;
           this.props.dispatch(addCard({ques,ans,correctAns,deck}))
           addCardToDeck(deck,{ques,ans,correctAns})
           this.setState({ ans: '',ques: '',correctAns:''})
           this.props.navigation.goBack(); 
    }
	render() {
        const deckCardName = this.props.route.params.entryId

		return (
			<KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
			
                <View style = {styles.container}>
            		<Text style = {styles.title}>Hey! Add card to deck.</Text>
					<TextInput
                    style = {styles.input}
                    onChangeText={(ques) => this.setState({ques})}
                    value={this.state.ques}
                    placeholder="Add your question"
                    ></TextInput>
					<TextInput
                    style = {styles.input}
                    onChangeText={(ans) => this.setState({ans})}
                    value={this.state.ans}
                    placeholder="Add your answer"                    
                    ></TextInput>
					<TextInput
                    style = {styles.input}
                    onChangeText={(correctAns) => this.setState({correctAns})}
                    value={this.state.correctAns}
                    placeholder="Add the correct question"                    
                                         
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
        marginBottom:50,
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

