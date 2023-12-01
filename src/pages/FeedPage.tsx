import Body from '../components/Body';
import AllSkis from '../views/AllSkis';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function FeedPage() {
  return (
    <Body sidebar>
      <Container className="ms-2">
      <h1>Explore</h1>
      <Card>
      <Card.Img src={'https://i.ibb.co/nwXJrGL/start.jpg'}></Card.Img>
      </Card>
      </Container>

    </Body>
  );
}