import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC2sSGxhNZJ2OIbLBnnncNmP6R5kVBFaN0",
  authDomain: "fastfoodapp-71e86.firebaseapp.com",
  projectId: "fastfoodapp-71e86",
  storageBucket: "fastfoodapp-71e86.appspot.com",
  messagingSenderId: "787439675044",
  appId: "1:787439675044:web:ea4e2d35286cbf65b5a831",
  measurementId: "G-QM7CEPH2LD"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
