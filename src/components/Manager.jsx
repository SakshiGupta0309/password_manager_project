// eslint-disable-next-line no-unused-vars
import { parse } from "postcss";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
 
const getPasswords =async()=>{
  let req=await fetch("http://localhost:3000/")
  let passwords=await req.json()
  setPasswordArray(passwords)
  console.log(passwords)
}

  useEffect(() => {
   getPasswords()
  }, []);

  const copyText = (text) => {
    // alert("copied to clipboard "+text)
    toast("copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    // alert("show the password");
    passwordref.current.type = "text";
    console.log(ref.current.src);
    // ref.current.src="hidden.png"
    if (ref.current.src.includes("hidden.png")) {
      ref.current.src = "eye.png";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "hidden.png";
      passwordref.current.type = "password";
    }
  };

  // eslint-disable-next-line no-unused-vars
  const savePassword = async() => {
    // console.log(form);
    if (form.site.length >3 && form.username.length >3 && form.password.length >3) {
   
      //  await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({ id:form.id }) })//phir yha pe({id})ki jgh ({id:form.id})kiye taki vo id lekar delet kre
      setPasswordArray([...passwordArray, {...form, id: uuidv4() }]);
   // eslint-disable-next-line no-unused-vars
    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4() }) })
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    //  console.log(passwordArray);// isko isliye comment kyuki ab localstorage me nahi database me save krna hai
    /console.log([...passwordArray,form])
    setform({site:" ",username:" ",password:""})
    toast("saved successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });}
    else{
      toast("not saved")
    }
  
    
  };

  const deletePassword = async(id) => {
    let c=confirm("do you really want to delet this ?")
    if (c){
     console.log("delet password with id", id)
     setPasswordArray(passwordArray.filter(item=>item.id!==id))
    //  localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    
   // eslint-disable-next-line no-unused-vars
   let res = await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id}) }) //yha edit kiye ({...form,id})se({id kiye taki delet krne me problem na jaye})
     setform({site:" ",username:" ",password:""}) /*form khali show nhi hora tha isliye ye lga li*/
     toast("deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }};

  const editPassword = (id) => {
    console.log("edit password with id", id)
    setform({...passwordArray.filter(i=>i.id===id)[0],id:id})
    setPasswordArray({...passwordArray.filter(item=>item.id !==id),id:id})
  };



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
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
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="  p-3 md:p-0 md:mycontainer  min-h-[88.2vh]">
        <h1 className="text-4xl- text font-bold text-center">
          <span className="text-green-500">&lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          your own password manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[3px] top-[4-px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="eye.png"
                  alt="eye"
                />
              </span>
            </div>
            {" "}
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-5 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              // style="width:250px;height:250px"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">your passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  text-center  py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {" "}
                            {item.site}
                          </a>
                          <div
                            className="  lordiconcopy  size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "3px",
                                "padding-left": "3px",
                              }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center   py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>

                          <div
                            className="  lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "3px",
                                "padding-left": "3px",
                              }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center   py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>

                          <div
                            className=" lordiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "3px",
                                "padding-left": "3px",
                              }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center   py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/ogkflacg.json"
                              trigger="hover"
                              
                            ></lord-icon>
                          </span>
                          <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
