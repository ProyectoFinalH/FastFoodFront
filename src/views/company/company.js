import Sidebar from "./sidebar/sidebar"
import logo from "../../images/logo.png"
import "./company.css"

function Company() {
    

  return (
    <div className="companyContainer">
<div className="navbarCompany">
  <img src={logo} alt="logo"/>
</div>
<div>
  <Sidebar/>
</div>
    </div>
  )
}

export default Company