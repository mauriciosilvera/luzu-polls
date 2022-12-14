import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../util/Requests';
import { auth } from '../../util/auth';
import './Form.css';

function Form(props) {
  const { recovery, setIsSidebarButtonDisplayed, setIsSidebarOpen } = props;
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const isAuth = auth?.isAuthenticated;
  const formMessage = recovery ? 'Enviar Pin' : 'Iniciar Sesión';

  useEffect(() => {
    if (isAuth) {
      navigate('/admin/polls-management', { replace: true });
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    const loginData = {
      admin_name: userName,
      admin_password: password
    };

    const res = await Login(loginData);

    if (res.response) {
      setError(res?.response?.data?.message);
      return;
    }
    setIsSidebarButtonDisplayed(true);
    setIsSidebarOpen(false);
    auth.signin(res?.data?.token);

    if (recovery) {
      navigate('/admin/login');
    } else {
      navigate('/admin/polls-management');
    }
  };

  const handleEmail = (e) => {
    setUserName(e?.target?.value);
  };

  const handlePassword = (e) => {
    setPassword(e?.target?.value);
  };

  return (
    <form className="formWrapper" onSubmit={handleSubmit}>
      <div className="CTAcontainer">
        <div className="inputsContainer">
          <TextField
            className="formInput"
            autoFocus
            type="text"
            placeholder="Email"
            onChange={handleEmail}
            required
          />
          <TextField
            className="formInput"
            type="password"
            placeholder={recovery ? 'Pin' : 'Contraseña'}
            onChange={handlePassword}
            required
          />
        </div>
        <Button variant="contained" type="submit" className="formButton">
          {formMessage}
        </Button>
        <span className="error"> {error || null} </span>
      </div>
    </form>
  );
}

export default Form;
