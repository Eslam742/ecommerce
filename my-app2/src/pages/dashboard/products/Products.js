import { useEffect,useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../website/contex/UserContext";

export default function Products() {
    const [products, setproducts] = useState([]);
    const [runuseeffect, setrunuseeffect] = useState(0);

    const context = useContext(User);
    const token=context.auth.token;


    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/product/show", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,

                },
            })
            .then((data) => setproducts(data.data))
            .catch((err) => console.log(err));

}, [runuseeffect]);

 const showproducts = products.map((product, index) =>
        <tr key={index}>

            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                <i className="fa-sharp fa-solid fa-pen-to-square"style={{color:"#74afb9",fontSize:"20px",paddingRight:"20px"}}></i></Link>
                <i onClick={()=>deleteuser(product.id)} className="fa-sharp fa-solid fa-trash"style={{color:"red",fontSize:"20px",cursor:"pointer"}} ></i>
            </td>
            </tr>)

    async function deleteuser(id) {
    try{
        const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
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
                        <th>Title</th>
                    <th>Description</th>
                        <th>Edit</th>
                    </tr>

                </thead>
                <tbody>{showproducts}</tbody>
            </table>

        </div>
    );
}