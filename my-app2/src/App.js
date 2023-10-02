import { Route, Routes } from "react-router-dom";
//dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/products/Products";
import NewProduct from "./pages/dashboard/products/NewProduct";
import UpdateProduct from "./pages/dashboard/products/UpdateProduct";
//users
import Users from "./pages/dashboard/users/Users";
import Updateuser from "./pages/dashboard/users/Updateuser";
import Createuser from "./pages/dashboard/users/Createuser";
//website
import Home from "./pages/website/Home";
import About from "./pages/website/About";
//Authentication
import Signup from "./pages/website/authentication/Signup";
import Persistlogin from "./pages/website/authentication/Persistlogin";
import Login from "./pages/website/authentication/Login";
import RequireAuth from "./pages/website/authentication/RequireAuth";









export default function App() {


   return (<div>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/register" element={<Signup/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/About" element={<About />} />

         <Route element={<Persistlogin/>}>
         <Route element={<RequireAuth/>}>
         <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="users" element={<Users />}/>
                   <Route path="user/create" element={<Createuser />}/>
                  <Route path="users/:id" element={<Updateuser />} />
                  <Route path="Products" element={<Products />} />
                  <Route path="Products/create" element={<NewProduct />} />
                  <Route path="Products/:id" element={<UpdateProduct />} />

               </Route>
               </Route>
      </Route>
</Routes>
   </div>);


}