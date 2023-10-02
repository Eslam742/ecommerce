import Cookies from 'universal-cookie';
import Header from "../../../Component/Header";
import '../../../style.css';
import {User}  from "../contex/UserContext";
import "./login.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export default function Login() {

    const[email,setemail]=useState("");
    const [password, setpassword] = useState("");

    const [accept, setaccept] = useState(false);
    const [Err, setErr] = useState(false);

    const nav = useNavigate();
    //cookie
    const cookie = new Cookies();



     const userNow = useContext(User);
    console.log(userNow);


     async function submit(e) {

        e.preventDefault();
         setaccept(true);


        try {

                let res = await axios.post("http://127.0.0.1:8000/api/login", {

                    email: email,
                    password: password,

                });
                const token = res.data.data.token;
                  cookie.set("Bearer", token);
                const userDetails = res.data.data.user;
                userNow.setAuth({ token, userDetails });
            nav("/dashboard");

        } catch (err) {
            if(err.response.status===401){
            setErr(true);
        }
         setaccept(true);
         }
     }




    return (
        <div >
            {""}
            <Header/>
        <div className="register" >
            <div className="reg">
            <form onSubmit={submit} className="formr">

                <label htmlfor="email">Email:</label>
                    <input id="email" type="email" placeholder="email...." required value={email} onChange={(e) => setemail(e.target.value)} />

                <label htmlfor="password">Password:</label>
                    <input id="password" type="password" placeholder="password...." value={password} onChange={(e) => setpassword(e.target.value)} />
                   {password.length < 8 && accept &&   <p className="error">password must be more than 8 char</p>}

                <div style={{ textAlign: "center" }}>
                    <button type="submit" >Login</button>

                </div>
                 {accept && Err &&(<p className="error">Email or Password Not Right</p>)}
            </form>
            </div>
             </div>

            </div>

    );
}