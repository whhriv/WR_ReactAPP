import Body from '../components/Body';
import AllSkis from '../views/AllSkis';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const conStyle = {
 
  opacity: 0.4,
}

export default function FeedPage() {
  return (
    <Body sidebar>
      <Container style={conStyle} className="ms-2 mt-5">
      <h1>Explore</h1>
      <Card style={conStyle} className="m-5">
      <Card.Img src={'https://i.ibb.co/H47qCxs/IMG-2103.jpg'}></Card.Img>
      </Card>
      </Container>

    </Body>
  );
}