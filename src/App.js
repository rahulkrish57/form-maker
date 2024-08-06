import React, { Suspense, lazy } from "react";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
const Form = lazy(() => import("./pages/Form"));
export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} /> */}
          <Route path="/form/:formId" element={<Form />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}
