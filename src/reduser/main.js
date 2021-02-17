import {createSlice} from '@reduxjs/toolkit';

const main = createSlice({
    name:'main',
    initialState: {
        db: [],
        offset: 0,
        rotate: 0,
        select: 0,
        leftSideStatus: 'wheel',
        score: 0,
        attempts: 0,
        // wasRotate: false,
        levelQuestion: 0,
        maxPoint: 0,
        // animated: false,
        isDone: false,
        
    },
    reducers: {
        setDb(state,actions) {
            console.log(actions, 'actions')
            const dbPlayload = actions.payload;
            state.db = dbPlayload
            state.offset = 360/dbPlayload.length;
            state.rotate = -(360/dbPlayload.length)/2;
            state.attempts = dbPlayload[0].questions.length;
            state.maxPoint = dbPlayload[0].questions.reduce((accum, {point})=> accum+point, 0);
        },
        setRotate(state, actions){
            const {progres, turn, turnDifference} = actions.payload;
            state.rotate = state.rotate - (Math.floor( progres*turn) - turnDifference) ;

            let s = Math.round(-((state.rotate+state.offset/2)%360)/(state.offset))
            if(s === 8) {
                s = 0
            }
            state.select = s;
        },
        changeOfScene(state, actions){
            if(state.leftSideStatus ==='wheel' && state.attempts >0){ 
                state.leftSideStatus = 'question'
              } else if(state.leftSideStatus ==='question') {
                state.leftSideStatus = 'wheel'
                if(state.attempts<=0){
                    state.isDone = true;
                }
              }
        },
        restartQuest(state){
            state.attempts = state.db[0].questions.length;
            state.score = 0;
            state.levelQuestion = 0;
            state.isDone = false;
        },
        responseCorrect(state, actions){
            const point = actions.payload;
            state.score =  state.score + point;
            state.attempts = state.attempts - 1;
        },
        responseWrong(state){
            state.attempts = state.attempts - 1;
        },
        upLevelQuestion(state){
            state.levelQuestion = state.levelQuestion + 1;
        },
        toogleEasterEgg(state){
            if(state.leftSideStatus ==='wheel' && !state.isDone ){ 
                state.leftSideStatus = 'easterEgg'
              } else if(state.leftSideStatus ==='easterEgg') {
                state.leftSideStatus = 'wheel'
              }
        }
    }
})

export default main.reducer;
export const {
    setDb,
    setRotate, 
    changeOfScene, 
    restartQuest,
    responseCorrect,
    responseWrong,
    upLevelQuestion,
    toogleEasterEgg
} = main.actions 