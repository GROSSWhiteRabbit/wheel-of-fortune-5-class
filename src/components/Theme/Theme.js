import React  from 'react';
import styled from 'styled-components';


const ThemeBlock = styled.div`
border: 1px solid rgba(0,0,0,0.2);
border-radius: 8px;
background: rgba(0,0,0,0.3);
padding: 5%;
box-shadow: 4px 4px 20px rgba(0,0,0,.5); 


`
const H2 = styled.h2`
font-size: 1.2rem;
color: ${({select})=> select? 'red': null};
`

function Theme ({db, rotate, offset, select}) {
    

    function renderThems() {
        if(!db){
            return <h2 style={{
                color:'red',
                textAlign: "center"}} 
                >Отсуцтвует база данных</h2>
        } else {
            return db.map(({them}, i) => {
                if(i === select){
                    return <H2 select  key={i}>{them}</H2>
                }
               return <H2 key={i}>{them}</H2>
            })
        }
    }
   
    return (
        <ThemeBlock>
           { renderThems()}
        </ThemeBlock>
    )

}

export default Theme;