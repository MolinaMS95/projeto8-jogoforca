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

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <>
            <main className="hangman">
                <img src={hangman} alt={hangman} />
                <button className="choose-word">Escolher Palavra</button>
            </main>
            <section className="letters">
                {alfabeto.map((letter) => <button className="letter">{letter.toUpperCase()}</button>)}
            </section>
            <section className="guess">
                <p>Já sei a palavra!</p>
                <input/>
                <button>Chutar</button>
            </section>
        </>
    )
}