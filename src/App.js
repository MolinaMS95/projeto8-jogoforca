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

let hits = 0;

export default function App() {
    const hangmanStates = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];

    const [hangman, setHangman] = React.useState(hangmanStates[0])
    const [isEnabledInput, enableInput] = React.useState(true)
    const [myWord, setMyWord] = React.useState([])
    const [guess, setGuess] = React.useState("")

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
        hits = 0
        setLetters(newLetters)
        enableInput(false)
        setHangman(hangmanStates[0])
    }

    function Alphabet(props){

        function pressLetter(){
            const newLetters = [...letters]
            newLetters[props.index].disable = true
            newLetters[props.index].status = ""
            setLetters(newLetters)

            let containLetter = false
            for(let i = 0; i < myWord.length; i++){
                let letter = myWord[i].letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                if (letter === props.letter.toLowerCase()){
                    hits++
                    containLetter = true
                    myWord[i].visibility = "visible"
                }
            }
            if(hits === myWord.length){
                const correctAnswer = [...myWord]
                for(let i = 0; i < myWord.length; i++){
                correctAnswer[i].visibility = "won"
                setMyWord(correctAnswer)
                }
                enableInput(true)
                setLetters(newAlphabet)
            }
            if(!containLetter){
                let errors = hangmanStates.indexOf(hangman)
                setHangman(hangmanStates[errors+1])
                if ((errors+1) === 6){
                    const wrongAnswer = [...myWord]
                    for(let i = 0; i < myWord.length; i++){
                        wrongAnswer[i].visibility = "lost"
                        setMyWord(wrongAnswer)
                    }
                    enableInput(true)
                    setLetters(newAlphabet)
                }
            }
        }

        return(
            <button onClick={pressLetter} className={props.class} disabled={props.isDisabled} data-identifier="letter">{props.letter}</button>
        )
    }

    function checkGuess(){
        const answer = guess.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let word = ""
        for(let i = 0; i < myWord.length; i++){
            let letter = myWord[i].letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            word += letter
        }
        if(answer === word){
            const correctAnswer = [...myWord]
            for(let i = 0; i < myWord.length; i++){
                correctAnswer[i].visibility = "won"
                setMyWord(correctAnswer)
            }
            enableInput(true)
            setLetters(newAlphabet)
        }
        else{
            const wrongAnswer = [...myWord]
            for(let i = 0; i < myWord.length; i++){
                wrongAnswer[i].visibility = "lost"
                setMyWord(wrongAnswer)
                setHangman(hangmanStates[6])
            }
            enableInput(true)
            setLetters(newAlphabet)
        }
    }

    return (
        <>
            <main className="hangman">
                <img src={hangman} alt={hangman} data-identifier="game-image"/>
                <button onClick={chooseWord} data-identifier="choose-word">Escolher Palavra</button>
                <div className="target-word">
                    {myWord.map((letter, index) => <p key={index} className={letter.visibility} data-identifier="word">{letter.letter}</p>)}
                </div>
            </main>

            <section className="letters">
                {letters.map((letter, index) => <Alphabet index={index} class={letter.status} key={index} isDisabled={letter.disable} letter={letter.letter.toUpperCase()}/>)}
            </section>

            <section className="guess">
                <p>Já sei a palavra!</p>
                <input onChange={(e) => setGuess(e.target.value)} disabled={isEnabledInput} data-identifier="type-guess"/>
                <button onClick={checkGuess} data-identifier="guess-button">Chutar</button>
            </section>
        </>
    )
}