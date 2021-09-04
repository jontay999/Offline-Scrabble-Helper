import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput,SafeAreaView, TouchableOpacity, Keyboard, Platform, ScrollView} from 'react-native'
import WORD_LIST from '../../assets/csw.json'
import DismissKeyboard from '../components/DismissKeyboard'
import WordList from '../components/WordList'
import {FontAwesome5, Entypo} from '@expo/vector-icons'
import GetWord from '../functions/GetWords'
import CheckValidInput from '../functions/CheckValidInput'

//dictionary api, highlight blank tile letter, filter by points, form validation blank input and more than 1 letter




const IndexScreen = () => {
    const [word, setWord] = useState('')
    const [submittedWord, setSubmittedWord] = useState('')
    const [valid, setValid] = useState('')
    const [displayText, setDisplayText] = useState('')
    const [resultColor, setResultColor] = useState('red')
    const [validWords, setValidWords] = useState(false)
    const [error, setError] = useState(false)

    const input_ref = useRef()

    const tick = <FontAwesome5 style={styles.iconStyle} name="check-circle" size={24} color="green" />
    const cross = <Entypo style={styles.iconStyle} name="circle-with-cross" size={24} color="red" />

    const checkWord = (input_word) => {
        let is_valid = CheckValidInput(input_word, true)
        setError(!is_valid)
        if(!is_valid){
            setValid('')
            return null
        }
        Keyboard.dismiss()
        input_word = input_word.toUpperCase()
        if (WORD_LIST.includes(input_word)){
            setValid('true')
            setResultColor('green')
            setDisplayText(`${input_word} is a valid word.`)
        }else{
            setValid('false')
            setResultColor('red')
            setDisplayText(`${input_word} is not a valid word.`)
        }
    }


    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>CSW19 Scrabble Helper</Text>
                    <View style={{width: '100%'}}>
                        {Boolean(word) && 
                            <TouchableOpacity 
                                style={{...styles.clearButton, opacity: 0.3}} 
                                onPress={() => {
                                    setWord('');
                                    input_ref.current.focus()
                                    }}>
                                <Entypo name="cross" size={26} color="red" />
                            </TouchableOpacity>
                        }
                        <TextInput
                            ref={input_ref}
                            clearButtonMode={"while-editing"}
                            placeholder={"e.g. scrabbl?"}
                            maxLength={14}
                            autoFocus
                            autoCapitalize={"characters"}
                            autoCorrect={false}
                            style={styles.textInput}
                            value={word}
                            onChangeText={input => {
                                setWord(input)
                            }}
                            onSubmitEditing={() => checkWord(word)}    
                        />
                        { error && 
                            <Text style={{color: 'red'}}>You have entered invalid characters!</Text>
                        }
                        <Text>Enter up to 12 characters, with two blank (?) tiles.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => {
                                setValidWords(false)
                                checkWord(word)
                            }}
                        >
                            <Text style={styles.buttonText}>Check</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => {
                                let is_valid = CheckValidInput(word, false)
                                setError(!is_valid)
                                if(!is_valid){
                                    setValid('')
                                    setValidWords(false)
                                    return null
                                }
                                let words_array = Array.from(new Set(GetWord(word)))
                                let words_object = []
                                for (let i = 0; i < words_array.length; i++){
                                    words_object.push({title: words_array[i]})
                                }
                                setValidWords(words_object)
                                Keyboard.dismiss()
                                setValid('')
                                setSubmittedWord(word)
                            }}
                        >
                            <Text style={styles.buttonText}>Get Words</Text>
                        </TouchableOpacity>
                    </View>
                    {valid ? 
                        <View style={styles.resultContainer}>
                            <Text style={{...styles.resultText, color: resultColor}}>{displayText} </Text>
                            {valid == "true" ? tick : cross}
                        </View> : null}
                </View>
                <View style={{flex:1}}>
                    <View style={{flexGrow: 1}}>
                        {validWords ? 
                            <WordList validWords={validWords} inputWord={submittedWord}/>
                        : null}
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FCEFCB',
        padding: 10
    },
    titleStyle:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    titleContainer:{
        margin: 10,
        marginTop: 40,
        alignItems: 'center',
    },
    textInput:{
        marginTop: 20,
        padding: 5, 
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
        textTransform: 'uppercase'
    },
    clearButton: {
        display: (Platform.OS === 'android') ? "flex" : "none", 
        right: 5, 
        position: 'absolute', 
        top: 27, 
        zIndex: 2,
        elevation: (Platform.OS === 'android') ? 50 : 0
    },
    button:{
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#EE6F2D',
        padding: 7,
        fontSize: 20,
        borderRadius: 5,
        width: 125,
        marginHorizontal: 10
    },
    buttonText:{
        fontSize: 20,
        color: "#FCEFCB"
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    resultContainer:{
        marginTop: 25,
        flexDirection: "row",
        padding: 5
    },
    resultText:{
        fontSize: 18
    },
    iconStyle:{
        marginTop: 0
    }
})

export default IndexScreen