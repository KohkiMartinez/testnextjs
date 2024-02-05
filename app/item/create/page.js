// app/item/create/page.js

"use client"
import { useState } from "react" 
import useAuth from "@/app/utils/useAuth"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const loginUserEmail = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
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
            alert("Failed to create an Item")
        }
    }

    if(loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">Create Item</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                     type="text" name="title" placeholder="Item Name" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)}
                     type="text" name="price" placeholder="Price" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)}
                     type="text" name="iamge" placeholder="Image" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                     name="description" rows={15} placeholder="Description" required></textarea>
                    <button>Create</button>
                </form>
            </div>
        )
    }

}

export default CreateItem