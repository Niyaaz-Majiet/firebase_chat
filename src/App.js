import React,{useState,useEffect} from 'react';
import './App.css';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Form from './components/Form';

firebase.initializeApp(firebaseConfig);


const firebaseAppAuth = firebase.auth();
const providers = {
  googleProvider : new firebase.auth.GoogleAuthProvider()
};


function App() {
const [user , setUser] = useState(null);
const [signIn , in_out] = useState(false);
const [displayName , changeName] = useState(" ");

// useEffect(()=>{
// firebase.auth().onAuthStateChanged(user => {
//   if(user){
//     in_out(true);
//     setUser(user);
//   }
// });

// });

function handleLogOut(){
   firebase.auth().signOut();
   setUser(null);
   in_out(false);
   changeName("");
}
function handleSignIn(){
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).finally(()=>{
    in_out(true);
    setUser(firebase.auth().currentUser);
    changeName(firebase.auth().currentUser.displayName);
  }); 
  
}

  return (
    <div className="App">
      <button onClick={handleLogOut}>SignOut</button>
      <button onClick={handleSignIn}>SignIn</button>
    {
      signIn ? (
        
        <Form user={displayName}/>
  
      ):(
        <h1>SIGN IN</h1>
      )
    }
    </div>
  );
}

export default withFirebaseAuth({
providers,
firebaseAppAuth
})(App);
