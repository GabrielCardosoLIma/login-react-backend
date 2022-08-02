import React, { useState } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./UsuariosForm.css";

const initialValue = {
  name: "",
  email: "",
  password: ""
};

export const UsuariosForm = () => {
    
    const history = useHistory();

  const [values, setValues] = useState(initialValue);
  const [acao, setAcao] = useState("Novo");
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
    loading: false
  });

  const valorInput = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

  const formSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    const valueToken = localStorage.getItem("token");
    const headers = {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer " + valueToken
      },
    };
    await api.post("/user", values, headers)
      .then((response) => {
        // setStatus({ loading: false })
        setStatus({
            type: "success",
            mensagem: response.data.mensagem,
            loading: false
          })
        return history.push("/usuarios")
      }).catch((err) => {
        if(err.response){
            setStatus({
                type: "error",
                mensagem: err.response.data.mensagem,
                loading: false
              })
        } else {
            setStatus({
              type: "error",
              mensagem: "Erro: tente mais tarde!",
              loading: false
            })
        }
      })
  };

  return (
    <div className="box">
      <Form onSubmit={formSubmit} className="borderForm">
        <h1>Cadastre-se</h1>
        {status.type == "error" ? (
          <h3 className="p-alert-error">{status.mensagem}</h3>
        ) : (
          ""
        )}
        {status.type == "success" ? (
          <h3 className="p-alert-success">{status.mensagem}</h3>
        ) : (
          ""
        )}
        {status.loading ? (
          <h3 className="p-alert-validando">Validando...</h3>
        ) : (
          ""
        )}
        <div className="user">
          <UserCircle size={80} color="#030202" />{" "}
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="FormLabel">Nome de Usuário:</Form.Label>
          <Form.Control
            type="name"
            name="name"
            onChange={valorInput}
            placeholder="Digite seu nome"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Endereço de Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={valorInput}
            placeholder="Digite seu email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={valorInput}
            placeholder="Digite sua senha"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>Sexo:</Form.Label>
          <Form.Control
            type="gender"
            name="gender"
            onChange={valorInput}
            placeholder="Digite seu sexo"
          />
        </Form.Group>
        {status.loading ? (
          <Button variant="Secondary" disabled type="submit">
            Aguarde...
          </Button>
        ) : (
          <Button variant="dark" type="submit">
            Cadastrar
          </Button>
        )}
      </Form>
    </div>
  );
};
