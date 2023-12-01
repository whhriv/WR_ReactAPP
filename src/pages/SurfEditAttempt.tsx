import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getSurfById, editSurfById, deleteSurfById } from '../lib/EditApiHelper';
import CategoryType from '../types/category';
import SurfType from '../types/surf';
import UserType from '../types/auth';
import axios from 'axios'

type EditSurfProps = {
    // console.log: (message:string, category: CategoryType) => void,
    currentUser: UserType|null,
}

export default function EditSurf({  currentUser }: EditSurfProps) {
    const { surfId } = useParams();
    const navigate = useNavigate();

    const [SurfToEdit, setSurfToEdit] = useState<SurfType|null>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        async function getSurf(){
            let response = await getSurfById(surfId!);  //getSurfById fetch
            if (response.error){
                console.log(response.error, 'danger');
                navigate('/');
            } else {
                setSurfToEdit(response.data!);
            }
        }
        getSurf();
    }, [ navigate, surfId])

    /////////////////////////
    // async function getPostById(postId:string): Promise<APIResponse<PostType>> {
    //     let error;
    //     let data;
    //     try{
    //         const response = await apiClientNoAuth().get(postEndpoint + '/' + postId);
    //         data = response.data;
    //     } catch(err){
    //         if (axios.isAxiosError(err)){
    //             error = err.response?.data.error
    //         } else {
    //             error = 'Something went wrong';
    //         }
    //     }
    //     return {error, data}
    // }
    ////////////////////////////

    useEffect(() => {
        if (SurfToEdit){
            if (SurfToEdit.id !== currentUser?.id){
                console.log('You do not have permission to edit this Surf. Who do you think you are?!', 'danger');
                navigate('/')
            }
        }
    })

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSurfToEdit({...SurfToEdit, [e.target.name]: e.target.value} as SurfType)
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Something is happening')
        const token = localStorage.getItem('token') || ''
        const response = await editSurfById(token, surfId!, SurfToEdit!); //editSurfById
        if (response.error){
            console.log(response.error, 'danger')
        } else {
            console.log(`${response.data?.title} has been updated`, 'success')
            navigate('/')
        }
    }
////////////////////////////
    // async function editSurfById(token:string, surfId:string|number, editedSurfData:SurfType): Promise<APIResponse<SurfType>>{
    //     let error;
    //     let data;
    //     try {
    //         const response = await apiClientTokenAuth(token).put(SurfEndpoint + '/' + surfId, editedSurfData);
    //         data = response.data
    //     } catch(err){
    //         if (axios.isAxiosError(err)){
    //             error = err.response?.data.error
    //         } else {
    //             error = 'Something went wrong';
    //         }
    //     }
    //     return {error, data}
    // }
//////////////////////////////
    const handleDeleteSurf = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteSurfById(token, surfId!);  //deleteSurfById
        if (response.error){
            console.log(response.error, 'danger')
        } else {
            console.log(response.data!, 'primary');
            navigate('/')
        }
    }

    /////////////////////////
    // async function deleteSurfById(token:string, SurfId:string|number): Promise<APIResponse<string>>{
    //     let error;
    //     let data;
    //     try {
    //         const response = await apiClientTokenAuth(token).delete(SurfEndpoint + '/' + SurfId);
    //         data = response.data.success
    //     } catch(err){
    //         if (axios.isAxiosError(err)){
    //             error = err.response?.data.error
    //         } else {
    //             error = 'Something went wrong';
    //         }
    //     }
    //     return {error, data}
        ///////////////////////////
    
    return (
        <>
            <h1 className="text-center">Edit {SurfToEdit?.title}</h1>
            {SurfToEdit && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Edit Surf Title</Form.Label>
                            <Form.Control name='title' value={SurfToEdit?.title} onChange={handleInputChange} />
                            <Form.Label>Edit Surf Body</Form.Label>
                            <Form.Control name='body' as='textarea' value={SurfToEdit?.body} onChange={handleInputChange} />
                            <Button variant='success' className='mt-3 w-50' type='submit'>Edit Surf</Button>
                            <Button variant='danger' className='mt-3 w-50' onClick={openModal}>Delete Surf</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {SurfToEdit?.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {SurfToEdit?.title}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="danger" onClick={handleDeleteSurf}>Delete Surf</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}