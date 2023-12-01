import  { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import axios from 'axios';


const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
const [isLoading, setIsLoading] = useState(false)
  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert('Please select an image to upload');
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append('image', selectedFile);

    
    axios.post("https://api.imgbb.com/1/upload?key=87c8db3e6ce6cac1360cc630d3fa490f", formData)
      .then(res => {
        setImageUrl(res.data.data.display_url)
        console.log(res.data.data.display_url)
        setIsLoading(false)

      })
      .catch((error) => {
        console.log(error)
      })
    
    
  };

  return (
    <Form>
      <FormControl type="file" name="image" onChange={handleChange} />
      {imageUrl && (
        <div>
          <p>Image URL: {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </Form>
  );
};

export default ImageUpload;
