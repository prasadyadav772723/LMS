import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AlertComponents from "../../components/AlertComponents";
import { Link } from "react-router-dom";

function AllCourses() {
  const [course, setCourse] = useState([]);
  const [show, setShow] = useState("hidden");
  const [error, setError] = useState();
  const [deleteId,setDeleteId]=useState()

  async function get_courses() {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ORIGIN}/api/courses/get-all-courses`
    );
    setCourse(response?.data?.data);
    
  }

  useEffect(() => {
    get_courses();
  }, []);

  function handleDelete(id)
  {
    setDeleteId(id)

  }
  async function deleteAlert() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_ORIGIN}/api/courses/delete-course/${deleteId}`
      );
      if (response) {
        setShow("block");
        setError(response?.data?.message);
        get_courses();
      } else {
        return "Error while deleting the course";
      }
    } catch {
      return ("Something went wrong while api calling");
    }
  }

  if (show == "block") {
    setTimeout(() => {
      setShow("hidden");
    }, 3000);
  }

  if (course.length == 0) {
    return <h1 className="text-center mt-5">No Courses found</h1>;
  } else {
    return (
      <div>
        <h1 className="text-[20px] tex-center mx-auto">All Courses</h1>
        <div className=" flex justify-evenly align-center courses-section ">
          {course.map((x) => {
            return (
              <div className="card bg-base-100 w-96 shadow-sm bg-[black] text-[white] h-[350px] w-[350px]">
                <figure>
                  <img
                    className="w-[100%] object-cover"
                    src={x.img}
                    alt={x.course_name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title ">{x.course_name}</h2>
                  <h1>Duration :- {x.duration} Months</h1>
                  <h1>Price :- {x.price}/-</h1>
                  <h1>Mode :- {x.mode} </h1>
                  <div className="card-actions justify-end ">
                    <button className="badge badge-outline btn bg-[lime] p-4  border-none">
                      <Link to={`/dashboard/update-course/${x.id}`}> UPDATE</Link>
                    </button>
                    <button
                      className="badge badge-outline btn bg-[red] p-4 text-[white] border-none"
                      onClick={() =>{
                        handleDelete(x.id)

                        document.getElementById("my_modal_3").showModal()
                      }
                    }
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-gray-600 ">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[white]">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg ">
                Are you sure want to Delete?
              </h3>
              <form method="dialog">
                <button
                  className="btn bg-[red] text-[white] border-none mt-3"
                  onClick={() => {
                    deleteAlert()
                  }}
                >
                  DELETE
                </button>
              </form>
            </div>
          </dialog>
        </div>
        <span className={`${show}`}>
          <AlertComponents data={`${error}`} />
        </span>
      </div>
    );
  }
}

export default AllCourses;
