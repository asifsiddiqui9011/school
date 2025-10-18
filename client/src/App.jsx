
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Add from './pages/AddSchool/AddSchool' 
import { Routes} from 'react-router-dom' 
import { Route } from 'react-router-dom'
import SchoolList from './pages/SchoolList/SchoolList'
import Home from './pages/Home/Home'

function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route
        path = '/'
        element={<Home/>}/>
        <Route 
        path = '/Add'
        element ={<Add/>}/> 
        <Route
        path='/View' 
        element={<SchoolList/>}/>
      </Routes>
    </>
  )
}

export default App
