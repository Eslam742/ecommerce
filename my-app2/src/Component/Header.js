import { Link } from "react-router-dom";
import "../style.css";
import Cookies from "universal-cookie";
import axios from "axios";
export default function Header() {

    const cookie = new Cookies();
    const token = cookie.get("Bearer");

   async function handlelogout() {
       await axios.post("http://127.0.0.1:8000/api/logout", null, {
           headers: {
               Authorization: "Bearer " +token,

           },
       });
       cookie.remove("Bearer ");
       window.location.pathname = "/";
    }


    return (

        <div className="container shadow" >

        <nav   style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"fixed",top:"15px",left:"10%",}}>

            <Link to="/" style={{marginRight:"35px",textDecoration:"none", color:"black" ,fontSize:"20px"}}>Home</Link>
           <Link to="/About" style={{marginRight:"35px",textDecoration:"none", color:"black" ,fontSize:"20px"}}>About</Link>

                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"fixed",top:"0px",left:"75%",top:"15px"}}>

                    {!token ? (
                        <><Link to="/register" style={{ textAlign: "center", marginRight: "5px" }} className="register-nav"> Register</Link>
                    <Link to="/login" style={{ textAlign: "center",marginRight:"5px" }} className="register-nav" > Login</Link>
                        </>
                    ) : (
                        <>
                        <Link to="/dashboard" style={{ textAlign: "center" }} className="register-nav" > dashboard</Link>
                            <div className="register-nav" onClick={handlelogout}>Log out</div>
                        </>
                    )}
                 </div>
        </nav>
        </div>

    );
}