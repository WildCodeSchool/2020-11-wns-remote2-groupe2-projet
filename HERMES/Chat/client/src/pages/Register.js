import React, { useState } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Logo from "../img/hermes1.png";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $imageUrl: Upload!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      imageUrl: $imageUrl
    ) {
      username
      email
      createdAt
      imageUrl
    }
  }
`;

export default function Register(props) {

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(false);
    const [variables, setVariables] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        imageUrl: ""
    });


    const getImagePreview = (e) => {
        setImagePreview(false);
        setVariables({ ...variables, imageUrl: e.target.files[0] })
        if (e.target.files && e.target.files.length !== 0) {
            if (e.target.files[0].type === 'image/jpeg'
                || e.target.files[0].type === 'image/png'
            ) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = (event) => {

                    setImagePreview(event.target.result);

                };
            };
        }
    }

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, __) => props.history.push("/login"),
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    });

    const submitRegisterForm = (e) => {
        e.preventDefault();
        registerUser({ variables });
    };

    return (
        <Row className="bg-chat py-5 justify-content-center align-items-center" style={{ margin: '206px 0 0 0' }}>
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

                    <Form.Group>
                        <Form.Label className={errors.imageUrl && 'text-danger'}>
                            {errors.imageUrl ?? 'Image de profil :'}
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            className={errors.imageUrl && 'is-invalid'}
                            onChange={getImagePreview}
                        />
                    </Form.Group>
                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            className="user-image mr-md-2"
                            alt="Preview"
                        />
                    )}
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
