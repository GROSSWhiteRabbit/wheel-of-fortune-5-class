import React, { useEffect, useState} from 'react';
import {getData} from '../services/requests';
import App from './App';


function AppWithDb() {
    const [loading, setLoading] = useState(true);
    const [db, setDb] = useState(true);
    useEffect(()=>{
        getData(process.env.PUBLIC_URL
            +'/db.json')
            .then((res)=> {
                setDb(res);
                setLoading(false);
            })
            .catch((e)=> console.error(e));
    },[]);

    if(loading) {
        return null;
    } else {
        return <App db={db} />
    }

}

export default AppWithDb;