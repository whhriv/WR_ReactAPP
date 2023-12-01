import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Body from '../components/Body';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';
import ImageUpload from '../components/ImageUpload';
import Container from 'react-bootstrap/Container';




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

type SkiProps = {
  currentUser: UserType|null
};



const CreateSki: React.FC<SkiProps<currentUser>> = () => {
  const [skis, setSkis] = useState<SkiType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType[]>([])
  const [skiFormData, setSkiFormData] = useState<Partial<SkiType>>(
    {
        title: '',
        description: '',
        make: '',
        model: '',
        length: '',
        binding: '',
        imageUrl: ''
    }
)

const userData = localStorage.getItem('user')
console.log('USER DATA SHOULD BE HERE',userData)

// let imgURL =  skiFormData.imageUrl?.toString()


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSkiFormData({...skiFormData, [e.target.name]: e.target.value})
}

  const createSki = async () => {
    const userData = localStorage.getItem('user')
    console.log('UserData inside createSki',userData)

    try {
      const userData = localStorage.getItem('user')
      console.log('inside TRY',userData)

      const token = localStorage.getItem('token')
      console.log('HERE IS THE TOKEN', token)
      const userResponse = await fetch('http://127.0.0.1:5000/api/users/me', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },

      });
      console.log(userResponse, 'USER RESPONSE')
      if (userResponse.ok) {
        const responseBody = await userResponse.json();
        const userData = responseBody.data.id
        console.log(userData)
      }
      // const imgURL = skiFormData.imageUrl?.toString().trim()
 



      console.log(skiFormData.userId)
      console.log('checking', token)
      
      const response = await fetch('http://127.0.0.1:5000/api/createskis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: skiFormData.title,
          description: skiFormData.description,
          make: skiFormData.make,
          model: skiFormData.model,
          length: skiFormData.length,
          binding: skiFormData.binding,
          image_url: imgURL,
          user_id: userData,
        
        }),
        
      });
    
      if (response.ok) {
        // If successful, refresh the list of skis
        console.log('ski created from here in createSki fetch')
        // createSki()
      } else {
        setError('Failed to create a new ski');
      }
    } catch (error) {
      console.error('Error creating a new ski:', error);
      setError('Error creating a new ski');
    }
  };

  return (

 <>
        <Body sidebar>
            <h1 className="text-center">Create a new Ski</h1>
            <Container>
            <Card className='bg-transparent m-3'>
                <Card.Body>
                    <Form onSubmit={createSki}>
                        <Form.Label htmlFor='title'>Title</Form.Label>
                        <Form.Control value={skiFormData.title} name='title' onChange={handleInputChange} />

                        <Form.Label htmlFor='make'>Make</Form.Label>
                        <Form.Control value={skiFormData.make} name='make' onChange={handleInputChange} />

                        <Form.Label htmlFor='model'>Model</Form.Label>
                        <Form.Control value={skiFormData.model} name='model'  onChange={handleInputChange} />

                        <Form.Label htmlFor='length'>Length</Form.Label>
                        <Form.Control value={skiFormData.length} name='length' onChange={handleInputChange} />

                        <Form.Label htmlFor='binding'>Binding</Form.Label>
                        <Form.Control value={skiFormData.binding} name='binding'  onChange={handleInputChange} />

                        <Form.Label htmlFor='description'>Description</Form.Label>
                        <Form.Control value={skiFormData.description} name='description'  onChange={handleInputChange} />

                        {/* <Form.Label htmlFor='image'>Image</Form.Label> */}
                        <ImageUpload onUpload={(imageUrl) => setSkiFormData({...skiFormData, imageUrl})} />

                        

                        <Button type='submit' variant='outline-success' className='w-100 mt-3'>Add Ski</Button>
                        
                    </Form>
                    
                    
                </Card.Body>
            </Card>
            </Container>
            </Body>
        </>
  );
};

export default CreateSki