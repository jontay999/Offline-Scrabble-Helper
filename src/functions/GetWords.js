import WORD_LIST from '../../assets/csw.json'
import WORD_LIST_TRIE from '../../assets/dict.json'

const validWords = (chars, blanks) => {
    var spellables = []
    for (var j = 0; j < WORD_LIST.length; ++j) { //for every word in word list
        var map = {}
        for (let i = 0;i<chars.length;i++){
            if(map[chars[i]]){
                map[chars[i]] += 1
            }else{
                map[chars[i]] = 1
            }
        }
        var bool = true
        var currentBlanks = blanks
        for (var k = 0; k < WORD_LIST[j].length; ++k) {//for each letter in word
            if (!map[WORD_LIST[j].charAt(k)] && currentBlanks == 0) {
                bool = false
                break
            }else if (map[WORD_LIST[j].charAt(k)]){
                map[WORD_LIST[j].charAt(k)]--
            } else if (!map[WORD_LIST[j].charAt(k)] && currentBlanks > 0){
                currentBlanks--
            }
        }
        if (bool) {
            spellables.push(WORD_LIST[j])
        }
    }
    return(spellables)
}

const GetWords = (word) => {
    let final_arr = []
    let returned = []
    let input = word.toUpperCase().split('')
    if(!word.includes('?')){
        returned =  validWords(input, 0)
    }else{
        let numberOfBlanks = (word.match(/\?/g)||[]).length
        word = word.replace(/\?/g, '')
        returned = validWords(word.toUpperCase().split(''), numberOfBlanks)
        
    }
    final_arr = Array.from(new Set(returned))
    return final_arr
}

const union = (set1, set2) => {
    return(new Set([...set1, ...set2]))
}

const validWords2 = (trie, letters, currentWord) => {
    let myWords = new Set()
    let newWord;
    for (let i = 0;i < letters.length;i++){
        if(letters[i] in trie){
            newWord = currentWord + letters[i]
            if (WORD_LIST.includes(newWord)){
                myWords.add(newWord)
            }

            myWords = union(myWords, validWords2(trie[letters[i]], letters.replace(letters[i], ''), newWord))
        }
    }
    return myWords
}

const GetWords2 = (word) => {
    let final_arr = []
    let returned = []
    let input = word.toUpperCase()
    if(!word.includes('?')){
        returned =  Array.from(validWords2(WORD_LIST_TRIE, input, ""))
    }else{
        let idx = input.indexOf('?')
        input.splice(idx, 1)
        input.push('?')
        for (let i =0;i<26;i++){
            input.pop()
            input.push(String.fromCharCode(65+i))
            returned = returned.concat(validWords(input))
        }
        
    }
    final_arr = Array.from(new Set(returned))
    return final_arr
}


export default GetWords