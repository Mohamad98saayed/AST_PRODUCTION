/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Metadata from "./components/Metadata";

import _404 from "./pages/_404";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import OneCar from "./pages/OneCar";
import CreateCar from "./pages/CreateCar";
import UpdateCar from "./pages/UpdateCar";

import { getCurrentUserAsync } from "./state/features/user/userSlice";
import { useAppDispatch } from "./utils/reduxHooks";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Metadata title="Home Page" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/cars/:id" element={<OneCar />} />
        <Route path="/cars/new" element={<CreateCar />} />
        <Route path="/cars/update/:id" element={<UpdateCar />} />

        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
