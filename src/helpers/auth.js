import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { notifyError } from "./Utils";

export const LoginAuth = async(email, password) => {
      return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential
      })
      .catch(() => {
        notifyError("Invalid Credential or Create your account!")
      });
  }


  export const SigninAuth = async (email, password, displayName = "",) => {
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
  