import React , {useState} from 'react';
import firebase from 'firebase';


export default function PopUp(){
const [title,changeTitle] = useState("");


const handlekeyPress = (e) => {
    if(e.key !== 13) return;

    handleSend();   
  }

const handleSend = ()=>{
    if(title){
      var ref=firebase.database().ref().child("GroupChats");
      var chatGroupname = {
         chatGroupName : title
      }

ref.push(chatGroupname);
}

}


   return(
       <div>
           <input
           type = 'text'
           placeholder = 'Enter New Group Chat Name'
           value={title}
           name='title'
           onChange = {(event) =>{
            console.log(event)   
            changeTitle(event.target.value)}}
           onKeyPress = {handlekeyPress}

           />

           <button  onClick={handleSend}>ADD GROUP</button>
       </div>
   );
}