// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";

// function Login() {
//   const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

//   const navigateTo = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "https://blog-app-yt-pl9n.onrender.com/api/users/login",
//         { email, password, role },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(data);
//       // Store the token in localStorage
//       localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
//       toast.success(data.message || "User Logined successfully", {
//         duration: 3000,
//       });
//       setProfile(data);
//       setIsAuthenticated(true);
//       setEmail("");
//       setPassword("");
//       setRole("");
//       navigateTo("/");
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error.response.data.message || "Please fill the required fields",
//         {
//           duration: 3000,
//         }
//       );
//     }
//   };

//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
//           <form onSubmit={handleLogin}>
//             <div className="font-semibold text-xl items-center text-center">
//               Cilli<span className="text-blue-500">Blog</span>
//             </div>
//             <h1 className="text-xl font-semibold mb-6">Login</h1>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full p-2 mb-4 border rounded-md"
//             >
//               <option value="">Select Role</option>
//               <option value="user">user</option>
//               <option value="admin">admin</option>
//             </select>

//             <div className="mb-4">
//               <input
//                 type="email"
//                 placeholder="Your Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2  border rounded-md"
//               />
//             </div>

//             <div className="mb-4">
//               <input
//                 type="password"
//                 placeholder="Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2  border rounded-md"
//               />
//             </div>

//             <p className="text-center mb-4">
//               New User?{" "}
//               <Link to={"/register"} className="text-blue-600">
//                 Register Now
//               </Link>
//             </p>
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-app-yt-pl9n.onrender.com/api/users/login",
        { email, password, role },
        { withCredentials: true }
      );

      login(data.user, data.token);
      toast.success(data.message || "Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error?.response?.data?.message || "Login failed. Try again.",
        { duration: 3000 }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-6 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          New User? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
