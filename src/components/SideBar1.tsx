
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import CDBIcons from 'react-bootstrap-icons'


// import Navbar from 'cdbreact/dist/components/Navbar';
// import Nav from 'react-bootstrap/Nav'
const Sidebar = () => {
  return (
    <div style={{ width: '250px', height: '200vh', overflow: 'scroll initial'}}>  
      <CDBSidebar textColor="#fff" backgroundColor="#f573ca">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            ShredShare
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/skis" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="skiing">Skis</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createski" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="skiing">Add Ski</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/editski" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="skiing">Edit Ski</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/surf" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="snowboarding">Surfboards</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createsurf" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cart-plus">Add Surfboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Chat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Chat</CDBSidebarMenuItem>
            </NavLink>            
            <NavLink exact to="/login" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Login</CDBSidebarMenuItem>
            </NavLink>            
            <NavLink exact to="/register" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hamsa">Register</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            William Reeder
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;