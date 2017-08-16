import Firebase from 'firebase'
const config = {
		apiKey: "AIzaSyCbSgwVroXleGZFljVNOLaMQKeePDXm-i4",
		authDomain: "vue-note-d1e53.firebaseapp.com",
		databaseURL: "https://vue-note-d1e53.firebaseio.com",
		projectId: "vue-note-d1e53",
		storageBucket: "vue-note-d1e53.appspot.com",
		messagingSenderId: "152547013715"
	};
const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()
export default db