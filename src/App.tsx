import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Sidebar from './components/SideBar1';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import Skis from './pages/skis'
import Surf from './pages/surf'
import Register from './pages/Register';
import ApiProvider from './contexts/ApiProvider';
import AlertMessage from './components/AlertMessage'
import CategoryType from './types/category';
import UserType from './types/auth';
import CreateSki from './pages/CreateSki';
import CreateSurf from './pages/CreateSurf';
import EditSki from './pages/EditSki';
import DeleteSki from './pages/DeleteSki';
import { getMe } from './lib/APIWrapper';
import  Chat  from './components/Chat'


export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
//   const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);


//   useEffect(() => {
//   if (isLoggedIn){
//     getMe(localStorage.getItem('token') as string)
//         .then(response => {
//             if (response.data){
//                 setLoggedInUser(response.data)
//             }
//         })
//         .catch(err => console.error(err))
// }
// }, [isLoggedIn])

// useEffect(() => {
// if (isLoggedIn){
//     const now = new Date()
//     const exp = new Date(localStorage.getItem('tokenExp') || '');
//     if (new Date(now.setMinutes(now.getMinutes() + 5)) > exp){
//         flashMessage('You will be logged out in less than 5 minutes', 'danger');
//     }
//     if (new Date() > new Date(exp)){
//         logUserOut();
//     }
// }
// })

// const [message, setMessage] = useState<string|null>(null);
// const [category, setCategory] = useState<CategoryType|null>(null);

// const logUserIn = (user:UserType):void => {
// setIsLoggedIn(true);
// setLoggedInUser(user);
// flashMessage(`${user.username} has logged in`, 'success');
// }

// const logUserOut = (): void => {
// setIsLoggedIn(false);
// setLoggedInUser(null);
// localStorage.removeItem('token');
// localStorage.removeItem('tokenExp');
// flashMessage('You have logged out', 'info');
// }

// const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
// setMessage(newMessage);
// setCategory(newCategory);
// }


  
return (
  
   <Container fluid className="App bg-info shadow-1-strong">
      <BrowserRouter>
      <ApiProvider>
       
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/skis" element={<Skis />} />
          <Route path="/createski" element={<CreateSki />} />
          <Route path="/editeski" element={<EditSki />} />
          <Route path="/Deleteski" element={<DeleteSki />} />
          <Route path="/surf" element={<Surf />} />
          <Route path="/createsurf" element={<CreateSurf />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </ApiProvider>
      </BrowserRouter>
    </Container>
  );
}

{/* <Route path="/chat" element={<Chat />} /> */}
