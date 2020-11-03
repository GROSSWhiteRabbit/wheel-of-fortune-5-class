import React, { useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import './Wheel.scss';



const WheelBlock = styled.div`
display:flex;
justify-content:center;
align-items:center;

svg {
/* animation: wheel 2s linear infinite; */
    width: 27vw;
    height:27vw;
}
`

function Wheel({db,rotate, handleClickWheel , offset}) {



        


    function RenderWheel() {
        const circs =  db.map((item, i)=>{
            const n = i+1,
                  sectorWidth = 2*Math.PI*25/db.length;
            return (
                <g className={"g" + n } key= {i} style={{transform: `rotate(${offset*i}deg)`}}> 
                    <circle className="sector" r="25" cx="50" cy="50"
                    strokeDasharray={`${sectorWidth}, 157.07963267948966
                    `} />
                    <text x="84" y="50" style={{transform: `rotate(${offset*0.66 }deg)`}}>{n}</text>  

                </g>
            )
        })

        return (
            <span className="circWrap">
                <svg    viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{transform: `rotate(${rotate}deg)`}}>
                {circs}
            </svg>
            </span>
            
        )
    }



    return (
        <WheelBlock onClick={handleClickWheel} >
            <span  className='wrapper'>
                <RenderWheel/> 
                <span className="arrow-7">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                </span>     
            </span>
                
        </WheelBlock>
           
    )
}


export default Wheel;