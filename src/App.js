import React from "react"
import GlobalStyle from './GlobalStyle.js'

import hangman0 from "./assets/forca0.png"
import hangman1 from "./assets/forca1.png"
import hangman2 from "./assets/forca2.png"
import hangman3 from "./assets/forca3.png"
import hangman4 from "./assets/forca4.png"
import hangman5 from "./assets/forca5.png"
import hangman6 from "./assets/forca6.png"

import palavras from "./assets/palavras.js"

import Jogo from "./Jogo.js"
import Letras from "./Letras.js"
import Chute from "./Chute.js"

export default function App() {
    const hangmanStates = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const newAlphabet = [];
    for (let i = 0; i < alphabet.length; i++) {
        newAlphabet[i] = { letter: alphabet[i], disable: true, status: "" }
    }
    const [letters, setLetters] = React.useState(newAlphabet)

    const [hangman, setHangman] = React.useState(hangmanStates[0])
    const [isEnabledInput, enableInput] = React.useState(true)
    const [myWord, setMyWord] = React.useState([])
    const [guess, setGuess] = React.useState("")
    const [hits, setHits] = React.useState(0)

    return (
        <>
            <GlobalStyle />
            <Jogo img ={hangman} myWord ={myWord} palavras = {palavras} letters={letters} hangmanStates={hangmanStates} setHits={setHits}
                  setMyWord={setMyWord} setLetters={setLetters} enableInput={enableInput} setHangman={setHangman} setGuess={setGuess}/>
            <Letras letters={letters} myWord={myWord} hits={hits} newAlphabet={newAlphabet} hangman={hangman} hangmanStates={hangmanStates}
                    setHits={setHits} setLetters={setLetters} setMyWord={setMyWord} enableInput={enableInput} setHangman={setHangman}/>
            <Chute guess={guess} disabled={isEnabledInput} myWord ={myWord} newAlphabet={newAlphabet} hangmanStates={hangmanStates}
                   setMyWord={setMyWord} enableInput={enableInput} setLetters={setLetters} setHangman={setHangman} setGuess={setGuess}/>
        </>
    )
}