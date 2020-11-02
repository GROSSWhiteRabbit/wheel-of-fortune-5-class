import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import RightPanel from './RightPanel/RightPanel';
import Wheel from './Wheel/Wheel';
import Theme from './Theme/Theme';
import QuestionPanel from './QuestionPanel/QuestionPanel'
import db from '../db';


const AppBlock = styled.div`
display:grid;
grid-template-columns: 1fr minmax(80px, 15%);
height: 100vh;
/* overflow-y: hidden; */
`;

const Main = styled.div`
padding: 2%;
display:grid;
grid-template-columns: minmax(100px, 25%) 1fr;
/* border: 1px solid red; */
height: 100%;
`;
const Div = styled.div`
border: 1px solid blue;
height: 100%;
`;





function App() {

  const  offset = 360/db.length;
  const [rotate, setRotate] = useState(-offset/2)
  const [select, setSelect] = useState(0)
  const [leftSideStatus,setLeftSideStatus] = useState('wheel')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(20)
  const [wasRotate, setWasRotate] = useState(false)
  const [levelQuestion, setLevelQuestion] = useState(0)







  useEffect(()=>{
    let s = Math.round(-((rotate+offset/2)%360)/(360/db.length))
    if(s === 8) {
        s = 0
    }
    setSelect(s)
  },[rotate])
  
  function animationRotate( der = 2000, turn = 1000  ) {
    let start = null,
        turnDifference = 0;
    function animation(time) {
      if (!start){
        start = time;
      }
      let passed =  time - start ,
          proggres = passed/der;

      setRotate((rotate)=>rotate - (Math.floor( proggres*turn) - turnDifference) );
      turnDifference =  Math.floor( proggres*turn)
      if(proggres <= 1) {
          requestAnimationFrame(animation)
      } else{
        start = null;
        setWasRotate(true)
      }
    }
    requestAnimationFrame(animation)
  } 

  function handleClickWheel() {
    if(wasRotate) {
      changeOfScene()
      setWasRotate(false)
    } else {
      animationRotate();
    }
  }

  function responseProcessing(stateResponse, point){
      if(stateResponse === 'correct') {
        setScore((score)=>score+point)
        setAttempts((attempts)=>attempts-1)
      } else if(stateResponse === 'wrong') {
        setAttempts((attempts)=>attempts-1)
      }
      
  }
  function changeOfScene() {
    setLeftSideStatus(leftSideStatus=> {
      if(leftSideStatus ==='wheel'){ 
        return 'question'
      } else if(leftSideStatus ==='question') {
        return 'wheel'
      }
    })
  }
  
  const MainPanel = (
      <Main>
        <Theme db={db} rotate={rotate} offset={offset} select={select}/>
        <Wheel 
            handleClickWheel = {handleClickWheel} 
            db={db} rotate={rotate} 
            offset={offset}

            />
      </Main>
  )


  const leftSide = leftSideStatus === 'wheel'? MainPanel:
    <QuestionPanel 
      selectThem ={db[select]}
      responseProcessing={responseProcessing}
      changeOfScene={changeOfScene}
      levelQuestion={levelQuestion}
      setLevelQuestion={setLevelQuestion}/>;


  return (
    <AppBlock>
      {leftSide}
      <RightPanel score={score} attempts={attempts}/>
    </AppBlock>
  );

  
}

export default App;