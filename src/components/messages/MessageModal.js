import react, {useState} from "react"
import Popup from 'reactjs-popup';
import { addFriend } from "../modules/FriendManager";


export const MessageModal = (messageObj) =>{

    

    const handleAddFriend = (userObj) =>{
        window.alert(userObj.name)
        addFriend(userObj)
    }
    


    return (
        
        <>Add {messageObj.name} to friends? <button type="button" onClick={handleAddFriend}>Yes</button><button>No</button></>

    )
}