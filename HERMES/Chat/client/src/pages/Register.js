import React, {useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap';
import {gql, useMutation} from '@apollo/client';

const REGISTER_USER = gql`
    mutation register($username: String! $email: String! $password: String! $confirmationPassword: String! ) {
        register(username: $username email: $email password: $password  confirmationPassword: $confirmationPassword ) {
            username email createdAt
        }
    }
`;

export default function Register() {
    const [variables, setVariables] = useState({
        username: "",
        email: "",
        password: "",
        confirmationPassword: ""
    })
    const [registerUser, {loading}] = useMutation(REGISTER_USER){
        update(_, res){
            console.log(res);
        },
        onError(err){
            console.log(err)
        }
    };
    const submitRegisterForm = (e) => {
        e.preventDefault()

        registerUser({ variables })
    }
    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center">
                    Inscription
                </h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group>
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" value={variables.username}
                                      onChange={(e) => setVariables({...variables, username: e.target.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={variables.email}
                                      onChange={(e) => setVariables({...variables, email: e.target.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={variables.password}
                                      onChange={(e) => setVariables({...variables, password: e.target.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirmation Password</Form.Label>
                        <Form.Control type="password" value={variables.confirmationPassword}
                                      onChange={(e) => setVariables({
                                          ...variables,
                                          confirmationPassword: e.target.value
                                      })}/>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="success" type="submit">
                            Enregistrer
                        </Button>
                    </div>

                </Form>
            </Col>
        </Row>

    );
}

