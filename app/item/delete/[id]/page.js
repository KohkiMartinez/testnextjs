// app/item/delete/[id]/page.js

"use client"
import { useState, useEffect } from "react" 
import Image from "next/image"
import useAuth from "@/app/utils/useAuth"

const DeleteItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")

    const loginUserEmail = useAuth()

    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"})
            const jsonData = await response.json()
            const singleItem = await jsonData.singleItem
            
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setEmail(singleItem.email)
            setDescription(singleItem.description)
        }
        getSingleItem(context.params.id)
    }, [context])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                })
            })
            console.log(localStorage.getItem("token"))
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch(err) {
            alert("Failed to Delete an Item")
        }
    }

    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className="page-title">Delete Item</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <Image src={image} width={750} height={500} alt="item-image" priority/>
                    <h3>\{price}</h3>
                    <p>{description}</p>
                    <button>Delete</button>
                </form>
            </div>
        )
    } else {
        <h1>You do not have permission to delete this item</h1>
    }

}

export default DeleteItem