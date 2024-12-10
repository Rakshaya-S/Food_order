import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Items from './components/Items';
import Cart from './pages/Cart';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cartItem, setCartItem] = useState([])
  return (
    <div className='App'>
      <Router>
      <ToastContainer  theme='light' position="top-center"/>
        <Header cartItem={cartItem} />
        <main>
          <Routes>
            <Route path='/' element={<Items cartItem={cartItem} setCartItem={setCartItem} />} />
            <Route path='/search' element={<Items cartItem={cartItem} setCartItem={setCartItem} />} />
            <Route path='/cart' element={<Cart cartItem={cartItem} setCartItem={setCartItem} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
