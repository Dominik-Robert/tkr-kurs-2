
import React, {useState} from 'react'

// Post Request -> zu API -> API sucht user und schaut, ob user existiert und wenn er das tut ob das passwort auch übereinstimmt

export default function Login() {


    const [user,setUser] = useState({
        userName: '', password: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        
        fetch('http://localhost:3001/api/v1/users/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(console.log("data send"))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="username" value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value})}/>
                    <input placeholder="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value})}/>
                </div>
                <div>
                    <input value="SignUp" type="submit"/>
                </div>
            </form>
            <div>
                <h1>{user.userName}</h1>
                <h1>{user.password}</h1>
            </div>

        </div>
    )
}
