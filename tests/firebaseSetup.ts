import firebase, { FirebaseError } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.auth().signInWithEmailAndPassword(
  process.env.TEST_OWNER_EMAIL,
  process.env.TEST_OWNER_PASSWORD)

export function initFirestoreData ():void {
  const db = firebase.firestore()
  const pagelogRef = db.collection('pagelog')
  const siteRef = db.collection('sites').doc('mekanismi')
  const pageRef = siteRef.collection('pages').doc('mekanismi')

  siteRef.set({ creator: 'aaa' })
  pageRef.set({ creator: 'aaa' })
  pagelogRef.doc('mekanismi.mekanismi').set({ creator: 'aaa' })
}

export function clearFirestoreData ():void {
  const db = firebase.firestore()
  const pagelogRef = db.collection('pagelog')
  const siteRef = db.collection('sites').doc('mekanismi')
  const pageRef = siteRef.collection('pages').doc('mekanismi')

  siteRef.delete()
  pageRef.delete()
  // Erase the pagelog completely
  pagelogRef.get().then((docs) => {
    docs.forEach((doc) => {
      pagelogRef.doc(doc.id).delete()
    })
  })
}
