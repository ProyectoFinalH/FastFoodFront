import Sidebar from "./sidebar/sidebar";
import "./admin.css";
import { useEffect, useState } from "react";
import Loading from "../../Components/loading/Loading";
// import alertify from "alertifyjs";


function Admin() {

  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    }, []);


  return (
    <div className="adminContainer">
      {loading && <Loading />}
        <Sidebar />
      
    </div>
  );
}

export default Admin;

