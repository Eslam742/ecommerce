import { useEffect, useState,useContext  } from "react";
import axios from "axios";

import {User}  from "./../../pages/website/contex/UserContext";

export default function Forms(props) {
    const [name, setname] = useState("");
    const[email,setemail]=useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [accept, setaccept] = useState(false);
    const [emailerror, setemailerror] = useState("");

    const userNow = useContext(User);
    console.log(userNow);


    const styleRegister = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
    };

    const form = {
        boxShadow: "0px 2px 15px rgba(0 0 0 /10%)",
        width: "400px",
    };


    const buttonstyle = {
        width:"100%",
    }


    useEffect(() => {
setname (props.name) ;
setemail (props.email) ;
},[props.name,props.email])

    async function submit(e) {

        e.preventDefault();


        try {

                let res = await axios.post("http://127.0.0.1:8000/api/register", {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: cpassword,
                });
                const token = res.data.token;
                const userDetails = res.data.data.user;

                userNow.setAuth({ token, userDetails });

        } catch (err) {
            setemailerror(err.response.status);
        }

    }

    return (
        <div className="register" style={props.styleRegister && styleRegister}>
            <form onSubmit={submit} style={props.styleRegister && form}>
                <label htmlfor="name">Name:</label>
                    <input id="name" type="text" placeholder="Name...." value={name} onChange={(e) => setname(e.target.value)} />
                   {/*name===''&&accept&&<p className="error">username is required</p> */}
                <label htmlfor="email">Email:</label>
                    <input id="email" type="email" placeholder="email...." required value={email} onChange={(e) => setemail(e.target.value)} />
                    {/*accept && emailerror===422 &&<p className="error">Email is already registered</p>*/}
                <label htmlfor="password">Password:</label>
                    <input id="password" type="password" placeholder="password...." value={password} onChange={(e) => setpassword(e.target.value)} />
                   {/*password.length < 8 && accept &&   <p className="error">password must be more than 8 char</p>*/}
                  <label htmlfor="password">Confirm Password:</label>
                    <input id="confirmpassword" type="password" placeholder="confirm password...." value={cpassword} onChange={(e) => setcpassword(e.target.value)} />
{/*cpassword !==password&&accept&&<p className="error">password is not match</p>*/}
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={props.buttonstyle&&buttonstyle}>{props.button }</button>
                </div>
            </form>
            </div>

    );
}










/*(<div className="parent" style={{ display: "flex", alignItems: "center", justifyContent: " center", height: "80vh" }} >
        <div >
        <Header />
        </div> <Forms button="Register" endpoint="register" navigate="" styleRegister={true} />
    </div>
    );*/








    /*import { useState  } from "react";
import axios from "axios";
import Header from "../../../Component/Header";
import "./login.css"
import '../../../style.css';
export default function Login() {

    const[email,setemail]=useState("");
    const [password, setpassword] = useState("");
    const [accept, setaccept] = useState(false);
    const [emailerror,setemailerror]=useState("")


  async  function submit(e){
        let flag = true;
        e.preventDefault();
        setaccept(true);
        if (password.length < 8 ) {
            flag = false;
      } else flag = true;
      try{
        if (flag) {
              let res = await axios.post("http://127.0.0.1:8000/api/login", {

                  email: email,
                  password: password,

              });

          }


        }catch(err){
         setemailerror(err.response.status);
      }
    }


    return (

        <div className="parent">
            <div>
            <Header/>
            <div className="register login">
            <form onSubmit={submit}>

                <label htmlfor="email">Email:</label>
                    <input id="email" type="email" placeholder="email...." required value={email} onChange={(e) => setemail(e.target.value)} />
                    {accept && emailerror===422 &&<p className="error">Email is already registered</p>}
                <label htmlfor="password">Password:</label>
                    <input id="password" type="password" placeholder="password...." value={password} onChange={(e) => setpassword(e.target.value)} />
                   {password.length < 8 && accept &&   <p className="error">password must be more than 8 char</p>}

                <div style={{ textAlign: "center" }}>
                    <button type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}*/