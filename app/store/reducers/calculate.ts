
import {SETLANGUAGE } from '../actionType';
interface languAgeState {
    lang: string
}
interface Action {
    type: string,
    lang:  string,
}

const initData = {
    lang: 'jp'
}

const calculate = (state: languAgeState = initData, action: Action ) => {
    switch (action.type) {
        case SETLANGUAGE:
            return {lang:action.lang}
        default:
            return state
    }
}

export {calculate}
