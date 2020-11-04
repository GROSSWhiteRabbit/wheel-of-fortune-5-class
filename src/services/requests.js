async function postData(url, body) {
    let response = await fetch(url, {
                                    method: 'POST',
                                    body
                                });
    if (!response.ok){
        
        throw (`POST Erorr url:${url}  status:${response.status}`);
    }
    return await response.text();

}

async function getData(url){
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    });
    if(!res.ok){
        throw new Error(`could not feth ${url}, status:${res.status}` );
    }
    return await res.json();
    
}

export {postData,getData};





