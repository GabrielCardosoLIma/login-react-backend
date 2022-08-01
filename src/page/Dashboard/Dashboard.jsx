import React, { useContext } from "react";
import { Context } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./style.css";

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const { authenticated, handleLogout } = useContext(Context);
  console.log(`Situação do usuário na página Dashboard: ${authenticated}`);

  return (
    <div>
      <ul>
        <li>
          <Link to="/dashboard">Dahboard</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuários</Link>
        </li>
      </ul>
      <h1>Dashbord</h1>
      <h3>Token: {token}</h3>
      <button type="button" className="button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};
