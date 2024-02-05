// app/user/register/page.js

"use client"
import { useState } from "react"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSbumit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch(err) {
            alert("Failed to Register...")
        }
    }

    return (
        <div>
            <h1 className="page-title">Register</h1>
            <form onSubmit={handleSbumit}>
                <input value={name} onChange={(e) => setName(e.target.value)}
                 type="text" name="name" placeholder="Name" required/>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                 type="text" name="email" placeholder="E-mail" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)}
                 type="text" name="password" placeholder="Password" required/>
                <button>Register</button> 
            </form>
        </div>
    )
}

export default Register