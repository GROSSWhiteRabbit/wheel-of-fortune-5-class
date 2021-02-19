import React, { useState }  from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setRotate, changeOfScene} from '../../reduser/main';
import './Wheel.scss';



const WheelBlock = styled.div`
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;

svg {
    width: 27vw;
    height:27vw;
}
`

function Wheel() {

    const {db, rotate, offset} = useSelector(state => state.main)
 
    const dispatch = useDispatch();

    const [wasRotate, setWasRotate] = useState(false)
    const [animated, setAnimated] = useState(false)

        
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
          dispatch(setRotate({progres, turn, turnDifference}));
          turnDifference =  Math.floor( progres*turn);
    
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
            dispatch(changeOfScene())
            setWasRotate(false)
        } else {
          if(!animated) {
            animationRotate();
    
          }
        }
      }

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