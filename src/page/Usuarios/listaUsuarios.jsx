import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export const ListaUsuarios = () => {

  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const getUsers = async () => {
    const valueToken = localStorage.getItem('token');
    const headers = {
      'headers': {
        'Authorization': 'Bearer ' + valueToken,
      },
    }
    await api.get("/users", headers)
    .then((response) =>{
        console.log(response.data.users)
        setData(response.data.users);
    }).catch((err) => {
        if(err.response){
            setStatus({
                type: 'error',
                mensagem: err.response.mensagem
            })
        } else {
            setStatus({
                type: 'error',
                mensagem: 'Erro: Tente mais tarde!'
            })
        }
    })
}

    useEffect( () => {
        getUsers();
    }, []);

  return (
    <>
      <ul>
        <li>
          <Link to="/dashboard">Dahboard</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuários</Link>
        </li>
      </ul>
      <h1>Usuários</h1>
      {data.map(user => (
        <div key={user.id}>
            <div>
                {user.name}
            </div>
            <div>
                {user.email}
            </div>
            <hr />
        </div>
      ))}
    </>
  );
};
