import React from "react"
import GlobalStyle from './GlobalStyle.js'
import styled from "styled-components"

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
    for (let i = 0; i < alphabet.length; i++) {
        newAlphabet[i] = { letter: alphabet[i], disable: true, status: "" }
    }
    const [letters, setLetters] = React.useState(newAlphabet)

    function chooseWord() {
        const randomIndex = Math.floor(Math.random() * palavras.length)
        const word = palavras[randomIndex]
        console.log(word)
        const wordArray = [];
        for (let i = 0; i < word.length; i++) {
            wordArray[i] = { letter: word[i], visibility: "" }
        }
        setMyWord(wordArray)

        const newLetters = [...letters]
        for (let i = 0; i < newLetters.length; i++) {
            newLetters[i].disable = false
            newLetters[i].status = "enabled"
        }
        hits = 0
        setLetters(newLetters)
        enableInput(false)
        setHangman(hangmanStates[0])
        setGuess("")
    }

    function Alphabet(props) {

        function pressLetter() {
            const newLetters = [...letters]
            newLetters[props.index].disable = true
            newLetters[props.index].status = ""
            setLetters(newLetters)

            let containLetter = false
            for (let i = 0; i < myWord.length; i++) {
                let letter = myWord[i].letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                if (letter === props.letter.toLowerCase()) {
                    hits++
                    containLetter = true
                    myWord[i].visibility = "visible"
                }
            }
            if (hits === myWord.length) {
                const correctAnswer = [...myWord]
                for (let i = 0; i < myWord.length; i++) {
                    correctAnswer[i].visibility = "won"
                    setMyWord(correctAnswer)
                }
                enableInput(true)
                setLetters(newAlphabet)
            }
            if (!containLetter) {
                let errors = hangmanStates.indexOf(hangman)
                setHangman(hangmanStates[errors + 1])
                if ((errors + 1) === 6) {
                    const wrongAnswer = [...myWord]
                    for (let i = 0; i < myWord.length; i++) {
                        wrongAnswer[i].visibility = "lost"
                        setMyWord(wrongAnswer)
                    }
                    enableInput(true)
                    setLetters(newAlphabet)
                }
            }
        }

        return (
            <LetterButton onClick={pressLetter} className={props.class} disabled={props.isDisabled} data-identifier="letter">{props.letter}</LetterButton>
        )
    }

    function checkGuess() {
        const answer = guess.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let word = ""
        for (let i = 0; i < myWord.length; i++) {
            let letter = myWord[i].letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            word += letter
        }
        if (answer === word) {
            const correctAnswer = [...myWord]
            for (let i = 0; i < myWord.length; i++) {
                correctAnswer[i].visibility = "won"
                setMyWord(correctAnswer)
            }
            enableInput(true)
            setLetters(newAlphabet)
        }
        else {
            const wrongAnswer = [...myWord]
            for (let i = 0; i < myWord.length; i++) {
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
            <GlobalStyle />
            <Hangman>
                <img src={hangman} alt={hangman} data-identifier="game-image" />
                <button onClick={chooseWord} data-identifier="choose-word">Escolher Palavra</button>
                <TargetWord>
                    {myWord.map((letter, index) => <Word key={index} className={letter.visibility} data-identifier="word">{letter.letter}</Word>)}
                </TargetWord>
            </Hangman>

            <Letters>
                {letters.map((letter, index) => <Alphabet index={index} class={letter.status} key={index} isDisabled={letter.disable} letter={letter.letter.toUpperCase()} />)}
            </Letters>

            <Guess>
                <p>Já sei a palavra!</p>
                <input value={guess} onChange={(e) => setGuess(e.target.value)} disabled={isEnabledInput} data-identifier="type-guess" />
                <button onClick={checkGuess} data-identifier="guess-button">Chutar</button>
            </Guess>
        </>
    )
}

function handleWordVisibility(status) {
    switch (status) {
        case "":
            return `text-decoration: underline;
                    text-underline-offset: 10px;
                    color: transparent;
                    text-decoration-color: black;`;
        case "visible":
            return `color: black;
                    text-decoration: none;`;
        case "won":
            return `color: green;
                    text-decoration: none;`;
        case "lost":
            return `color: red;
                    text-decoration: none`;
    }
}

const Hangman = styled.main`
    width: 50%;
    height: 650px;

    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;

    position: relative;
    
    img{
        height: 100%;
    }

    button{
        position: absolute;
        top: 60px;
        right: 0px;
    
        background-color: #139E4F;
        color:white;
    
        border: none;
        border-radius: 5px;
    
        height: 50px;
        width: 150px;
    
        font-size: 15px;
        font-weight: bold;
    }
`

const Letters = styled.section`
    width: 50%;

    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 10px;
`

const LetterButton = styled.button`
    width: 60px;
    height: 60px;
    
    font-size: 20px;
    font-weight: bold;
    
    background-color: ${props => props.className === '' ? "#9FAAB5" : "#E1ECF4"};
    color: ${props => props.className === '' ? "#79828D" : "#3973A0"};
    
    border: ${props => props.className === '' ? "none" : "solid 1px"};
    border-radius: 5px;
`

const Guess = styled.section`
    width: 50%;

    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 10px;

    input{
        width: 40%;
        height: 30px;
    }

    button{
        height: 35px;
    
        background-color: #E1ECF4;
        color: #78A0BD;
    
        font-size: 15px;
        font-weight: bold;
    
        border-radius: 5px;
        border: solid 1px;
    }
`

const TargetWord = styled.div`
    position: absolute;
    right: 60px;
    bottom: 60px;

    display: flex;
    gap: 10px;
`

const Word = styled.p`
    font-size: 40px;
    font-weight: bold;
    ${props => handleWordVisibility(props.className)};
`