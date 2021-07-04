import db from "../db/firestore";
import firebase from "firebase/app";
const extractSnapshotData = snapshot =>
    snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

export const fetchChats = () =>
    db.collection("chat").get().then(extractSnapshotData);


export const createChat = chat =>
    db
        .collection('chat')
        .add(chat)
        .then(docRef => docRef.id)


export const joinChat = async (userId, chatId) => {
    const userRef = db.doc(`profiles/${userId}`)
    const chatRef = db.doc(`chat/${chatId}`)

    await userRef.update({ joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef) })
    await chatRef.update({ joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef) })

}
