import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faX,
  faPlus,
  faUser,
  faEnvelope,
  faPhone,
  faGraduationCap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import SidebarAdmin from "./SidebarAdmin";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { wait } from "@testing-library/user-event/dist/utils";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Professor = () => {
  const [Professors, setProfessors] = useState([]);
  const [selectedgroups, setSelectedgroups] = useState([]);
  const [Professor, setProfessor] = useState({
    id: "",
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    grade: "",
    group: [],
  });
  const [groups, setgroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [id, setId] = useState(null);
  const url = "http://localhost:8080/api/v1/professors";

  const fetchProfessor = async () => {
    setLoading(true);
    try {
      const rep = await axios.get(url);
      setProfessors(rep.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchfetchgroup = async () => {
    const rep = await axios.get("http://localhost:8080/api/v1/groupes");
    setgroups(rep.data);
  };

  useEffect(() => {
    fetchfetchgroup();
    fetchProfessor();
  }, []);

  const handleProfessor = (e) => {
    setProfessor({ ...Professor, [e.target.name]: e.target.value });
    console.log(Professors);
  };

  const handlehandlegroupChange = (e) => {
    const groupid = e.target.value;
    if (e.target.checked) {
      setSelectedgroups((prevgroups) => [...prevgroups, groupid]);
    } else {
      setSelectedgroups((prevgroups) =>
        prevgroups.filter((group) => group !== groupid)
      );
    }
  };

  useEffect(() => {
    addProfessorgroups();
  }, [selectedgroups]);

  const handleUpdate = async (id) => {
    const rep = await axios.get(`${url}/${id}`);
    setProfessor(rep.data);
    setUpdateMode(true);
    setSelectedgroups([]);
  };

  // const handlehandlegroupUpdate = () =>{
  //   Professor.groups.forEach((group) => {
  //     setSelectedgroups((prevgroups) => [...prevgroups, group.id]);
  //   })
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //   checkboxes.forEach((checkbox) => {
  //     if(selectedgroups.includes(checkbox.id))
  //     checkbox.checked = true;
  //   });

  // }

  const addProfessorgroups = () => {
    const groupArray = selectedgroups.map((group) => ({
      id: group,
      code: "",
      year: "",
    }));
    setProfessor({
      ...Professor,
      group: groupArray,
    });
  };

  const reset = () => {
    setProfessor({
      id: "",
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      grade: "",
      group: [],
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedgroups([]);
  };

  const addProfessor = async () => {
    const ProfessorData = {
      firstName: Professor.firstName,
      lastName: Professor.lastName,
      login: Professor.login,
      password: Professor.password,
      grade: Professor.grade,
      group: Professor.group.map((group) => ({
        id: group.id,
        code: group.code,
        year: group.year,
      })),
    };

    try {
      const rep = await axios.post(url, ProfessorData);
      notify("added");
      reset();
      fetchProfessor();
    } catch (error) {
      console.error("Error adding Professor:", error);
    }
  };

  const updateProfessor = async () => {
    console.log(Professor);
    const rep = await axios.put(`${url}/${Professor.id}`, Professor);
    reset();
    fetchProfessor();
    notify("updated");
  };

  const deleteProfessor = async () => {
    const rep = await axios.delete(`${url}/${id}`);
    fetchProfessor();
    closeModal();
    notify("deleted");
  };

  //////modal toastify
  const [modal, setModal] = useState(false);

  const showModal = (stuid) => {
    setId(stuid);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const notify = (op) =>
    toast.success(`Professor ${op} successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="flex flex-col min-h-screen items-center font-body w-full bg-gray-300">
      <SidebarAdmin name={"p"} />
      <div className="flex flex-col ml-[90px] items-center w-5/6 ">

        <div className="flex flex-col w-2/3 m-4 bg-white p-5 rounded-xl justify-center items-center shadow-xl">
          <span className="flex items-center justify-center w-11/12">
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="firstName"
              name="firstName"
              value={Professor.firstName}
              onChange={handleProfessor}
            />

            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="lastName"
              name="lastName"
              value={Professor.lastName}
              onChange={handleProfessor}
            />
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@login"
              name="login"
              value={Professor.login}
              onChange={handleProfessor}
            />
            <input
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@grade"
              name="grade"
              value={Professor.grade}
              onChange={handleProfessor}
            />
          </span>
          <span className="flex items-center justify-center w-11/12">
            <input
              className="flex text-gray-700 outline-none  border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-2"
              placeholder="password"
              name="password"
              type="password"
              disabled={updateMode}
              value={Professor.password}
              onChange={handleProfessor}
            />
          </span>
          <span className="flex items-center justify-center w-11/12">
            <span className="flex w-2/3 m-1 items-center ml-20">
              {groups.map((group, index) => (
                <span className="flex m-2 items-center ">
                  <input
                    id={group.id}
                    type="checkbox"
                    value={group.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handlehandlegroupChange}
                  />

                  <label
                    htmlFor={group.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                  >
                    {group.code}
                  </label>
                </span>
              ))}
            </span>
          </span>

          {!updateMode ? (
            <button className="w-1/4 ml-10" onClick={addProfessor}>
              <div className=" text-white bg-green-500 hover:bg-black -600">
                <p className="text-lg font-semibold">Add</p>
              </div>
            </button>
          ) : (
            <button className="w-1/4 ml-10" onClick={updateProfessor}>
              <div className=" flex items-center justify-center py-2 px-8 rounded-xl  text-white bg-indigo-500 hover:bg-indigo-600">
                <FontAwesomeIcon icon={faPen} beat className="mr-4" />
                <p className="text-lg font-semibold">Update</p>
              </div>
            </button>
          )}
        </div>

        {/* studen section */}

        <div className="grid grid-cols-3 gap-5 w-full m-8">
          {loading ? (
            <p>Loading data</p>
          ) : (
            Professors &&
            Professors.map((Professor, index) => (
              <div className="flex flex-col rounded-xl  p-3 bg-white border border-indigo-300 border-opacity-70">
                <span className="flex border-b border-indigo-500 border-opacity-60 w-full mb-2 items-center pb-2">
                  <p className="text-gray-800 font-semibold text-lg mr-3">
                    {Professor.firstName} {Professor.lastName}
                  </p>

                  {Professor.group.map((r, index) => (
                    <p className="text-sm bg-gray-100 text-gray-500 rounded-xl px-3 py-1 mr-3">
                      {r.code}{" "}
                    </p>
                  ))}
                </span>

                <span className="flex p-1 w-full items-center">
                  <span className="w-2/12 text-center mx-2">
                    <p className="py-4 bg-indigo-500 rounded-full text-white text-xl font-body">
                      {Professor.firstName
                        ? Professor.firstName[0].toUpperCase()
                        : ""}
                      {Professor.lastName
                        ? Professor.lastName[0].toUpperCase()
                        : ""}
                    </p>
                  </span>

                  <span className="flex flex-col w-9/12 text-sm ml-2">
                    <span className="flex w-full items-center">
                      <span className="flex w-full items-center py-1">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-2 text-indigo-500"
                        />
                        <p>{Professor.login || "null login"}</p>
                      </span>
                    </span>

                    <span className="flex w-full items-center py-1">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="mr-2 text-indigo-500"
                      />
                      <p>{Professor.grade || "null grade"}</p>
                    </span>
                  </span>

                  <span className="flex flex-col w-1/12 ">
                    <button onClick={() => handleUpdate(Professor.id)}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="text-gray-300 mb-8 hover:text-green-500 hover:scale-125"
                      />
                    </button>
                    <button onClick={() => showModal(Professor.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-300 hover:text-red-500 hover:scale-125"
                      />
                    </button>
                  </span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        className="flex flex-col  bg-white w-1/4 mx-auto mt-48 rounded-md shadow border-2"
      >
        <button
          className="flex items-center justify-end mt-3 mr-3"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <p className="text-center text-2xl font-bold mt-10 mb-8 ">
          Do you want to delete this Professor ?
        </p>
        <div className="flex justify-center mb-10 ">
          <button
            onClick={closeModal}
            className="text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={deleteProfessor}
            className="text-lg mx-2 font-semibold py-2 px-5 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Professor;
