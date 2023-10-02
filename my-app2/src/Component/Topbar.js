import { Link } from "react-router-dom";
import '../style.css';
export default function Topbar(){
    return (
        <div className="d-flex container top-bar shadow" >
<div className="d-flex" style={{position:"relative",left:"5%",width:"90%"}}>
<h1>store</h1>
<Link to="/" className="register-nav" >Go to website</Link>
</div>


        </div>
    );
}