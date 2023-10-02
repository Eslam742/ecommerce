import { useEffect,useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../website/contex/UserContext";

export default function Users() {
    const [users, setusers] = useState([]);
    const [runuseeffect, setrunuseeffect] = useState(0);

    const context = useContext(User);
    const token=context.auth.token;


    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/user/show", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,

                },
            })
            .then((data) => setusers(data.data))
            .catch((err) => console.log(err));

}, [runuseeffect]);

 const showusers = users.map((user, index) =>
        <tr key={index}>

            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`${user.id}`}>
                <i className="fa-sharp fa-solid fa-pen-to-square"style={{color:"#74afb9",fontSize:"20px",paddingRight:"20px"}}></i></Link>
                <i onClick={()=>deleteuser(user.id)} className="fa-sharp fa-solid fa-trash"style={{color:"red",fontSize:"20px",cursor:"pointer"}} ></i>
            </td>
            </tr>)

    async function deleteuser(id) {
    try{
        const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
            headers: {
     Authorization:"Bearer " + token,
            },
        });

 if(res.status===200){
setrunuseeffect((prev) =>prev+1);
 }

    }catch{console.log("none")}
}





    return (
        <div style={{padding:"20px"}}>
            <table>
                <thead>
             <tr>
                        <th>Id</th>
                        <th>User</th>
                    <th>Email</th>
                        <th>Edit</th>
                    </tr>

                </thead>
                <tbody>{showusers}</tbody>
            </table>

        </div>
    );
}