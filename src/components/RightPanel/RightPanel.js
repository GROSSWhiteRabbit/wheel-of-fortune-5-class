import React from 'react';
import styled from 'styled-components';

const PanelBlock = styled.div`
    background: #181414;
    display:flex;
    flex-direction: column;
    align-items: center;
    height: 100%;   
    text-align:center;
    box-shadow: 4px 4px 20px rgba(0,0,0,.5); 
`;

function RightPanel ({attempts, score}) {
return ( 
    <PanelBlock>
        <h1>Попыток</h1>
        <h2>{attempts}</h2>
        <h1> Максимум балов</h1>
        <h2>12</h2>
        <h1> Набрано</h1>
        <h2>{score}</h2>
        <span>Aaaa!!Что здесь происходит!??</span>

    </PanelBlock>
)
}

export default RightPanel;