import React, { useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import RightPanel from './RightPanel/RightPanel';
import Wheel from './Wheel/Wheel';
import Theme from './Theme/Theme';
import QuestionPanel from './QuestionPanel/QuestionPanel';
import Egg from './Egg/Egg';

window.addEventListener(`resize`, event => {
  const clientWidth = document.documentElement.clientWidth

  document.documentElement.style.fontSize = clientWidth / 84 + 'px'
});

const AppBlock = styled.div`
display:grid;
grid-template-columns: 1fr minmax(80px, 15%);
height: 100vh;
`;

const jumps = keyframes`
   0%,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);
    transform: translate3d(0, -3000px, 0) scaleY(3)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0) scaleY(.9);
    transform: translate3d(0, 25px, 0) scaleY(.9)
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0) scaleY(.95);
    transform: translate3d(0, -10px, 0) scaleY(.95)
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0) scaleY(.985);
    transform: translate3d(0, 5px, 0) scaleY(.985)
  }

  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
`

const Main = styled.div`
padding: 2%;
display:grid;
grid-template-columns: minmax(100px, 25%) 1fr;
height: 100%;
animation: ${jumps} 1s;

`;




function App({db}) {



  const  offset = 360/db.length;
  const [rotate, setRotate] = useState(-offset/2)
  const [select, setSelect] = useState(0)
  const [leftSideStatus,setLeftSideStatus] = useState('wheel')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(db[select].questions.length)
  const [wasRotate, setWasRotate] = useState(false)
  const [levelQuestion, setLevelQuestion] = useState(0)


  const [animated, setAnimated] = useState(false)







  useEffect(()=>{
    let s = Math.round(-((rotate+offset/2)%360)/(offset))
    if(s === 8) {
        s = 0
    }
    setSelect(s)
  },[rotate])
  
  function animationRotate( ) {
    setAnimated(true)
    let der = 2000 + Math.floor(3000* Math.random());
    const turn = 1000 + Math.floor(3000* Math.random());
     der =turn*2
    let start = null,
        turnDifference = 0;
    function animation(time) {
      if (!start){
        start = time;
      }
      let passed =  time - start ,
      lineProgress = passed/der;
      const progres = lineProgress +  lineProgress**2*(1-lineProgress);

      setRotate((rotate)=>rotate - (Math.floor( progres*turn) - turnDifference) );
      turnDifference =  Math.floor( progres*turn)

      if(passed <= der) {
          requestAnimationFrame(animation)
      } else{
        start = null;
        setWasRotate(true)
        setAnimated(false)
      }
    }
    requestAnimationFrame(animation)
  } 

  function handleClickWheel(e) {
    e.preventDefault()
    e.stopPropagation()
    if(wasRotate) {
      if(levelQuestion<db[select].questions.length){
        changeOfScene()
      }
      setWasRotate(false)
    } else {
      if(!animated) {
        animationRotate();

      }
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
  function toogleEasterEgg(){
    setLeftSideStatus(leftSideStatus=> {
      if(leftSideStatus ==='wheel'){ 
        return 'easterEgg'
      } else if(leftSideStatus ==='easterEgg') {
        return 'wheel'
      }
    })
  }
  
  const MainPanel = (
      <Main>
        <Theme db={db} select={select}/>
        <Wheel 
            handleClickWheel = {handleClickWheel} 
            db={db} rotate={rotate} 
            offset={offset}

            />
      </Main>
  )


  const leftSide = leftSideStatus === 'easterEgg'? 
    <Egg toogleEasterEgg = {toogleEasterEgg}/> : 
    leftSideStatus === 'wheel'? 
    MainPanel:
    <QuestionPanel 
      selectThem ={db[select]}
      responseProcessing={responseProcessing}
      changeOfScene={changeOfScene}
      levelQuestion={levelQuestion}
      setLevelQuestion={setLevelQuestion}/>;


  return (
    <AppBlock>
      <div>{leftSide}</div>
      <RightPanel 
        score={score}
        attempts={attempts}
        questions = {db[select].questions}
        toogleEasterEgg={toogleEasterEgg}/>
    </AppBlock>
  );

  
}

export default App;