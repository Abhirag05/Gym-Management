import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Admission from './pages/Admission'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import AdmissionForm from './components/AdmissionForm'
import RegistrationForm from './components/RegistrationForm'
import Registration from './pages/Registration'
import AdminPage from './pages/admindashboard/AdminPage'
import UserPage from './pages/userdashboard/UserPage'
import Dashboard from './pages/admindashboard/dashboard'
import Users from './pages/admindashboard/Users'
import AdmissionDetails from './pages/admindashboard/AdmissionDetails'
import { Add } from '@mui/icons-material'
import ContactDetails from './pages/admindashboard/ContactDetails'
import AddMembers from './pages/admindashboard/AddMembers'
import UserProfile from './pages/userdashboard/UserProfile'
import UserAdmission from './pages/userdashboard/UserAdmission'
import UserPlans from './pages/userdashboard/UserPlans'
import UserShedule from './pages/userdashboard/UserShedule'
import GymStore from './pages/userdashboard/GymStore'
import AddProduct from './pages/admindashboard/AddProduct'
import Products from './pages/admindashboard/Products'
import GymCart from './pages/userdashboard/GymCart'
import ProductDetails from './pages/userdashboard/ProductDetails'
import OrdersPage from './pages/userdashboard/OrdersPage'
import OrderDetails from './pages/admindashboard/OrderDetails'



function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/admission' element={<Admission/>}/>
        <Route path='/AdmissionForm' element={<AdmissionForm/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/sign' element={<SignIn/>}/>
        <Route path='/reg' element={<Registration/>}/>
     <Route path="/admin" element={<AdminPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="details" element={<AdmissionDetails />} />
        <Route path="members" element={<Users />} />
        <Route path="addmember" element={<AddMembers/>} />
        <Route path="contactadmin" element={<ContactDetails/>} />
        <Route path="addproduct" element={<AddProduct/>} />
        <Route path="prod" element={<Products/>} />
        <Route path="orderdetails" element={<OrderDetails/>} />
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='/user' element={<UserPage/>}>
        <Route path="profile" element={<UserProfile/>} />
        <Route path="useradmission" element={<UserAdmission/>} />
        <Route path="userplans" element={<UserPlans/>} />
        <Route path="usershedule" element={<UserShedule/>} />
        <Route path="gymstore" element={<GymStore/>} />
        <Route path="gymstore/:productId" element={<ProductDetails />} />
        <Route path="gymcart" element={<GymCart/>} />
        <Route path="orders" element={<OrdersPage/>} />
        <Route index element={<UserProfile />} />
      </Route>
    </Routes>
    
    </>
  )
}

export default App
