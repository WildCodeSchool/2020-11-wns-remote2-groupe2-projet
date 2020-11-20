import React from 'react';
import { Container, Row , Col , Form , Button} from 'react-bootstrap';
import './App.scss';

function App() {
  return (
    <Container className="pt-5">
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">
        Inscription
      </h1>
      <Form >
  <Form.Group >
    <Form.Label>username</Form.Label>
    <Form.Control type="text"  />
    </Form.Group>
    <Form.Group >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email"  />
    </Form.Group>
    <Form.Group >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  />
    </Form.Group>
    <Form.Group >
    <Form.Label>Confirmation Password</Form.Label>
    <Form.Control type="confirmationPassword"  />
    </Form.Group>
    <div className="text-center">
    <Button variant="success" type="submit">
    Enregistrer
    </Button>
    </div>
  
</Form>
        </Col>
      </Row>
    </Container>
   
  );
}

export default App;
