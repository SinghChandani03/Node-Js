"use client";
import { login_validation } from "@/utils/validation/validation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [credentials, setCredentials] = useState({ email: " ", password: " " });
  const [errors, setErrors] = useState({ email: " ", password: " " });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors in the form
    const formErrors = {};
    for (const field in credentials) {
      formErrors[field] = login_validation(field, credentials[field]);
    }
    setErrors(formErrors);

    // If there are errors, prevent form submission
    if (Object.values(formErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/loginRoute/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server returned an error.");
      }

      console.log("Login successful!", data);
    } catch (error) {
      console.error("Login error:", error.message); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the state with the new value
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Reset error message when user starts typing
    setErrors((prevState) => ({
      ...prevState,
      [name]: login_validation(name, value),
    }));
  };

  return (
    <div className="my-40 w-full max-w-sm sm:max-w-lg p-4 bg-white border border-gray-200 rounded-lg sm:m-xl mx-auto">
      <h1 className="my-2 text-center text-3xl font-semibold">Login</h1>
      <form className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="xxxxxx@gmail.com"
            onChange={handleChange}
          />
          {errors.email && (
            <div  className="text-red-600 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-0 h-full flex items-center px-3 text-gray-600 dark:text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <div className="text-red-600 text-sm mt-1">{errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-teal-700 hover:bg-teal-600 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center">
        <p className="text-sm text-gray-600 mr-1">Don't have an account?</p>
        <a href="/signup" className="text-teal-700 hover:text-teal-600 font-semibold">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;
