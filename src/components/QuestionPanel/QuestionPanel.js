import React, { useState} from 'react';
import MathJax from 'react-mathjax2'
import {useDispatch, useSelector} from 'react-redux';
import {responseCorrect, responseWrong, upLevelQuestion,changeOfScene} from '../../reduser/main';
import styled, {keyframes, css} from 'styled-components';

const fadeIn = keyframes`
  0% {
    transform: scale(0,0)
  }
  100% {
    transform: scale(100%,100%)
  }
`

const WrapQuestion = styled.div`
    padding: 2%;
    display:flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0 5%;    
    animation: ${fadeIn} 1s;
    user-select: none;


`;

const Question = styled.div`
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    background: rgba(0,0,0,0.3);
    padding: 2%;
    box-shadow: 4px 4px 20px rgba(0,0,0,.5); 
    width:100%;
    height:100%;
    white-space: break-spaces;
    h2 {
        margin: 1% auto;
    }

`
const Answers = styled.div`


    padding: 5%;

    width:100%;
    height:100%;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;

`
const Answer = styled.div`
    

    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    background: rgba(0,0,0,0.3);
    padding: 2%;
    box-shadow: 4px 4px 20px rgba(0,0,0,.5); 
    width:42%;
    height:50%;
    display:grid;
    place-content: center;
    overflow: hidden;

    &:nth-child(1) {
        margin-bottom: 2%;
    }
    &:nth-child(2) {
        margin-bottom: 2%;
    }
    span{
        text-align: center;
        font-size: 1.4rem;
    }
    ${({state,active, correct})=> {
        let cssText ='';
        if(state === 'chose' && !active){
            cssText += css`
            cursor: pointer;
            &:hover{
                border-color:#BB968D;
            }
            `
        }
        if(active&& state === 'chose') {
            cssText += css`
                cursor: pointer;
                border-color:#ed785b    ;
            `
        }
        if(correct&&(state === "correct"|| state === "wrong" )) {
            cssText += css`
                border-color:#229756    ;
            `
        }
        if(active&& state === "wrong") {
            cssText += css`
                border-color:#e52b50    ;
            `
        }
        return cssText
    }}
`
export const Button = styled.button`
    box-shadow: 4px 4px 20px rgba(0,0,0,.5);    
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    border: 1px solid rgba(0,0,0,0.2);
    font: inherit;
    color: inherit;
    outline:none;
    border-radius: 4px;
    color:rgba(16, 16, 16, 0.3);
    padding: 4px 8px;
    background:rgba(118, 118, 118, 0.3);
    font-weight: 800;
    text-align: center;
    ${({active})=> {
        if(active>=0) {
            console.log(active)
            return css`
            cursor:pointer;
            background: #d53e07;
            color:#5A092A;
            &:hover{
                background-color: #aa3206;
            }
            `
            
        }   
    }}
    
`

function QuestionPanel() {
    const dispatch = useDispatch()
    const {db, select, levelQuestion} = useSelector(state=> state.main);
    const {them, questions} = db[select];
    const {point, questions: questObjs} = questions[levelQuestion];
    const [numderQustion] = useState(Math.floor(Math.random()*questObjs.length) );
    const {question, answer, correctAnswer} = questObjs[numderQustion];
    const [state, setState] = useState('chose');
    const [activeTab, setActiveTab] = useState();

    function onClickButton() {
        if (state === 'chose'){
            if(!activeTab &&activeTab!==0){
                return
            }
            if(activeTab===correctAnswer){
                setState('correct');
                dispatch(responseCorrect(point));

            }
            if(activeTab!==correctAnswer){
                setState('wrong');
                dispatch(responseWrong());
            }
        } else {
            dispatch(upLevelQuestion());
            dispatch(changeOfScene())
            
        }

    }
    function onSelectTab(i) {
        if(state==='chose') {
            setActiveTab(i);
        }
    }
    function renderAnswer() {
        return answer.map((item, i) => {
            const active = (activeTab === i);
            const correct = (correctAnswer === i);

            return (
            <Answer onClick={()=>onSelectTab(i)} correct={correct} state ={state} active={active}>
                       <span><MathJax.Text text={ item }/></span>
                   </Answer  >
            )   
        })
    }

    return (
        (
            <MathJax.Context
            
            
            onError={ (MathJax, error) => {
                console.warn(error);
                console.log("Encountered a MathJax error, re-attempting a typeset!");
                MathJax.Hub.Queue(
                  MathJax.Hub.Typeset()
                );
            } }
            script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
            options={ {
                asciimath2jax: {
                     useMathMLspacing: true,
                     delimiters: [["$$","$$"]],
                     preview: "none",
                }
            } }
        >
            <WrapQuestion>
               <Question>
                   <h2>Тема: {them}</h2>
        <h2>Питання (балів {point}):  <MathJax.Text text={ question }/> </h2>
               </Question>
               <Answers>
                    {renderAnswer()}
                    <Button disabled ={!(activeTab>=0)} active={activeTab} onClick={onClickButton}>{state==="chose"?"Відповісти":"Далі"}</Button>
               </Answers>
            </WrapQuestion>
        </MathJax.Context>
            
        )
    )


}

export default QuestionPanel;