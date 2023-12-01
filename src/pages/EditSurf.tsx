
// import React, { useState, useEffect } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import ImageUpload from '../components/ImageUpload';

// // const [user, setUser] = useState(true)
// // console.log(user)

// type SurfType = {
//   id: number;
//   title: string;
//   description: string;
//   make: string;
//   model: string;
//   length: string;
//   imageUrl: string;
//   userId: number;
// };

// const EditSurf
// : React.FC = () => {
//   const { surfId } = useParams<{ surfId: string }>();
// //   const navigate = Navigate();

//   const [skiFormData, setSkiFormData] = useState<SurfType>({
//     id: 0,
//     title: '',
//     description: '',
//     make: '',
//     model: '',
//     length: '',
//     binding: '',
//     imageUrl: '',
//     dateCreated: '',
//     userId: 0,
//   });

//   useEffect(() => {
//     const fetchSki = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/api/editski/${surfId}`);

//         if (response.ok) {
//           const skiData = await response.json();
//           setSkiFormData(skiData);
//         } else {
//           console.error('Failed to fetch ski data');
//         }
//       } catch (error) {
//         console.error('Error fetching ski data:', error);
//       }
//     };

//     fetchSki();
//   }, [surfId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setSkiFormData({ ...skiFormData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (imageUrl: string): void => {
//     setSkiFormData({ ...skiFormData, imageUrl });
//   };

//   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/surf/edit/${surfId}`, {    //http://127.0.0.1:5000/api/skis/edit/${surfId}
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: skiFormData.title,
//           description: skiFormData.description,
//           make: skiFormData.make,
//           model: skiFormData.model,
//           length: skiFormData.length,
//           image_url: skiFormData.imageUrl,
//         }),
//       });

//       if (response.ok) {
//         console.log('Ski edited successfully');
//         // Navigate(skis); 
//       } else {
//         console.error('Failed to edit ski');
//       }
//     } catch (error) {
//       console.error('Error editing ski:', error);
//     }
//   };

//   return (
  
    
    
    
//     <div>
//       <h1>Edit Ski</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           value={skiFormData.title}
//           onChange={handleInputChange}
//         />
//         <Form.Label htmlFor='make'>Make</Form.Label>
//         <Form.Control value={skiFormData.make} name='make' onChange={handleInputChange} />

//         <Form.Label htmlFor='model'>Model</Form.Label>
//         <Form.Control value={skiFormData.model} name='model'  onChange={handleInputChange} />

//         <Form.Label htmlFor='length'>Length</Form.Label>
//         <Form.Control value={skiFormData.length} name='length' onChange={handleInputChange} />

//         <Form.Label htmlFor='description'>Description</Form.Label>
//         <Form.Control value={skiFormData.description} name='description'  onChange={handleInputChange} />


//         <Form.Label>Image</Form.Label>
//         <ImageUpload onUpload={handleImageUpload} />

//         <Button type="submit" variant="outline-primary" className="mt-3">
//           Save Changes
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default EditSurf
// ;