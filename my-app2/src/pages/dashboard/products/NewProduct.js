

import { useEffect,useState, useContext } from "react";
import { User } from "../../website/contex/UserContext";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../../style.css';


export default function NewProduct() {
     const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const[image,setimage]=useState("");

    const [accept, setaccept] = useState(false);

    const context = useContext(User);
    const token=context.auth.token;

    const nav = useNavigate();


     async function submit(e) {

        e.preventDefault();
         setaccept(true);


         try {
             const formdata = new FormData();
             formdata.append("title", title);
             formdata.append("description", description);
             formdata.append("image", image);

                let res = await axios.post("http://127.0.0.1:8000/api/product/create",
                    formdata,

                 {
                    headers: {
                        Authorization:"Bearer " + token,
                    },
                },
                );



            nav("/dashboard/Products");

        } catch (err) {

        }
         setaccept(true);
         }





    return (
        <div className="create">


        <div >
            <div>
            <form onSubmit={submit} >
                <label htmlfor="name">Title:</label>
                    <input id="name" type="text" placeholder="Title...." value={title} onChange={(e) => settitle(e.target.value)} />
                   {title===''&&accept&&<p className="error">Title is required</p> }
                <label htmlfor="email">Description:</label>
                    <input id="email" type="text" placeholder="Description...." required value={description} onChange={(e) => setdescription(e.target.value)} />
                    {/*accept && emailerror &&<p className="error">Email is already registered</p>*/}
                <label htmlfor="password">Image:</label>
                    <input id="password" type="file" placeholder="image...."  onChange={(e) => setimage(e.target.files.item(0))} />
                   {/*password.length < 8 && accept &&   <p className="error">password must be more than 8 char</p>*/}

                <div style={{ textAlign: "center" }}>
                    <button type="submit" className="btn">Create Product</button>
                </div>
            </form>
            </div>
             </div>

            </div>

    );
}