import { SETLANGUAGE } from './actionType';
export function setLanguageAction(lang:string) {
    return {type: SETLANGUAGE, value: lang}
}
