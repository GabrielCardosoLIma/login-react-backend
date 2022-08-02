import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import api from "../../services/api";
import { Container } from "react-bootstrap";
import './tabela.css';

export const ListaUsuarios = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getUsers = async () => {
    const valueToken = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: "Bearer " + valueToken,
      },
    };
    await api
      .get("/users", headers)
      .then((response) => {
        console.log(response.data.users);
        setData(response.data.users);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.mensagem,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!",
          });
        }
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="tabela">
      <Container>


      <h1>Lista de Usuários</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Sexo</th>
        </tr>
      </thead>
      <tbody>
      {data.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
        </tr>


      ))}

      </tbody>
      </Table>
       <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/usuarios/novo">Novo Usuário</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};
