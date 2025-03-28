// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs,
    updateDoc, deleteDoc, doc, setDoc,
    getDoc, } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA9eN6rH19JAl0QgIYUJshLCSNSW-Bex1s",
  authDomain: "task-manager-d5646.firebaseapp.com",
  projectId: "task-manager-d5646",
  storageBucket: "task-manager-d5646.firebasestorage.app",
  messagingSenderId: "513193062442",
  appId: "1:513193062442:web:717525880fc0e5f0c95353",
  measurementId: "G-KZYS4ZQ2WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);


export const signUP = async (email, password, userDetails, showToast) => {
   try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.uid), {
         email: user.email,
         name: `${userDetails.firstName}  ${userDetails.lastName}`,
         createdAt: new Date()
      })
      if (showToast) showToast("User signed up successfully!", "success")

   } catch (error) {
      if (showToast) showToast(error.message, "error")
   }
}

export const login = async (email, password, showToast, navigate) => {
   try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (showToast) showToast("Loged in successfully!", "success");
      navigate('/')
   } catch (error) {
      if (showToast) showToast(error.code.split('/')[1].split('-').join(" "), "error");
   }

}

export const logOut = async (showToast) => {
   try {
      await signOut(auth)
      if (showToast) showToast("loged out successfully!", "success")
         window.location.reload();
   } catch (error) {
      console.log(error.message)
   }
}

// function to add a task 
export const addTaskToFireStore = async (details, showToast) => {
   const user = auth.currentUser
   
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")
         return
   };
   await addDoc(collection(db, `users/${user.uid}/tasks`), details)
if (showToast) showToast("Task added successfully!", "success")
   
}

export const getTasks = async () => {
   return new Promise((resolve, reject) => {
      const unsub = onAuthStateChanged(auth, async (user) => {
         if (!user) {
            resolve([]); 
            return;
         }

         try {
            const querySnapshot = await getDocs(collection(db, `users/${user.uid}/tasks`));
            const tasks = querySnapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));
            resolve(tasks);
         } catch (error) {
            console.error("Error fetching tasks:", error);
            reject(error);
         } finally {
            unsub();
         }
      });
   });
};
export const getUserName = async () => {
   return new Promise((resolve, reject) => {
      const unsub = onAuthStateChanged(auth, async (user) => {
         if (!user) {
            resolve(""); 
            return;
         }

         try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
               resolve(userSnap.data().name); 
            } else {
               resolve(""); 
            }
         } catch (error) {
            console.error("Error fetching user name:", error);
            reject(error);
         } finally {
            unsub();
         }
      });
   });
};
const categories = ['to do', 'in progress', 'review', 'done']

export const markDone = async (id, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")
         return
   };
   const taskRef = doc(db, `users/${user.uid}/tasks`, id)
   const newCategory = 'done'
   await updateDoc(taskRef, {status: newCategory})
   if (showToast) showToast("good job", "success")
}
export const toNextCategory = async (id, status, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")

      return
   };
   const taskRef = doc(db, `users/${user.uid}/tasks`, id)
   const index = categories.indexOf(status.toLowerCase())
   const newCategory = categories[index + 1] || status
   await updateDoc(taskRef, {status: newCategory})
   if (showToast) showToast("go on", "success")

}

export const toPreviousCategory = async (id, status, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")
      return
   };
   const taskRef = doc(db, `users/${user.uid}/tasks`, id)
   const index = categories.indexOf(status.toLowerCase())
   const newCategory = categories[index - 1] || status
   await updateDoc(taskRef, {status: newCategory})
   if (showToast) showToast("no problem try again", "success")

}


export const deleteTask = async (id, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")

      return
   };

   const taskRef = doc(db, `users/${user.uid}/tasks`, id)
   await deleteDoc(taskRef)
   if (showToast) showToast("deleted", "success")

}

export const addProblem = async (problem, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "error")

      return
   };
   await addDoc(collection(db, `users/${user.uid}/problems`), problem)
   if (showToast) showToast("problem added", "success")

}

export const getProblems = async () => {
   return new Promise ((resolve, reject) => {
      const unsub = onAuthStateChanged(auth, async (user) => {
         if (!user) {
            resolve([])
            return
         };

         try {
            const querySnapshot = await getDocs(collection(db , `users/${user.uid}/problems`))
            const problems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
            resolve(problems)
         } catch (error) {
            console.log(error)
            reject(error)
         } finally {
            unsub()
         }
      })
   })

}

export const solvedProblem = async (id, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")
      return
   };
   const problemRef =  doc(db, `users/${user.uid}/problems`, id)
   await updateDoc(problemRef, { solved: true })
   if (showToast) showToast("good job", "success")

}
export const deleteProblem = async (id, showToast) => {
   const user = auth.currentUser
   if (!user) {
      if (showToast) showToast("please sign in first", "failed")
      return
   };
   const problemRef =  doc(db, `users/${user.uid}/problems`, id)
   await deleteDoc(problemRef)
   if (showToast) showToast("deleted", "success")

}