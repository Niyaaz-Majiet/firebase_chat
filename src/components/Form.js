import React ,{useState,useEffect,useRef} from 'react';
import Messages from './Messages';
//import * as firebase from 'firebase/app';
import '@firebase/firestore';
import firebase from 'firebase';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './com.css'

function Form(props){
    const [currentChat,changeChats] = useState("Messages");
    const [chats,updateChats] = useState([]);
    const [groups,updateGroups] = useState([]);
    const [message,newMessage] = useState("");
    const db =firebase.firestore();
    const mesDivRef = useRef(null);

    useEffect(()=>{
    ListenLists();
    listenMessages();
    },[])

    useEffect(()=>{
      listenMessages(); 
    },[currentChat])


   const ListenLists = () => {
       const arr = [];
       db.collection("calendars").get().then(snap => {
            const data=snap.docs.map(doc => {
            arr.push(doc.data().name);
            firebase.database().ref().child(doc.data().name);
            });
            console.log(data);
            updateGroups(arr);
        });
   }

   const listenMessages = () => {
     firebase.database().ref().child(currentChat)
     .limitToLast(10)
     .once('value',(message)=>{
        if (message.exists()){
        updateChats(Object.values(message.val()));
      }
    });
}




    const handlekeyPress = (e) => {
      if(e.key !== 13) return;
      handleSend();   
    }

    const handleSend = () => {
      if(message){
        var newItem ={
          userName: props.user,
          message: message
        }
    firebase.database().ref().child(currentChat).push(newItem);
    newMessage("");
    listenMessages();
      }
    }





   const _onDropChange = (option) => {
   changeChats(option.label);
   }





    return(
    <div>
       
        <Dropdown options = {groups} value={currentChat} onChange={_onDropChange} />
       <div className = "form_message" ref ={mesDivRef}>
            
       {chats.map((item,index)=><Messages key ={index} message={item}/> )}

       </div>
       <input
           type = 'text'
           placeholder = 'Type message ...'
           value={message}
           onChange = {(event) =>{
            newMessage(event.target.value)}}
           onKeyPress = {handlekeyPress}
        />
        <button className="button"  onClick={handleSend}>SEND</button> 
        <br/>
    </div>
    );

}

export default Form;






