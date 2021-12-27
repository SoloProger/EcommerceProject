import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/consts";

// React-bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Введите email:" />
          <Form.Control className="mt-3" placeholder="Введите пароль:" />
          <Row xs="auto" className="d-flex justify-content-between mt-3">
            {isLogin ? (
              <div>
                Нет аккаунта ?
                <NavLink to={REGISTER_ROUTE}>Зарегистрируйтесь!</NavLink>
              </div>
            ) : (
              <div>
                Уже есть аккаунт ?
                <NavLink to={LOGIN_ROUTE}>Авторизуйтесь!</NavLink>
              </div>
            )}
            <Button variant={"outline-success"}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default Auth;
