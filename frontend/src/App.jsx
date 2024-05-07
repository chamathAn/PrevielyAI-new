import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Apply from "./Pages/Apply.jsx";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Dashboad from "./admin/Dashboad.jsx";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
import { useUser } from "@clerk/clerk-react";
import AdmiProtectedRoute from "./admin/utils/AdmiProtectedRoute.jsx";
import PostJob from "./admin/PostJob.jsx";
import AdminJobApplication from "./admin/AdminJobApplication.jsx";
import AdminJobPage from "./admin/AdminJobPage.jsx";
import axios from "axios";
import Navbar from "./Components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { ThreeDots } from 'react-loader-spinner'
function App() {
 
  const { isLoaded } = useUser();
  axios.defaults.baseURL = BACKEND_BASE_URL;
  axios.defaults.withCredentials = true;


  if (!isLoaded) {
    return <div className="h-screen bg-[#080c14] flex justify-center items-center">
        <ThreeDots
            height={80}
            width={80}
            color="#2563EB"
            radius={9}
            ariaLabel="three-dots-loading"
          />
    </div>;
  }

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply/job/:id" element={<ApplyWrapper />} />
        <Route
          path="/admin"
          element={
            <>
              <SignedIn>
                <AdmiProtectedRoute>
                  <Dashboad />
                </AdmiProtectedRoute>
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/job/create"
          element={
            <>
              <SignedIn>
                <AdmiProtectedRoute>
                  <PostJob />
                </AdmiProtectedRoute>
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/job/:id"
          element={
            <>
              <SignedIn>
                <AdmiProtectedRoute>
                  <AdminJobPage />
                </AdmiProtectedRoute>
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/job/:id/application/:applicationId"
          element={
            <>
              <SignedIn>
                <AdmiProtectedRoute>
                  <AdminJobApplication />
                </AdmiProtectedRoute>
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

function ApplyWrapper() {
  return (
    <>
      <SignedIn>
        <Apply />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;
