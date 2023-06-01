import { useState, useEffect } from 'react';
import '../App.css';
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
//read, collection, getDocs
//create, collection, addDoc
//update, updateDoc, doc
//delete, deleteDoc, doc

function DataCRUD() {
    
    const [newName, setNewName] = useState("");//create step 1.1
    const [newAge, setNewAge] = useState(0);//create step 1.2
    const [users, setUsers] = useState([]);//read step 1.1

    const [reload, setReload] = useState(0);
    const userCollectionRef = collection(db, "users")//crud 1,collection(reference, collectionName) //crud 1,collection(reference, collectionName)

    //function to create user
    const createUser = async () => {//create step 2
        await addDoc(userCollectionRef, {
            name: newName,
            age: Number(newAge),
        });
        setReload(reload + 1);
    };//create step 2 end

    //function used to update the data
    const updateUser = async (id, age) => { //update step 2
        const userDoc = doc(db, "users", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
        setReload(reload + 1);
    }//update 2 end

    //function to delete user
    const deleteUser = async (id) => { //delete step 2
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        setReload(reload + 1);
    } //delete 2 end

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);//read step 2
            console.log(data);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read step 3
        }
        getUsers()
    }, [reload])

    return (
        <div className="DataCRUD">
            <input
                placeholder='Name...'
                onChange={(event) => {
                    setNewName(event.target.value)
                }}//create step 3,onChange
            />
            <input
                type="number"
                placeholder='Age...'
                onChange={(event) => {
                    setNewAge(event.target.value)
                }}//create step 4,onChange
            />

            <button onClick={createUser}>Create User</button>{/* create step 5*/}

            {users.map((user) => { //read step  4
                return (
                    <div>
                        <h1>Name: {user.name}</h1>
                        <h1>Age: {user.age}</h1>
                        <button
                            onClick={() => {
                                updateUser(user.id, user.age)//update step 3
                            }}>
                            Increase Age
                        </button>
                        <button
                            onClick={() => {
                                deleteUser(user.id);//delete step 3
                            }}>
                            Delete User
                        </button>
                    </div>
                );
            })//read step 4 end
            }
        </div>
    );
}

export default DataCRUD;