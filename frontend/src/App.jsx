import Navbar from "./components/Navbar.jsx"
import { LuUserPlus, LuUsers } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import './App.css'
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;

function App() {

  const [show, setShow] = useState(true);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const [loading, setLoading] = useState(false);


  const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/api/view`);
        setContacts(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    fetchContacts();
  }, [])

  const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setEditId(contact._id);
    setShow(false);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        if (editId) {
          await axios.put(`${url}/api/update/${editId}`, {
            name, phone, email
          });
          alert("Successfully updated");
        } else {
          await axios.post(`${url}/api/create`, {
            name, phone, email
          });
          alert("Successfully saved");
        }

        handleClear();
        setEditId(null);
        fetchContacts();
        setShow(true);

      } catch (error) {
        console.error(error);
        alert("Error");
      }
    };

  const handleClear = () => {
    setName("");
    setPhone("");
    setEmail("");
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/delete/${confirmId}`);
      alert("Successfully deleted");
      fetchContacts();
      setConfirmId(null);
    } catch (error) {
      console.error(error);
    }
  };

  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const colors = [
    "bg-blue-200 text-blue-700",
    "bg-green-200 text-green-700",
    "bg-purple-200 text-purple-700",
    "bg-orange-200 text-orange-700",
    "bg-pink-200 text-pink-700",
  ];

  const getColor = (name) => {
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <div className="h-screen overflow-hidden font-[sans-serif] bg-white flex flex-col">
        <Navbar></Navbar>

        <div className="flex flex-1 min-h-0">

          <div className="h-full w-64 border-r bg-white p-4 hidden lg:flex flex-col justify-between">
            <div>
              <button onClick={() => setShow(true)} className={`${show ? "text-blue-700 bg-blue-100" : "bg-white hover:bg-gray-100"} w-full h-12 mt-3 flex items-center rounded-md pl-3`}>
                <LuUsers className={`text-[19px] ${show ? "text-blue-700" : "text-gray-800"} `} />
                <h1 className="ml-3">All Contacts</h1>
              </button>

              <button onClick={() => setShow(false)} className={`${show ? "bg-white hover:bg-gray-100" : "text-blue-700 bg-blue-100"} w-full h-12 mt-3 flex items-center rounded-md pl-3`}>
                <LuUserPlus className={`text-[19px] ${show ? "text-gray-800" : "text-blue-700"} `} />
                <h1 className="ml-3">Add Contact</h1>
              </button>
            </div>
          </div>

          <div className="w-full p-5 pb-3 md:p-9 md:pb-3 bg-white min-h-0 flex flex-col">
            {
              show ? (
                <div className="h-full flex flex-col">

                  <div className="flex justify-between mb-3">
                    <div>
                      <h1 className="text-[19px] md:text-[24px] font-semibold">All Contacts</h1>
                      <p className="text-[12px] md:text-[16px] text-gray-600">Manage your contacts easily</p>
                    </div>

                    <button onClick={() => setShow(false)} className="hover:bg-blue-700 text-[13px] md:text-[16px] bg-blue-600 w-[122px] h-[37px] md:w-[150px] md:h-[45px] text-white rounded-md flex items-center justify-center">
                      <IoAddSharp size={20} className="mr-2" />
                      <span>Add Contact</span>
                    </button>
                  </div>

                  <div className=" flex flex-1 flex-col border rounded-lg p-3 md:p-4 overflow-y-auto">

                    <div className="h-10 mb-3 max-w-[600px] border-2 flex rounded-lg">
                      <IoIosSearch className="w-10 h-10 p-2 pb-[9px] md:p-[7px] md:pb-[10px] text-gray-500" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="outline-none ml-1 w-full rounded-lg"
                        placeholder="Search contacts..."
                      />
                    </div>

                    {loading ? (
                        <div className="flex flex-1 items-center justify-center">
                          <p className="text-gray-500">Loading contacts...</p>
                        </div>
                      ) : filteredContacts.length === 0 ? (
                        <div className="flex flex-1 items-center justify-center">
                          <p className="text-gray-500">No contacts found</p>
                        </div>
                      ) : (
                    filteredContacts.map((contact) => (
                      <div key={contact._id} className="flex items-center justify-between p-3 sm:p-4 border rounded-xl mb-2 shadow-sm">

                        <div className="flex items-center gap-3">

                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-lg ${getColor(contact.name)}`}>
                            {contact.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h1 className="font-medium text-[14px] sm:text-[16px]">
                              {contact.name}
                            </h1>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-500 text-xs sm:text-sm mt-1">

                              <div className="flex items-center gap-1">
                                <FaPhoneAlt className="text-[10px]" />
                                <span>{contact.phone}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <MdEmail className="text-[12px]" />
                                <span className="break-all">{contact.email}</span>
                              </div>

                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-2">

                          <button className="p-2 rounded-md border border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleEdit(contact)}>
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => setConfirmId(contact._id)}
                            className="p-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <MdDelete />
                          </button>

                        </div>
                      </div>
                    )))}

                  </div>
                </div>
              )
                :
                (
                          <div className="h-full flex flex-col">
                                <div className="flex justify-between mb-3">
                                    <div>
                                      <h1 className="text-[19px] md:text-[24px] font-semibold">Contact Details</h1>
                                      <p className="text-[12px] md:text-[16px] text-gray-600">Add new contact</p>
                                    </div>
                                    <button  onClick={()=>setShow(true)} className="hover:bg-blue-700 text-[13px] md:text-[16px] bg-blue-600 w-[122px] h-[37px] md:w-[150px] md:h-[45px] text-white rounded-md flex items-center justify-center">
                                      <LuUsers size={20} className="mr-2"/>
                                      <span>All Contact</span>
                                    </button>
                                </div>
                                <div className="flex flex-1 flex-col border rounded-lg p-5 md:p-8">
                                  <form onSubmit={handleSubmit} className="flex flex-col">
                                        <label htmlFor="name" className="text-[15px]">Name</label>
                                        <input onChange={(e)=>setName(e.target.value)} value={name} required type="text" id="name" placeholder="Enter full name" 
                                        className="rounded-md mt-2 mb-4 border h-9 pl-2 outline-none max-w-[400px]"/>
                                        <label htmlFor="phone" className="text-[15px]">Phone</label>
                                        <input onChange={(e)=>setPhone(e.target.value)} value={phone} required pattern="[0-9]{10}" minLength={10} maxLength={10} type="tel" id="phone" placeholder="Enter phone number" 
                                        className="rounded-md mt-2 mb-4 border h-9 pl-2 outline-none max-w-[400px]"/>
                                        <label htmlFor="email" className="text-[15px]">Email</label>
                                        <input onChange={(e)=>setEmail(e.target.value)} value={email} required type="email" id="email" placeholder="Enter email address" 
                                        className="rounded-md mt-2 mb-5 border h-9 pl-2 outline-none max-w-[400px]"/>
                                        <button type="submit" className="mb-3 max-w-[400px] flex justify-center items-center bg-blue-600 h-10 hover:bg-blue-700 rounded-md text-white">
                                          <FaRegSave className="mr-1 pb-1 text-[21px]"/>
                                          <span>Save Contact</span>
                                        </button>
                                        <button onClick={handleClear} type="button" className="hover:bg-gray-100 max-w-[400px] h-10 border-2 rounded-md border-gray-200 text-blue-700">
                                            Clear
                                        </button>
                                  </form>
                                </div>
                            </div>
                          )}
                </div>
              </div>

              {confirmId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="bg-white p-5 rounded-lg shadow-lg w-[300px]">
                    <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Are you sure you want to delete?
                    </p>

                    <div className="flex justify-end gap-2">
                      <button onClick={() => setConfirmId(null)} className="px-3 py-1 border rounded">
                        Cancel
                      </button>
                      <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
      </div>
    </>
  )
}

export default App;

