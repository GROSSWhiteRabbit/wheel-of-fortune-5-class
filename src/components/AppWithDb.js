import React, { useEffect, useState} from 'react';
import {getData} from '../services/requests';
import App from './App';
import Spinner from './Spinner/Spinner';
import {useDispatch} from 'react-redux';
import {setDb} from '../reduser/main';


function AppWithDb() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    
    const detectResize = ()=> {
        const resize =  function(){
            const clientWidth = document.documentElement.clientWidth
          
            document.documentElement.style.fontSize = clientWidth / 84 + 'px'
          };
          resize()
          window.addEventListener(`resize`, resize);
    }
    useEffect(()=>{
        detectResize();
        getData(process.env.PUBLIC_URL
            +'/db.json')
            .then((res)=> {
                console.log(res, 'res')
                dispatch(setDb(res));
                setLoading(false);
            })
            .catch((e)=> console.error(e));
            
    },[]);

    if(loading) {
        return <Spinner/>;
    } else {
        return <App/>
    }

}

export default AppWithDb;