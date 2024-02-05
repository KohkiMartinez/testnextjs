// app/item/update/[id]/page.js

"use client"
import { useState, useEffect } from "react" 
import useAuth from "@/app/utils/useAuth"

const UpdateItem = (context) => {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
                method: "PUT",
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
            alert("Failed to update an Item")
        }
    }

    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className="page-title">Update Item</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                     type="text" name="title" placeholder="Item Name" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)}
                     type="text" name="price" placeholder="Price" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)}
                     type="text" name="iamge" placeholder="Image" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                     name="description" rows={15} placeholder="Description" required></textarea>
                    <button>Update</button>
                </form>
            </div>
        )
    } else {
        return <h1>You do not have permission to update this item</h1>
    }

}

export default UpdateItem