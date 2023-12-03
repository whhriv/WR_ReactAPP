
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  Card  from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react';
// import Navigation from '../components/Navigation';
import Sidebar from '../components/SideBar1';
import Body from '../components/Body';
import 'bootstrap/dist/css/bootstrap.min.css';  
import EditSki from './EditSki';
import DeleteSki from './DeleteSki';
import { useNavigate } from 'react-router-dom';


type SkiType = {
  id: number;
  title: string;
  description: string;
  make: string;
  model: string;
  length: string;
  binding: string;
  imageUrl: string;
  dateCreated: string;
  userId: number;
};

type SkiProps = {}
export default function Skis({}:SkiProps) {
  const [skis, setSkis] = useState<SkiType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/skis');
        
        if (response.ok) {
          const results = await response.json();
          console.log('API response:', results); 

            setSkis(results);
          
        } else {
          setError('Response not okay');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };


    fetchData();
  }, []);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }

  // }, []);
  
  // useEffect(() => {
  //   const handleDeleteSki = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:5000/api/deleteskis/${ski.id}`);

  //       if (response.ok) {
  //         const skiData = await response.json();
  //         setSkiFormData(skiData);
  //       } else {
  //         console.error('Failed to fetch ski data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching ski data:', error);
  //     }
  //   };

  //   handleDeleteSki();
  // }, []);

//   const handleDeleteSki = async (skiId:number|string) => {
//       const token = localStorage.getItem('token') 
   
//       // const token = localStorage.getItem('token') 
//       const response = await fetch(`http://127.0.0.1:5000/api/deleteskis/${skiId}`), {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
    
//     if (response.error){
//         console.log(response.error, 'danger')
//     } else {
//         console.log(response.data!, 'primary');
//         navigate('/')
//     }
// }
  
  const handleEditClick = (skiId: number) => {
    return navigate(`/editskis/${skiId}`); 
  }

  return (
    <Body sidebar>
    <Container >
    <Row md="4" className="align-items-start">
      
        {skis.map((ski) => (
          <Col md="4" key={ski.id}>
            <Card className="bg-transparent shadow-1-strong mt-4 flex">
              <Card.Img variant="top" src={ski.imageUrl} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{ski.title}</Card.Title>
                <Card.Text>{ski.description}</Card.Text>
                <Card.Text>Make: {ski.make}</Card.Text>
                <Card.Text>Model: {ski.model}</Card.Text>
                <Card.Text>Length: {ski.length}</Card.Text>
                <Card.Text>Bindings: {ski.binding}</Card.Text>
                <Button variant="primary">Reserve!</Button>
                <Button variant="outline-secondary" onClick={() => handleEditClick(ski.id)}>Edit</Button>
                <Button variant="outline-danger" onClick={() => handleDeleteSki(ski.id)}>Delete Ski</Button>

              </Card.Body>
            </Card>
          </Col>
        )
      )}
    </Row>
    </Container>
  </Body>
);
};


