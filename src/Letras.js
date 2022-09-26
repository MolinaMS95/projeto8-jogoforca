import styled from "styled-components"

function Letter(props){

    const{index, css, isDisabled, letter, letters, myWord, hits, newAlphabet, hangman, hangmanStates,
          setLetters, setMyWord, enableInput, setHangman, setHits} = props

    function pressLetter() {
        const newLetters = [...letters]
        newLetters[index].disable = true
        newLetters[index].status = ""
        setLetters(newLetters)

        const newMyWord = [...myWord]

        let containLetter = false
        let corrrect = hits
        for (let i = 0; i < myWord.length; i++) {
            let wordLetter = myWord[i].letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            if (wordLetter === letter.toLowerCase()) {
                corrrect++
                containLetter = true
                newMyWord[i].visibility = "visible"
                setMyWord(newMyWord)
            }
        }
        setHits(corrrect)
        if (corrrect === myWord.length) {
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

    return(
        <LetterButton onClick={pressLetter} className={css} disabled={isDisabled} data-identifier="letter">{letter}</LetterButton>
    )
}

export default function Letras(props) {
    
    const {letters, hits, newAlphabet, hangman, hangmanStates, setLetters, setMyWord, enableInput, setHangman, setHits, myWord} = props

    return (
        <Letters>
                {letters.map((letter, index) => <Letter index={index} css={letter.status} key={index} isDisabled={letter.disable} letter={letter.letter.toUpperCase()} 
                                                        letters={letters} hits={hits} newAlphabet={newAlphabet} hangman={hangman} hangmanStates={hangmanStates}
                                                        setLetters={setLetters} setMyWord={setMyWord} enableInput={enableInput} setHangman={setHangman} 
                                                        setHits={setHits} myWord={myWord}/>)}
        </Letters>
    )
}

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