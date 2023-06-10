import React, { useEffect, useState } from 'react'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const userInputs = [
    {
        id: "name",
        label: "Name and surname",
        type: "text"
    },
    {
        id: "email",
        label: "Email",
        type: "text"
    },
    {
        id: "phone",
        label: "Phone number",
        type: "text"
    },
    {
        id: "password",
        label: "Password",
        type: "password"
    },
    {
        id: "address",
        label: "Address",
        type: "text"
    },
    {
        id: "country",
        label: "Country",
        type: "text"
    },
]

const New = () => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [perc, setPerc] = useState(null)

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev)=> ({...prev, img:downloadURL}))
                    });
                }
            );
        };
        file && uploadFile();
    }, [file])

    const handleInput = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp(),
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>New user</h1>
            <div className="input-group">
                <label htmlFor="file">Image</label>
                <input type="file" id='file' onChange={(e) => setFile(e.target.files[0])} />
            </div>

            {userInputs.map((input) => (
                <div className='input-group' key={input.id}>
                    <label>{input.label}</label>
                    <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} />
                </div>
            ))}

            <button disabled={perc !== null && perc < 100} type='submit'>Send</button>
        </form>
    )
}

export default New