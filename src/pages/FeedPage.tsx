import Body from '../components/Body';
import AllSkis from '../views/AllSkis';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { TypeAnimation } from 'react-type-animation';



const conStyle = {
 
  opacity: 0.4,
}

export default function FeedPage() {
  return (
    <Body sidebar>
      <Container style={conStyle} className="ms-1 mt-5">
      <TypeAnimation 
      sequence={[
        'Find Variety....',
        1000,
        'Boutique brands and rare models...',
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
      style={{ color: '#ae07e6',fontSize: '3em', display: 'inline-block' }}
      repeat={Infinity}
    />
      <Card style={conStyle} className="m-2">

      <Card.Img src={'https://i.ibb.co/H47qCxs/IMG-2103.jpg'}>
  
      </Card.Img>
      </Card>
      </Container>

    </Body>
  );
}