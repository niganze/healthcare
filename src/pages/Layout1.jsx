import Header from './Header';
import  Footer  from './Footer';
import { Outlet } from 'react-router-dom';

function Layout1() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>  
    </>
  )
}

export default Layout1
