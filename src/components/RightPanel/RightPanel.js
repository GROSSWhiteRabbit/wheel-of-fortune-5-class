import React from 'react';
import styled from 'styled-components';

const PanelBlock = styled.div`
    background: #181414 ;
    display:flex ;
    flex-direction: column;
    align-items: center;
    height: 100%;   
    text-align:center;
    box-shadow: 4px 4px 20px rgba(0,0,0,.5); 
    user-select: none;
    z-index: 1;

`;

function RightPanel ({attempts, score, questions, toogleEasterEgg}) {

    const maxPoin = questions.reduce((accum, {point})=> accum+point, 0)
return ( 
    <PanelBlock>
        <h1>Попыток</h1>
        <h2>{attempts}</h2>
        <h1> Максимум балов</h1>
        <h2>{maxPoin}</h2>
        <h1> Набрано</h1>
        <h2>{score}</h2>
        <span onClick={toogleEasterEgg}>Aaaa!!Что здесь происходит!??</span>

    </PanelBlock>
)
}

export default RightPanel;