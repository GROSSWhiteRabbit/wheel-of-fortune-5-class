import React from 'react';
import styled, {keyframes} from 'styled-components';
import {useDispatch} from 'react-redux';
import {toogleEasterEgg} from '../../reduser/main';

export const jumpsX = keyframes`
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
    -webkit-transform: translate(2000px, 0);
    transform: translate(2000px, 0) ;
  }



  to {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
`

const EggBlock = styled.div`
padding: 2%;
width: 100%;
height: 100%;
animation: ${jumpsX} 1s;
border: 1px solid rgba(0,0,0,0.2);
border-radius: 8px;
background: rgba(0,0,0,0.3);
padding: 5%;
box-shadow: 4px 4px 20px rgba(0,0,0,.5); 
display: flex;
align-items:center;

`;

function Egg() {
  const dispatch = useDispatch();

    return (
        <EggBlock onClick={()=>dispatch(toogleEasterEgg())}>
            <h1>Здравствуй шукач. Тобі потрапила унікальна річ, можливість дізнатися на що ти здатний як маленький мислитель, а може і великий. Випробуй свої сили, раптом весь світ для тебе всього лише маленька сходинка, і ти здатний прогинати сам всесвіт під себе...</h1>
        </EggBlock>
    )
}

export default Egg; 