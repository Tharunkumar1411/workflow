import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export const handleEmailAuth = async(email, password, displayName = "", type = "",) => {
    if(type === "Login"){
      return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    } else{
      return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Update the display name
          return updateProfile(userCredential.user, {
            displayName: displayName
          }).then(() => {
            return userCredential;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          // Handle errors here
        });
      }
  }
  