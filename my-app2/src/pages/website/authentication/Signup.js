import Forms from "../../../Component/Forms/Forms";
import Header from "../../../Component/Header";
import '../../../style.css';
import {User}  from "../contex/UserContext";
import Cookies from 'universal-cookie';
import "./login.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export default function Signup() {
     const [name, setname] = useState("");
    const[email,setemail]=useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [accept, setaccept] = useState(false);
    const [emailerror, setemailerror] = useState(false);

    const nav = useNavigate();
      //cookie
    const cookie = new Cookies();


     const userNow = useContext(User);
    console.log(userNow);


     async function submit(e) {

        e.preventDefault();
         setaccept(true);


        try {

                let res = await axios.post("http://127.0.0.1:8000/api/register", {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: cpassword,
                });
            const token = res.data.data.token;
              cookie.set("Bearer", token);
                const userDetails = res.data.data.user;
                userNow.setAuth({ token, userDetails });
            nav("/dashboard");

        } catch (err) {
            if(err.response.status===422){
            setemailerror(true);
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
                <label htmlfor="name">Name:</label>
                    <input id="name" type="text" placeholder="Name...." value={name} onChange={(e) => setname(e.target.value)} />
                   {name===''&&accept&&<p className="error">username is required</p> }
                <label htmlfor="email">Email:</label>
                    <input id="email" type="email" placeholder="email...." required value={email} onChange={(e) => setemail(e.target.value)} />
                    {accept && emailerror &&<p className="error">Email is already registered</p>}
                <label htmlfor="password">Password:</label>
                    <input id="password" type="password" placeholder="password...." value={password} onChange={(e) => setpassword(e.target.value)} />
                   {password.length < 8 && accept &&   <p className="error">password must be more than 8 char</p>}
                  <label htmlfor="password">Confirm Password:</label>
                    <input id="confirmpassword" type="password" placeholder="confirm password...." value={cpassword} onChange={(e) => setcpassword(e.target.value)} />
{cpassword !==password&&accept&&<p className="error">password is not match</p>}
                <div style={{ textAlign: "center" }}>
                    <button type="submit" >Register</button>
                </div>
            </form>
            </div>
             </div>

            </div>

    );
}