import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDBt8vFO3hVB69KzXHmwOl_Z2QkKfajGEk",
  authDomain: "air-technology-5ddd3.firebaseapp.com",
  databaseURL: "https://air-technology-5ddd3-default-rtdb.firebaseio.com",
  projectId: "air-technology-5ddd3",
  storageBucket: "air-technology-5ddd3.appspot.com",
  messagingSenderId: "758004568400",
  appId: "1:758004568400:web:493ca3bf90df90d6719c55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.database();