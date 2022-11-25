import {initializeApp
} from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query,where, orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
import{
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged,
  Unsubscribe
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDuP0_ghp9NGJMnzTI8j4l_kMKhQfFGqgM",
    authDomain: "fir-9-ninja-74f5f.firebaseapp.com",
    projectId: "fir-9-ninja-74f5f",
    storageBucket: "fir-9-ninja-74f5f.appspot.com",
    messagingSenderId: "368742538464",
    appId: "1:368742538464:web:7d3237e060cf9a9ab60485"
  };
//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();

//collection ref
const colRef = collection(db, 'books');

const q = query(colRef, orderBy('createdAt'));

//get collection data
// getDocs(colRef)
// .then((snapshot) =>{
//   let books = [];
//   snapshot.docs.forEach((doc)=>{
//     books.push({...doc.data(), id: doc.id})
//   })
//   console.log(books)
// })
// .catch(err=>{
//   console.log(err.message);
// });

//get real time collection data
// onSnapshot(colRef, (snapshot)=>{
//   let books = [];
//   snapshot.docs.forEach((doc)=>{
//     books.push({...doc.data(), id: doc.id})
//   })
//   console.log(books)
// })

//get real time collection data(query)
const unsubCol = onSnapshot(q, (snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc)=>{
      books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
  })
  
//Adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  addDoc(colRef, {
    title: addBookForm.title.value,
    author:addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(()=>{
    addBookForm.reset()
  })
})


//Deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef)
  .then(()=>{
    deleteBookForm.reset();
  })
})

// get a single document
const docRef = doc(db,'books', 'XZHZuRkRd4oznL0Gks9Q')


const unsubDoc = onSnapshot(docRef,(doc)=>{
  console.log(doc.data(), doc.id)
})

//updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const docRef = doc(db, 'books', updateForm.id.value);
  updateDoc(docRef,{
    title:'updated the title'
  })
  .then(()=>{
    updateForm.reset()
  })

})

// signing up a user
const signUpForm = document.querySelector('.signUp');

signUpForm.addEventListener('submit', (e)=>{
  e.preventDefault;

  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((credentialFromResult)=>{
    // console.log('user created:', credentialFromResult.user)
    // signUpForm.reset()
  })
  .catch((err)=>{
    console.log(err.message)
  });
})

// signing in and out
const logout = document.querySelector('.signOut') 

logout.addEventListener('click', ()=>{
  signOut(auth)
  // .then(()=>{
  //   // console.log('the user logged out')
  // })
  .catch((err)=>{
    console.log(err.message)
  })
})

const loginForm = document.querySelector('.signIn')
loginForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email,password)
  .then((credentialFromResult)=>{
    // console.log("the user logged in:", credentialFromResult.user)
    loginForm.reset()
  })
  .catch((err)=>{
    console.log(err.message)
  })
})

// subcribing to Auth changes

const unsubAuth = onAuthStateChanged(auth,(user)=>{
  console.log('user status changes:', user)
})

//Unsubscribing

const unsubButton = document.querySelector('.unSub')
unsubButton.addEventListener('click',()=>{
  console.log('Unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})