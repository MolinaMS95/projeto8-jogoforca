import styled from "styled-components"

export default function Jogo(props) {

    const {img, myWord, palavras, letters, hangmanStates, setMyWord, setLetters, enableInput, setHangman, setGuess, setHits} = props

    function chooseWord() {
        const randomIndex = Math.floor(Math.random() * palavras.length)
        const word = palavras[randomIndex]
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
        setHits(0)
        setLetters(newLetters)
        enableInput(false)
        setHangman(hangmanStates[0])
        setGuess("")
    }

    return (
        <Hangman>
            <img src={img} alt={img} data-identifier="game-image" />
            <button onClick={chooseWord} data-identifier="choose-word">Escolher Palavra</button>
            <TargetWord>
                {myWord.map((letter, index) => <Word key={index} className={letter.visibility} data-identifier="word">{letter.letter}</Word>)}
            </TargetWord>
        </Hangman>
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