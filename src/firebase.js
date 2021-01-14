import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyDcs2HI6EB9qaJ6bNEVLxQDHYq1jjeusFY",
  authDomain: "reactapp-8544a.firebaseapp.com",
  databaseURL: "https://reactapp-8544a-default-rtdb.firebaseio.com",
  projectId: "reactapp-8544a",
  storageBucket: "reactapp-8544a.appspot.com",
  messagingSenderId: "589058645545",
  appId: "1:589058645545:web:a2736fe1351c3bdd17c638"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    //referenciando a database para acessar em outros locais
    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return app.auth().signOut();
  }

  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve)
    })
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback) {
    if (!app.auth().currentUser) {
      return null
    }
    const uid = app.auth().currentUser.uid
    await app.database().ref('usuarios').child(uid)
      .once('value').then(callback)
  }
}

export default new Firebase()