import { Route, Routes, Navigate } from "react-router-dom"
import './App.css'
import Home from "./Pages/Home"
import Wishlist from "./Pages/Wishlist"
import View from "./Pages/View"
import Cart from "./Pages/Cart"
import Footer from "./Components/Footer"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/view/:id" element={<View/>}/>
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
