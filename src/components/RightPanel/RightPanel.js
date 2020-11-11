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

function RightPanel ({attempts, score, questions, toogleEasterEgg, maxPoint}) {

    // const maxPoin = questions.reduce((accum, {point})=> accum+point, 0)
return ( 
    <PanelBlock>
        <h1>Спроб</h1>
        <h2>{attempts}</h2>
        <h1> Максимум балів</h1>
        <h2>{maxPoint}</h2>
        <h1> Набрано балів</h1>
        <h2>{score}</h2>
        <h4 style={{cursor: "pointer"}} onClick={toogleEasterEgg}>^_^</h4>

    </PanelBlock>
)
}

export default RightPanel;