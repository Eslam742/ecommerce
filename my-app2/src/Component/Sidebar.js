import { NavLink } from "react-router-dom";
export default function Sidebar(){
    return(
        <div className="side-bar">
            <NavLink  to="/dashboard/users" className="item-link"><i className="fa-solid fa-users-line"></i> users</NavLink>
            <NavLink to="/dashboard/user/create" className="item-link"><i className="fa-solid fa-user-plus"></i> New User</NavLink>
            <NavLink to="/dashboard/Products/" className="item-link"><i class="fa-brands fa-product-hunt"></i> Products</NavLink>
            <NavLink  to="/dashboard/Products/create" className="item-link"><i class="fa-solid fa-cart-plus"></i>New Products</NavLink>

        </div>
    );
}