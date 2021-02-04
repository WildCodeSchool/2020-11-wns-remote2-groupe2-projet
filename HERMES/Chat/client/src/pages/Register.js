import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Logo from "../img/hermes1.png";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push("/login"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerUser({ variables });
  };

    return (
        <Row className="bg-chat py-5 justify-content-center align-items-center" style={{margin: '206px 0 0 0'}}>
            <img className="img-connexion" src={Logo} alt="logo hermes" />
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center">Inscription</h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group>
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email :'}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            value={variables.email}
                            className={errors.email && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, email: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.username && 'text-danger'}>
                            {errors.username ?? 'Identifiant :'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={variables.username}
                            className={errors.username && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, username: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.password && 'text-danger'}>
                            {errors.password ?? 'Mot de passe :'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={variables.password}
                            className={errors.password && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({ ...variables, password: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.confirmPassword && 'text-danger'}>
                            {errors.confirmPassword ?? 'Confirmation mot de passe :'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={variables.confirmPassword}
                            className={errors.confirmPassword && 'is-invalid'}
                            onChange={(e) =>
                                setVariables({
                                    ...variables,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..' : 'Inscription'}
                        </Button>
                        <br />
                        <small>Vous avez un compte ? <Link to={"/login"}>Se connecter</Link></small>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
