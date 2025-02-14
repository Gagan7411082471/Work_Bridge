import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase/setup";

// Lazy-loaded components
const Signin = React.lazy(() => import("./components/Signin"));
const Main = React.lazy(() => import("./components/Main"));
const Connection = React.lazy(() => import("./components/Connection"));
const Invitation = React.lazy(() => import("./components/Invitation"));
const Network = React.lazy(() => import("./components/Network"));
const Message = React.lazy(() => import("./components/Message"));
const About = React.lazy(() => import("./components/About"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Main />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/connect"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Connection />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/invite"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Invitation />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/network"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Network />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Message />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
