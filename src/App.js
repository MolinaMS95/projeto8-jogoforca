import React from "react"

import "./reset.css"
import "./style.css"

import hangman0 from "./assets/forca0.png"
import hangman1 from "./assets/forca1.png"
import hangman2 from "./assets/forca2.png"
import hangman3 from "./assets/forca3.png"
import hangman4 from "./assets/forca4.png"
import hangman5 from "./assets/forca5.png"
import hangman6 from "./assets/forca6.png"
import palavras from "./assets/palavras.js"

export default function App() {
    const hangmanStates = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];

    const [hangman, setHangman] = React.useState(hangmanStates[0])
    const [isEnabledInput, enableInput] = React.useState(true)
    const [myWord, setMyWord] = React.useState([])

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const newAlphabet = [];
    for (let i = 0; i < alphabet.length; i++){
        newAlphabet[i] = {letter: alphabet[i], disable: true, status: ""}
    }
    const [letters, setLetters] = React.useState(newAlphabet)

    function chooseWord() {
        const randomIndex = Math.floor(Math.random() * palavras.length)
        const word = palavras[randomIndex]
        console.log(word)
        const wordArray = [];
        for (let i = 0; i < word.length; i++){
            wordArray[i] = {letter: word[i], visibility: ""}
        }
        setMyWord(wordArray)

        const newLetters = [...letters]
        for(let i = 0; i < newLetters.length; i++){
            newLetters[i].disable = false
            newLetters[i].status = "enabled"
        }
        setLetters(newLetters)
        enableInput(false)
    }

    function Alphabet(props){

        function pressLetter(){
            const newLetters = [...letters]
            newLetters[props.index].disable = true
            newLetters[props.index].status = ""
            setLetters(newLetters)

            let containLetter = false
            const newMyWord = [...myWord]
            for(let i = 0; i < myWord.length; i++){
                let letter = myWord[i].letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                if (letter === props.letter.toLowerCase()){
                    containLetter = true
                    newMyWord[i].visibility = "visible"
                }
            }
            if(!containLetter){
                let errors = hangmanStates.indexOf(hangman)
                setHangman(hangmanStates[errors+1])
            }
        }

        return(
            <button onClick={pressLetter} className={props.class} disabled={props.isDisabled}>{props.letter}</button>
        )
    }

    return (
        <>
            <main className="hangman">
                <img src={hangman} alt={hangman} />
                <button onClick={chooseWord}>Escolher Palavra</button>
                <div className="targetWord">
                    {myWord.map((letter, index) => <p key={index} className={letter.visibility}>{letter.letter}</p>)}
                </div>
            </main>

            <section className="letters">
                {letters.map((letter, index) => <Alphabet index={index} class={letter.status} key={index} isDisabled={letter.disable} letter={letter.letter.toUpperCase()}/>)}
            </section>

            <section className="guess">
                <p>Já sei a palavra!</p>
                <input disabled={isEnabledInput} />
                <button>Chutar</button>
            </section>
        </>
    )
}