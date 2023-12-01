import Body from '../components/Body';
import AllSkis from '../views/AllSkis';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        
        'We produce food for Mice',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

const conStyle = {
 
  opacity: 0.4,
}

export default function FeedPage() {
  return (
    <Body sidebar>
      <Container style={conStyle} className="ms-2 mt-5">
      <TypeAnimation 
      sequence={[
        'Find Variety....',
        1000,
        'Hard to find brands and models',
        1000,
        'Been wanting to try that board?',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Want to make money from your "investments"?',
        1000,
        'We produce food for Guinea Pigs',
        1000,

      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
      <Card style={conStyle} className="m-5">
      <Card.Img src={'https://i.ibb.co/H47qCxs/IMG-2103.jpg'}></Card.Img>
      </Card>
      </Container>

    </Body>
  );
}