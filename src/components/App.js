import React from 'react';
import styled, {keyframes} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {restartQuest} from '../reduser/main';
import RightPanel from './RightPanel/RightPanel';
import Wheel from './Wheel/Wheel';
import Theme from './Theme/Theme';
import QuestionPanel, {Button} from './QuestionPanel/QuestionPanel';
import Egg, {jumpsX} from './Egg/Egg';



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

const Modal = styled.div`
position: fixed;
background: rgba(0,0,0,0.3);
height: 100vh;
width:100%;
top: 0;
animation: ${jumpsX} 1s;
user-select: none;


`
const ContentModal = styled.div`
margin: 20% auto;

background: #2D132E;
border: 1px solid rgba(0,0,0,0.2);
border-radius: 8px;
box-shadow: 4px 4px 20px rgba(0,0,0,.5); 
display:grid;
place-content: center;
overflow: hidden;
text-align: center;
div {
  position:relative;
  height:5%;
}


`



function App() {

  const dispatch = useDispatch();
console.log(useSelector(state=>state), 'ok');
  const {
    leftSideStatus,
     isDone,
     score,
     maxPoint
    } = useSelector(state=>state.main)

  
const onclickRestart = ()=> dispatch(restartQuest())

  
  const MainPanel = (
      <Main>
        <Theme/>
        <Wheel/>
      </Main>
  )


  const leftSide = leftSideStatus === 'easterEgg'? 
    <Egg/> : leftSideStatus === 'wheel'? 
    MainPanel:<QuestionPanel/>;

  
  return (
    <AppBlock>
        <div>{leftSide}</div>
        {isDone ?(<Modal>
          <ContentModal>
            <h1>Тадам!!! Пройдено.</h1>
            <div><Button active={true} onClick={onclickRestart}>Спробувати ще раз</Button></div>

            <h2>Ви набрали балів {score} з {maxPoint} </h2>
          </ContentModal>
        </Modal>): null}
        
        
      
      
      <RightPanel/>
        
    </AppBlock>
  );

  
}

export default App;