
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homedashboard from './dashboard/Homedashboard.jsx';
import Dashparenr from './dashboard/Dashparenr';
import Layout1 from './pages/Layout1.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Patients from './dashboard/Patients.jsx';
import Imiti from './dashboard/Imiti.jsx';
import MedicalPlantation from './dashboard/MedicalPlantation.jsx';
import Partners from './dashboard/Partners.jsx';
import Appointments from './dashboard/Appointments.jsx';
import DashService from './dashboard/DashService.jsx';

import Blog from './dashboard/Blog.jsx';
import Message from './dashboard/Message.jsx';
import Plant_medecine from './pages/Plant_medecine.jsx';
import Medecines from './pages/Medecines.jsx';
import SinglePlant_medecine from './pages/SinglePlant_medecine.jsx';
import SingleMedicine from './pages/SingleMedecine.jsx';
import Register from './pages/Register.jsx';
import All_user from './dashboard/All_user.jsx';
import DashMedecine from './dashboard/DashMedecine.jsx';

import Treedash from './dashboard/Treedash.jsx';
import SingleAppointment from './dashboard/SingleAppointment.jsx';
import Medicadisease from './dashboard/Medicadisease.jsx';
import Setting from './dashboard/Setting.jsx';
function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout1/>}> 
        <Route index element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/> 
        <Route path='/ser' element={<Services/>}/> 
        <Route path='/blog' element={<Testimonials/>}/> 
        <Route path='/contact' element={<Contact/>}/> 
        <Route path='/plantmedicine' element={<Plant_medecine/>}/> 
        <Route path='/medicines' element={<Medecines/>}/>
        <Route path='/farm/:id' element ={<SinglePlant_medecine/>}/>
        <Route path="/medicine/:id" element={<SingleMedicine/>} />
        <Route path="/singleappointment/:id" element={<SingleAppointment />} />
        <Route path= '/login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
       </Route>``

       

      <Route path='/' element={<Homedashboard/>}>
        {/* <Route index element= {<Dashparenr/>}/> */}
        <Route path="/dash1" element={<Dashparenr/>}/>
        <Route path='/imiti'element={<Imiti/>}/>
        <Route path='/patients'element={<Patients/>}/>
        <Route path='/medical-plantation' element={<MedicalPlantation/>}/>
        <Route path='/partners'element={<Partners/>}/>
        <Route path='/appointments'element={<Appointments/>}/>
        <Route path='/Services'element={<DashService/>}/>
        <Route path='/tree'element={<Treedash/>}/>
        <Route path='/Medicadisease'element={<Medicadisease/>}/>
        <Route path='/testimony'element={<Blog/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='setting' element={<Setting/>}/>
        <Route path='/alluser' element={<All_user/>}/>
        <Route path="/medicinee/:id" element={<DashMedecine/>} />
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

