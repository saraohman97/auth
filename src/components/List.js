import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'

const List = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setData(list)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    console.log(data)

    return (
        <div>
            <h1>List of items</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{ outline: 'none' }}></th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(user => (
                        <tr key={user.id}>
                            <td style={{ outline: 'none' }}><img src={user.img} alt="" /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List