"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { project_validation } from "@/utils/validation/validation";
import { useDispatch } from "react-redux";
import { ADD_PROJECT,UPDATE_PROJECT } from "@/redux/slice/projectslice";

const Projectcrud = ({ onClose, onUpdate, initialValues, id }) => {
  const [credentials, setCredentials] = useState({
    pid: "",
    title: "",
    due_date: "",
    status: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    pid: "",
    title: "",
    due_date: "",
    status: "",
    description: "",
  });

  // const dispatch = useDispatch();
  const [isAddMode, setIsAddMode] = useState(true);

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setIsAddMode(false);
      setCredentials(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors in the form
    const formErrors = {};
    for (const field in credentials) {
      formErrors[field] = project_validation(field, credentials[field]);
    }
    setErrors(formErrors);

    // If there are errors, prevent form submission
    if (Object.values(formErrors).some((error) => error !== "")) {
      return;
    }

    try {
      if (isAddMode) {
        // Add new project
        const response = await fetch(
          "http://localhost:5000/api/projectRoute/addproject/",
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
          throw new Error(data.error || "Server returned an error.");
        }
        // dispatch(ADD_PROJECT(data));

        Swal.fire("Success!", "Project added successfully.", "success");

        // Reset form fields after successful addition
        setCredentials({
          pid: "",
          title: "",
          due_date: "",
          status: "",
          description: "",
        });
      } else {
        // Update existing project
        if (!id) {
          throw new Error("Project ID is missing.");
        }

        const response = await fetch(
          `http://localhost:5000/api/projectRoute/projects/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Server returned an error.");
        }

        // dispatch(UPDATE_PROJECT(data));
        Swal.fire("Success!", "Project updated successfully.", "success");
      }

      // Notify parent component of update if needed
      if (onUpdate) {
        onUpdate(credentials);
      }
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire("Error!", "Failed to save project. Please try again.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = name === "pid" ? String(value) : value;

    // Update the state with the new value
    setCredentials((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));

    // Reset error message when user starts typing
    setErrors((prevState) => ({
      ...prevState,
      [name]: project_validation(name, parsedValue),
    }));
  };

  return (
    <div className={isAddMode ? "my-32 " : "my-6"}>
      <h1 className="my-4 text-center text-2xl font-semibold">
        {isAddMode ? "Add Project" : "Update Project"}
      </h1>
      <form
        className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mb-5">
            <label
              htmlFor="pid"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project ID
            </label>
            <input
              type="text"
              id="pid"
              name="pid"
              value={credentials.pid}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Project ID"
            />
            {errors.pid && (
              <div className="text-red-600 text-sm mt-1">{errors.pid}</div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={credentials.title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Title"
            />
            {errors.title && (
              <div className="text-red-600 text-sm mt-1">{errors.title}</div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="due_date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={credentials.due_date}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            {errors.due_date && (
              <div className="text-red-600 text-sm mt-1">{errors.due_date}</div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={credentials.status}
              onChange={handleChange}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Complete">Complete</option>
              <option value="Running">Running</option>
              <option value="Pending">Pending</option>
              <option value="Other">Other</option>
            </select>
            {errors.status && (
              <div className="text-red-600 text-sm mt-1">{errors.status}</div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              rows={5}
              cols={20}
              id="description"
              name="description"
              value={credentials.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="text-red-600 text-sm mt-1">
                {errors.description}
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse justify-between items-center">
          <button
            type="submit"
            className="text-white bg-teal-700 hover:bg-teal-600 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
          >
            {isAddMode ? "Add" : "Update"}
          </button>

          {!isAddMode && (
            <button
              type="button"
              onClick={onClose}
              className="text-white bg-gray-500 hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Projectcrud;
