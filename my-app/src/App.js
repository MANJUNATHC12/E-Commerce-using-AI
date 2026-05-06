import './App.css';
// import Eventcard from './Components/eventcard';
// import Practice from './demo/practice';
import Navbar from './Components/navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shoes from './pages/Shoes';
import SummerWear from './pages/SummerWear';
import WinterWear from './pages/WinterWear';
import SportWear from './pages/SportWear';
import TraditionalWear from './pages/TraditionalWear';
import Cart from './pages/Cart';
import Men from './pages/Men';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/men" element={<Men />} />
          <Route path="/men/shoes" element={<Shoes />} />
          <Route path="/men/summer-wear" element={<SummerWear />} />
          <Route path="/men/winter-wear" element={<WinterWear />} />
          <Route path="/men/sport-wear" element={<SportWear />} />
          <Route path="/men/traditional" element={<TraditionalWear />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
