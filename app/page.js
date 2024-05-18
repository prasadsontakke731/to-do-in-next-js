"use client"
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { useState } from "react";
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })
  const [todoData, setTodoData] = useState([])

  //get todos from database
  const fetchTodos = async () => {
    const response = await axios('/api', {
      headers: {
        "Content-Type": "application/json"
      }
    });
    setTodoData(response.data.todos)

  }
  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg)
    fetchTodos()
  }

  const completeTodo = async (id) => {
    const response = await axios.put("/api", {}, {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg)
    fetchTodos()
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value
    // console.log(name, value);
    setFormData(form => ({ ...form, [name]: value }))

  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      //api code

      const response = await axios.post('/api', formData)
      toast.success(response.data.msg)
      setFormData({
        title: "",
        description: ""
      })
      await fetchTodos()
    } catch (error) {
      toast.error("Failed")
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto" onSubmit={onSubmitHandler}>
        <input type="text" value={formData.title} onChange={onChangeHandler} name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full " />
        <textarea name="description" value={formData.description} onChange={onChangeHandler} placeholder="Enter Description" className="px-3 py-2 bottom-2 w-full" ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">ADD Todo</button>

      </form>


      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              todoData.map((item, index) => {
                return <Todo key={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} id={index} deleteTodo={deleteTodo} completeTodo={completeTodo} />
              })
            }
          </tbody>
        </table>
      </div>

    </>
  );
}
