import React, { useState, useContext} from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import MovieContext from "../../context/MovieContext";
import Bars from "../../svg/bars-solid.svg";
import Times from "../../svg/times-solid.svg";
import "./navbar.css";

export default function Navbar() {
  const {userToken} = useContext(MovieContext);
  let [openNav, setOpenNav] = useState(false);
  
  let menuClass = "menu-list ";
  menuClass += openNav && "open";

  const handleMenu = () => {
    setOpenNav(!openNav);
  };

  const handleLogOut =()=>{
    localStorage.clear();
    window.location.replace("/")
    
  }
  return (
    <div>
      <header>
        <div onClick={handleMenu} className="menu">
          <img style={{filter: "invert(100%)"}} src={Bars} alt="bars" width="20" />
        </div>
        <div className="logo">
          <h1>
            <Link to="/">The Movie Client</Link>
          </h1>
        </div>
        <nav>
          <ul className={menuClass}>
            {userToken && 
              <>
                <li>
                  <Link onClick={handleMenu} to="/movies">Movies</Link>
                </li>
                <li>
                  <Link onClick={handleMenu} to="/add">Add Movie</Link>
                </li>
              </>
            }
            {!userToken ? (
              <>
                <li>
                  <Link onClick={handleMenu} to="/login">Login</Link>
                </li>
                <li>
                  <Link onClick={handleMenu} to="/register">Register</Link>
                </li>
              </>
            ):( 
              <li>
                <button onClick={()=>handleLogOut()} className="btn-logout" to="/">Logout</button>
              </li>
            )}
            <li onClick={handleMenu} className="close">
              <img style={{filter: "invert(100%)"}} src={Times} width="20" alt="times" />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
