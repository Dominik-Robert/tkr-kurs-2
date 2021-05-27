
import React, {useState, useEffect} from 'react'
import './../index.css';

export default function SignUp() {
    const [wholeUser,setWholeUser] = useState(
        {lastname: '', firstname:'', userName: '', email: '', password: ''}
    )
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(useState(true))
    
    useEffect(() =>{
        fetch('http://localhost:3001/api/v1/users')
        .then(response => response.json())
        .then(user => {
            setUserData(user)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log(userData)
        console.log("hallo")
    }, [])
    

  
    


    const handleSubmit = (e) => { 
        e.preventDefault()
        console.log(JSON.stringify(wholeUser))

        fetch('http://localhost:3001/api/v1/users', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(wholeUser)
        }).then(() => {
            console.log("new user created")
        })

    }
    const userItems = userData.map((item) => {
        return (
            <li>
                <div>
                    {item.Name}
                    {item.Username}
                    {item.Password}
                </div>
            </li>
        )
    })
    return(
        <div>
            <div style={{margin:20}} className="form">
                <form onSubmit={handleSubmit}>
                    <div className="formNames">
                        <input placeholder="Name" value={wholeUser.lastname} onChange={(e) => setWholeUser({ ...wholeUser, lastname: e.target.value})}/>
                        <input placeholder="Vorname" value={wholeUser.firstname} onChange={(e) => setWholeUser({ ...wholeUser, firstname: e.target.value})}/>
                    </div>
                    <div>
                        <input placeholder="Username" value={wholeUser.userName} onChange={(e) => setWholeUser({ ...wholeUser, userName: e.target.value})}/>
                        <input placeholder="Email" value={wholeUser.email} onChange={(e) => setWholeUser({ ...wholeUser, email: e.target.value})}/>
                    </div>
                    <div>
                        {/* <label>Password</label> */}
                        <input placeholder="Password" value={wholeUser.password} onChange={(e) => setWholeUser({ ...wholeUser, password: e.target.value})}/>
                    </div>
                    <div>
                        <input value="Sign Up" label="Sign Up" type="submit" />
                    </div>
                </form>
                <div>
                    <h2>Your LastName is {wholeUser.lastname}</h2>
                    <h2>Your Firstname is {wholeUser.firstname}</h2>
                </div>
            </div>
            <div>
                { userItems }
            </div>
        </div>
    )
}