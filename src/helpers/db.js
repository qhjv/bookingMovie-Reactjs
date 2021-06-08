import firebase from 'firebase/app';


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCWCqloRdfnUXfkh2gAvurH9BRgnqDShYc",
    authDomain: "moviebooking-4c331.firebaseapp.com",
    projectId: "moviebooking-4c331",
    storageBucket: "moviebooking-4c331.appspot.com",
    messagingSenderId: "1069706239104",
    appId: "1:1069706239104:web:f51964141e8ca7bee91a65",
    measurementId: "G-YWC24XSR6W"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase