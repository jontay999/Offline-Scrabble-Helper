import React from 'react'
import {View, Text, StyleSheet, SectionList} from 'react-native'

const WordList = ({validWords, inputWord}) => {
    let all_words = []
    let final_words = []
    let organized_words = []
    for (let i = 0; i< validWords.length; i++){
        all_words.push(validWords[i]["title"])
    }
    
    for (let i=0;i < inputWord.length -1; i++){
        organized_words.push({
            title: `${i+2} letter words`,
            data: [""]
        })
    }
    
    for (let i=0;i<all_words.length;i++){
        organized_words[all_words[i].length-2]["data"][0] += `${all_words[i]} `
    }

    for (let i =0;i<organized_words.length;i++){
        if (organized_words[i]["data"][0] !== ""){
            final_words.push(organized_words[i])
        }
    }

    final_words.reverse()

    const Item = ({ words }) => {
        return (
            <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 18, lineHeight: 24}}>{words}</Text>
            </View>
            
        )
    };


    return (
        <View style={{marginHorizontal:10}}>
            <SectionList
                ListHeaderComponent={<Text style={{fontSize: 20, fontWeight: "bold"}}>{validWords.length} words found</Text>}
                scrollEnabled={true}
                stickySectionHeadersEnabled={false}
                style={{padding: 3}}
                sections={final_words}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item words={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{marginVertical: 3}}>
                        <Text style={{fontSize: 20, color: "#EE6F2D"}}>{title}</Text>
                    </View>
                )}
            />
        </View>
        )
}

const styles = StyleSheet.create({})

export default WordList
