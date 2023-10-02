import { Outlet } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import { User } from "../../website/contex/UserContext";
import LoadingScreen from "../../../Component/Loading";

export default function Presistlogin(){
//get current user
        const context = useContext(User);
    const token = context.auth.token;
    const[loading, setLoading]=useState(true);
    //cookie

    const cookie = new Cookies();

    const gettoken = cookie.get("Bearer");
    //send refresh token
    useEffect(() => {

        async function refresh() {
            try {
                await axios
                    .post(`http://127.0.0.1:8000/api/refresh`, null, {
                        headers: {
                            Authorization: "Bearer " + gettoken,


                        },
                    })
                    .then((data) => {
                        cookie.set('Bearer ',data.data.token)
                        context.setAuth((prev) => {
                            return {
                                userDetails: data.data.user,
                                token: data.data.token,

                            };

                        });

                    });

            }
            catch (err) {
                console.log(err);

            } finally {
                setLoading(false);

            }

        }
        !token ? refresh() : setLoading(false);

    }, );
    return loading ? <LoadingScreen /> : <Outlet /> ;

}