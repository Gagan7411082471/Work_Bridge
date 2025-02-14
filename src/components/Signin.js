import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { auth, database, googleProvider } from "../firebase/setup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo3 from "../images/RC.png";
import logo2 from "../images/logo2.png";


function Signin() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUpWithEmail = async () => {
    if (!username || !email || !password) {
      toast.warning("Please fill in all required fields.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = doc(database, "Users", user.uid);
      await setDoc(userDoc, {
        username: username.trim(),
        email: user.email,
        profile_image: "profile.png",
      });
      toast.success("Account created successfully!");
      navigate("/main"); // Navigate to main page after signup
    } catch (err) {
      toast.error(err.message || "Failed to create account.");
    }
  };

  const handleSignInWithEmail = async () => {
    if (!email || !password) {
      toast.warning("Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
      navigate("/main"); // Navigate to main page after signin
    } catch (err) {
      toast.error(err.message || "Failed to sign in.");
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userDoc = doc(database, "Users", user.uid);
      await setDoc(
        userDoc,
        {
          username: user.displayName || "No Username",
          email: user.email,
          profile_image: user.photoURL,
        },
        { merge: true }
      );
      toast.success("Signed in with Google successfully!");
      navigate("/main"); // Navigate to main page after Google signin
    } catch (err) {
      toast.error(err.message || "Failed to sign in with Google.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warning("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error(err.message || "Failed to send password reset email.");
    }
  };

  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?technology,teamwork')",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer autoClose={3000} position="top-right" />
      <Paper
        style={{
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={logo3}
            alt="Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <img
            src={logo2}
            alt="Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
        </Box>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}
        >
          {isSigningUp ? "Sign Up" : "Sign In"}
        </Typography>
        {isSigningUp && (
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "15px" }}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "15px" }}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "15px" }}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        {isSigningUp ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: "15px" }}
            onClick={handleSignUpWithEmail}
          >
            Sign Up
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: "15px" }}
            onClick={handleSignInWithEmail}
          >
            Sign In
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          style={{ marginBottom: "15px" }}
          onClick={handleSignInWithGoogle}
        >
          {isSigningUp ? "Sign Up with Google" : "Sign In with Google"}
        </Button>
        {!isSigningUp && (
          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Button>
        )}
        <Typography
          variant="body2"
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "gray",
          }}
        >
          {isSigningUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => setIsSigningUp(!isSigningUp)}
          >
            {isSigningUp ? "Sign In" : "Sign Up"}
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signin;
