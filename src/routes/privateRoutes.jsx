import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Dashboard } from '../page/Dashboard/Dashboard';
import { Context } from '../context/AuthContext';
import { ListaUsuarios } from '../page/Usuarios/listaUsuarios';
import { UsuariosForm } from '../page/UsuariosForm/UsuariosForm';

function CustomRoute({ isPrivate, ...rest}){
    const { authenticated } = useContext(Context);
    if (isPrivate && !authenticated){
        return <Redirect to="/"  />
    }
    return <Route { ...rest } />
}

export default function PrivateRoute(){
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute isPrivate path="/usuarios/novo" component={UsuariosForm} />
            <CustomRoute isPrivate path="/usuarios" component={ListaUsuarios} />
        </Switch>
    )
};