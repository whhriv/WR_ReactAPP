
import  Card  from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Sidebar from '../components/SideBar1';
import Body from '../components/Body';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'


type SurfType = {
  id: number;
  title: string;
  description: string;
  make: string;
  model: string;
  length: string;
  imageUrl: string,
  dateCreated: string;
  userId: number;
};

type SurfProps = {}
export default function Surf({}:SurfProps) {
  const [surf, setSurf] = useState<SurfType[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/surf');
        
        if (response.ok) {
          const results = await response.json();
          console.log('API response:', results); 

            setSurf(results);
          
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
  return (
    <>
    <Body sidebar>
     {error ? (
        <div>Error: {error}</div>
      ) : (
      <div>
        
        {surf && surf.map((surf) => (
          <Container>
          <Card className="bg-transparent shadow-1-strong mt-4 ms-4 flex" key={surf.id}>
            <Row>
            <Col>
            <Card.Body>
            <Card.Title>{surf.title}</Card.Title>
                
                <Card.Text>Make: {surf.make}</Card.Text>
                <Card.Text>Model: {surf.model}</Card.Text>
                <Card.Text>Length: {surf.length}</Card.Text>
                <Card.Text>userID: {surf.userId}</Card.Text>
                <Card.Text>Description: <p>{surf.description}</p></Card.Text>
                <Button variant="outline-danger" onClick={() => handleEditClick(ski.id)}>Edit</Button>
                <Button variant="outline-danger" onClick={() => handleDeleteSki(ski.id)}>Delete Ski</Button>
            </Card.Body></Col>
            <Col md="4">
        {/* Assuming surf.imageUrl is the URL of the image */}
        <Card.Img src={surf.imageUrl} alt="Surf Image" />
        </Col>
            </Row>
          </Card>
          </Container>
       ))}
       </div>
     )}
     </Body>
   </>
 );
}