import './App.css';
import Admin from './MyComponent/Admin/Admin.js';
import Register from './MyComponent/Auth/register';
import Login from './MyComponent/Auth/Login';
import Home from './MyComponent/Customer/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home/>}>
          </Route>
          {/* <Route exact path="/customer" element={<Home />}>
          </Route> */}
          <Route exact path="/Admin" element={<Admin />}>
          </Route>
          <Route exact path="/register"  element={<Register />}>
          </Route>
          <Route exact path="/login"  element={<Login />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
