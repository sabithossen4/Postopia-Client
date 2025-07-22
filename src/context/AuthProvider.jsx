import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './../firebase/firebase.init';
import { createContext, useEffect, useState } from 'react';



export const AuthContext = createContext();
 const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user,setUser] =useState(null);
  const [loading, setLoading] = useState(true);

   const createUser= (email,password) =>{
    setLoading(true);    
    return createUserWithEmailAndPassword(auth,email,password);
  };

  const signIn= (email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  };

  const logOut =() =>{
     setLoading(true); 
    return signOut(auth);
  };

   const googleSignIn = () =>{
     setLoading(true); 
    return signInWithPopup(auth,googleProvider)
  };

   const forgetPassword = (email) =>{
    return sendPasswordResetEmail(auth,email);
  };

   const updateUser = (updateData)=>{
    return updateProfile(auth.currentUser, updateData);
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);     

      setLoading(false);
      console.log(currentUser);
    });
    return() =>{
      unsubscribe();
    };
  },[]);  
 
   const authData ={
    user,  
    setUser,
   createUser,
   loading,
   setLoading, 
   signIn,  
   logOut,
   googleSignIn,
   forgetPassword,
   updateUser,
  }

  return (
     <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;