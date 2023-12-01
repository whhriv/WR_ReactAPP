import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';



export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  // const [user, setUser] = setState()
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const username = usernameField.current?.value;
    const password = passwordField.current?.value;

    if (!username) {
      errors.username = 'Username must not be empty.';
    }
    if (!password) {
      errors.password = 'Password must not be empty.';
    }

    return errors;
  };

  useEffect(() => {
    usernameField.current?.focus();
  }, []);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const username = usernameField.current?.value;
        const password = passwordField.current?.value;

        console.log('Sending request with username:', username, 'and password:', password);

        const tokenResponse = await fetch('http://127.0.0.1:5000/api/token', {
          method: 'GET', //GET request for token with username/password
          headers: {
            'Authorization': 'Basic '+ btoa(username+':'+password),
          },
          // body: JSON.stringify({ username, password }),
        });

        if (tokenResponse.ok) {
         const data = await tokenResponse.json()
         const token = data.token
         console.log(token)
         localStorage.setItem('token',token)
         console.log(token)
          
         
         const response = await fetch('http://127.0.0.1:5000/api/users/me', {
            method: 'POST', //GET request for token with username/password
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            // body: JSON.stringify({ username, password }),
          });
  
          console.log('Received response:', response);
          // const userResponse = await response.json()
          // const userData = userResponse.data
          // setUser(userData)
          // localStorage.setItem('user', response.data)
          // console.log(response.data)


          if (response.ok) {
            // navigate('/skis');
            const responseBody = await response.json();
            // const userData = responseBody.data.id
            // setUser(userData)
            const userNum = JSON.stringify(responseBody.id)
            console.log(userNum)
            localStorage.setItem('user', userNum)
            // console.log(userData)
            console.log('Login successful!!! YAY', responseBody);
            console.log(responseBody.id) //WORKS
            // console.log('here is userData', userData) //undefined
          } else {
            const responseBodyText = await response.text();
            console.error('Login failed: response text', responseBodyText.message);
            alert('login failed - check credentials')
           } }
        } catch (error) {
          console.error('Error during login:', error);
        }
      }
        

  };

  return (
    <Body sidebar>
     
      <h1 className="text-center">Login</h1>
      <Container>
        <Card className='bg-transparent m-3'>
          <Card.Body>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username"
          label="Username or email address"
          error={formErrors.username}
          fieldRef={usernameField}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          error={formErrors.password}
          fieldRef={passwordField}
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
        </Form>
        </Card.Body>
        </Card>
        </Container>
     
    </Body>
  );
}



