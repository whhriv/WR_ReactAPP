import  { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const DeleteSki: React.FC = () => {
  const { skiId } = useParams<{ skiId: string }>();


  const handleDelete = async (): Promise<void> => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/deleteskis/${skiId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Ski deleted!!!!');
        Navigate('/skis'); 
      } else {
        console.error('Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
          <Button variant="danger" onClick={handleDelete}>DELETE</Button>
   
  );
};

export default DeleteSki;
