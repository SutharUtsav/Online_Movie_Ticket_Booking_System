
import './App.css';
import Admin from './MyComponent/Admin/Admin.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {
  
  return (
    <Router>
      <Routes>
        <Route index element={<><Link to="/Admin"><p>Admin Page</p></Link></>}>
        </Route>
        <Route exact path="/admin" element={<Admin />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
