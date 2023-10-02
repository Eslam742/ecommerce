import Topbar from "../../Component/Topbar";
import Sidebar from "../../Component/Sidebar";
import './dashboard.css';
import { Outlet } from "react-router-dom";

export default function Dashboard(){
    return(
        <div>
            <Topbar />
            <div className="content-flex">
                <Sidebar />
                <div style={{width:"80%"}}>
              <Outlet/>
                </div>
            </div>
        </div>
    );
}