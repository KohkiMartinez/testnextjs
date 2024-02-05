// app/user/login/page.js

"use client"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSbumit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            console.log(jsonData.token)
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
        } catch(err) {
            alert("Failet to Login...")
        }
    }
    return (
        <div>
            <h1 className="page-title">Login</h1>
            <form onSubmit={handleSbumit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                 type="text" name="email" placeholder="E-mail" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)}
                 type="text" name="password" placeholder="Password" required/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login