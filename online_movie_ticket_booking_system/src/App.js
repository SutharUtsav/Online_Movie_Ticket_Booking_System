
import './App.css';
import Admin from './MyComponent/Admin/Admin.js';
import Header from './MyComponent/Header';
import Footer from './MyComponent/Footer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {
  
  return (
    <>
    <Header/>
    
   <Router>
      <Routes>
        <Route index element={<><Link to="/Admin"><p>Admin Page</p></Link></>}>
        </Route>
      <Route exact path="/admin" element={<Admin />}>
          
        </Route>
      </Routes>
    </Router>
    <Footer/>

    </>
    
  );
}

export default App;
