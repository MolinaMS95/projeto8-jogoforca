import styled from "styled-components"

export default function Chute(props) {

    const {guess, disabled, myWord, newAlphabet, hangmanStates,
        setMyWord, enableInput, setLetters, setHangman, setGuess} = props

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
        <Guess>
            <p>Já sei a palavra!</p>
            <input value={guess} onChange={(e) => setGuess(e.target.value)} disabled={disabled} data-identifier="type-guess" />
            <button onClick={checkGuess} data-identifier="guess-button">Chutar</button>
        </Guess>
    )
}

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