import React, {useState, useEffect } from 'react'
import { auth } from "../firebase";
export const AuthContext = React.createContext();
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
function AuthWrapper({children}) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
    console.log("in auth wrapper");

    useEffect(()=>{
      onAuthStateChanged(auth,(user) => {
        if(user){
          setUser(user);
        }
        else{
           setUser('');
        }
      })
      setLoading(false)
    },[])

    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password);

    }

    function logout(){
      return signOut(auth);
    }

    function forgotPassword() {
      console.log("hello");
       return sendPasswordResetEmail(auth, email);
    }

    function signup(email,password){
      return createUserWithEmailAndPassword(auth, email, password);
    }

    const store = {
        login,
        user,
        logout,
        forgotPassword,
        signup,
    }

    return (
    <AuthContext.Provider value={store}>
        {!loading && children }
    </AuthContext.Provider>

  )
}

export default AuthWrapper;