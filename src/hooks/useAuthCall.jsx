import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//create custom hook named useAuthCall

const useAuthCall = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        dispatch(fetchStart());
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(fetchFail());
      });
  };

  const register = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      dispatch(registerSuccess(user));
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async (values) => {
    dispatch(fetchStart());
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user);
      dispatch(loginSuccess(user));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchFail());
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await signOut(auth);
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  return { login, logout, register, signInWithGoogle };
};

export default useAuthCall;
