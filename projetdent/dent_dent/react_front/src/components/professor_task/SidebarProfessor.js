import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserGraduate,
  faFileMedicalAlt,
  faTooth,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = (props) => {
  return (
    <div
      className="sidebar flex flex-col items-center justify-center fixed top-0 bottom-0 lg:left-0  duration-1000
    px-2 pt-5 w-[90px] overflow-y-auto text-center  bg-indigo-500 shadow h-screen"
    >
      <span
        className={`my-5 text-3xl p-4 ${
          props.name === "s"
            ? "text-indigo-500 bg-white rounded-xl"
            : "hover:rounded-xl text-white hover:text-indigo-500 hover:bg-white"
        }`}
      >
        <a href="/student">
          <FontAwesomeIcon icon={faUserGraduate} />
        </a>
      </span>
      <span
        className={`my-5 text-3xl p-4 ${
          props.name === "gs"
            ? "text-indigo-500 bg-white rounded-xl"
            : "hover:rounded-xl text-white hover:text-indigo-500 hover:bg-white"
        }`}
      >
        <a href="/groupestudent">
          <FontAwesomeIcon icon={faUsers} />
        </a>
      </span>

      <span
        className={`my-5 text-3xl p-4 ${
          props.name === "t"
            ? "text-indigo-500 bg-white rounded-xl"
            : "hover:rounded-xl text-white hover:text-indigo-500 hover:bg-white"
        }`}
      >
        <a href="/tooths">
          <FontAwesomeIcon icon={faTooth} />
        </a>
      </span>

      <span
        className={`my-5 text-3xl p-4 ${
          props.name === "pw"
            ? "text-indigo-500 bg-white rounded-xl"
            : "hover:rounded-xl text-white hover:text-indigo-500 hover:bg-white"
        }`}
      >
        <a href="/pws">
          <FontAwesomeIcon icon={faFileMedicalAlt} />
        </a>
      </span>
      <span
        className={`my-5 text-3xl p-4 ${
          props.name === "pw"
            ? "text-indigo-500 bg-white rounded-xl"
            : "hover:rounded-xl text-white hover:text-indigo-500 hover:bg-white"
        }`}
      >
        <a href="/zfile">
          <FontAwesomeIcon icon={faTasks} />
        </a>
      </span>
    </div>
  );
};

export default Sidebar;
