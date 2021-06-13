import * as api from '../api/chats';


export function fetchChats(){

    return async function(dispatch){
       const chats =  api.fetchChats()
       debugger
    }


}