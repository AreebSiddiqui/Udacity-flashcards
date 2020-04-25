import React from 'react'
import {StyleSheet,View,Text} from 'react-native'
import {blue,black,white,red,green} from '../utils/colors'
import {connect} from 'react-redux'
import SnapBtn from './SnapBtn'
import Anchor from './Anchor'
import {remove} from '../utils/api'

class StartQuiz extends React.Component{

    state={
        quesNum:0,
        displayQues:false,
        correct:0,
        incorrect:0
    }
    showAnswer=()=>{
        this.setState({displayQues:!this.state.displayQues})
    }
    submitAnswer=(answer)=>{
        const {quesNum} = this.state
        const deck = this.props.route.params.entryId
        const decks = this.props.decks
        const correct = decks[deck].questions[quesNum].correctAnswer.toLowerCase()

        console.log('correct: ',typeof correct)
        console.log('answer: ',typeof answer)
        if(answer === correct){
            console.log('correct answer')
            this.setState((prevState)=>({...prevState,correct:prevState.correct + 1}))
        }
        else{
            console.log('incorrectAnswer')
            this.setState((prevState)=>({...prevState,incorrect:prevState.incorrect + 1}))
        }
        this.setState((prevState)=>({quesNum: prevState.quesNum +1,displayQues:false }))
    }

     tryAgain = () => {
        this.setState({
            quesNum:0,
            displayQues:false,
            correct:0,
            incorrect:0
        })
     }
     
     back = () => {
         this.props.navigation.goBack(); 
    }

    render(){
        const {quesNum} = this.state
        const {decks} = this.props
        const deck = this.props.route.params.entryId
        const number = this.state.quesNum+1
        
        if(quesNum === decks[deck].questions.length){
            return(
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.mainText}>
                            You got {this.state.correct} out of {decks[deck].questions.length}!
                        </Text>
                        {
                        this.state.correct>this.state.incorrect
                        ?   <Text style={{fontSize:40}}>Well done 👍</Text>
                        :   <Text style={{fontSize:40}}>Sorry!</Text>
                        }
                        <SnapBtn styles={styles} text='try again' color={red}
                                 onPress ={this.tryAgain}
                        />
                        <SnapBtn styles={styles} text='back' color={green}
                                 onPress = {this.back}   
                        />
                         {/* comment out the button below to resetAsyncStorage */}
                        {/* <SnapBtn styles={styles}text='Correct' color={green} onPress={()=>remove()}/> */}
                    </View>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.question}>{number} / {decks[deck].questions.length}</Text>
                     <Text>Hello</Text>
                    {   
                        !this.state.displayQues
                        ?<Text style={styles.mainText}>{decks[deck].questions[quesNum].question}</Text>
                        :<Text style={styles.mainText}>{decks[deck].questions[quesNum].answer}</Text>
                    
                    }
                    {
                        !this.state.displayQues
                        ?<Anchor text='Show Answer'  style={styles.answer} 
                            onPress={()=>this.setState({displayQues:!this.state.displayQues})}/>
                        :<Anchor text='Show Question' style={styles.answer} 
                            onPress={()=>this.setState({displayQues:!this.state.displayQues})}/>
                    }
                    <SnapBtn styles={styles} text='Correct'  color={green} onPress={()=>this.submitAnswer("true")}/>
                    <SnapBtn styles={styles} text='Incorrect' color={red} onPress= {()=>this.submitAnswer("false")}/>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    androidBtn:{
        padding:10,
        borderRadius:7,
        height:45,
        margin:5,
        width:160
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        backgroundColor:white,
        alignSelf:'stretch',
        borderRadius:10,
        shadowColor:'rgba(0,0,0,0.34)',
        shadowOffset:{
            width:0,
            height:3
        },
        shadowRadius:4,
        shadowOpacity:1
    },
    answer:{
        fontSize:20,
        color:black,
        margin:20
    },
    questions:{
        top:0,
        left:0,
        alignSelf:'flex-start',
        color:white,
        fontSize:20,
        position:'absolute',
        margin:5,
    },
    mainText:{
        fontSize:40,
        marginTop:40,
        color:black,
        textAlign:'center'
    },
    submitBtnText:{
        fontSize:16,
        color:white,
        textAlign:'center'
    }
})
function mapStateToProps(decks){
    return{
        decks
    }
}
export default connect(mapStateToProps)(StartQuiz)