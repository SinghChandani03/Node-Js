"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Modal from "react-modal";
import Projectcrud from "../add/projectcrud"; // Ensure this path is correct

const Displayproject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectId, setProjectId] = useState(null); // Added state for projectId

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/projectRoute/projects"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/projectRoute/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete project! Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this project data!",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: "green",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(projectId);
      }
    });
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setProjectId(project.id); // Set the projectId state
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProject(null);
    setProjectId(null); // Reset the projectId state
  };

  const handleUpdate = (updatedProject) => {
    const updatedProjects = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    handleCloseModal();
  };

  return (
    <div className="my-32 mx-auto max-w-8xl">
      {loading ? (
        <h4 className="text-center text-xl font-semibold">Loading...</h4>
      ) : projects && projects.length === 0 ? (
        <h4 className="text-center my-5 text-3xl font-semibold">
          No Projects Available
        </h4>
      ) : (
        <>
          <h4 className="my-4 text-3xl font-semibold text-center">
            List of Projects
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start md:ml-32 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-lg font-semibold mb-4">
                      ID: {project.pid}
                    </h6>
                    <p className="card-text mb-2 text-md font-semibold">
                      Title: {project.title}
                    </p>
                    <p className="card-text mb-2 text-sm">
                      Due date: {project.due_date}
                    </p>
                    <p className="card-text mb-2 text-sm">
                      Status: {project.status}
                    </p>
                    <p className="card-text mb-2 text-sm">
                      Description: {project.description}
                    </p>
                    <div className="flex justify-end mt-4">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="mx-2 text-red-600 cursor-pointer"
                        title="Delete"
                        onClick={() => confirmDelete(project.id)}
                      />
                      <FontAwesomeIcon
                        icon={faFilePen}
                        className="mx-2 text-green-700 cursor-pointer"
                        title="Edit"
                        onClick={() => handleEdit(project)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Modal
            isOpen={isUpdateModalOpen}
            onRequestClose={handleCloseModal}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            contentLabel="Edit Project Modal"
            ariaHideApp={false}
          >
            <div
              className="relative bg-white rounded-lg shadow sm:w-3/12 md:w-1/2
"
            >
              <Projectcrud
                initialValues={selectedProject}
                onUpdate={handleUpdate}
                onClose={handleCloseModal}
                id={projectId}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Displayproject;
