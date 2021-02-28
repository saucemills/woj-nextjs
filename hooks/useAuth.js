import { useState, useEffect, useContext, createContext } from 'react'
import { auth, db } from '../config/firebase'

const authContext = createContext({ user: {} })

const { Provider } = authContext

export function AuthProvider(props) {
  const auth = useAuthProvider()
  return <Provider value={auth}>{props.children}</Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useAuthProvider = () => {
  const [user, setUser] = useState(null)

  const createUser = (user) => {
    return db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user)
        return user
      })
      .catch((error) => {
        return { error }
      })
  }

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification()
        return createUser({ uid: response.user.uid, email, name })
      })
      .catch((error) => {
        return { error }
      })
  }

  const signIn = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
        getUserAdditionalData(user)
        return response.user
      })
      .catch((error) => {
        return { error }
      })
  }

  const signOut = () => {
    return auth.signOut().then(() => setUser(false))
  }

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response
    })
  }

  const getUserAdditionalData = (user) => {
    return db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          setUser(userData.data())
        }
      })
  }

  const handleAuthStateChanged = (user) => {
    setUser(user)
    if (user) {
      getUserAdditionalData(user)
    }
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged)

    return () => unsub()
  }, [])

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  }
}
