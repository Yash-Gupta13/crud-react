import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import ContactCard from "./Components/ContactCard/ContactCard";
import AddContactCard from "./Components/AddContactCard/AddContactCard";
import Table from "./Components/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contactList, setContactList] = useState([]);

  const [singleContactDetails , setSingleContactDetails] = useState('');
  const [singleContactDetailsId, setSingleContactsDetailsId] = useState(null);
  const [isEdit , setIsEdit] = useState(false);
  const [editId , setEditId] = useState(null);
  const handleSingleDetails = (data)=>{
    setSingleContactDetails(data.data);
    setSingleContactsDetailsId(data.id)
  }

  const fetchData = async()=>{
    try {
      const response = await axios.get(
        `https://demobackend.web2.99cloudhosting.com/user/list_contacts?rows=20`
      );

      const contacts = response.data.record;
      setContactList(contacts);
    } catch (error) {
      
    }
  }

  const handleEdit = (id)=>{
    setIsEdit(true);
    setEditId(id);
  }

  const updatedDone = ()=>{
    setIsEdit(false);
    setEditId(null);
  }

  const handleDelete = async(id)=>{
    const confirm = window.confirm("Are you sure you want to delete?")

    if(!confirm){
      return;
    }

    const res = await axios.post(
      `https://demobackend.web2.99cloudhosting.com/user/delete_contact`,{
        "contact_id":id
      }
    );

    setSingleContactDetails('');
    setSingleContactsDetailsId(null);

    fetchData();
    
  }

  console.log("Main app id",editId," ",singleContactDetailsId)
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
      <div className="mainContainer">
        <Sidebar />
        <div className="mainContent">
          <div className="mainCard">
            <ContactCard data={singleContactDetails} id={singleContactDetailsId} onDelete={handleDelete} onEdit={handleEdit}/>
            <AddContactCard editId={editId} isEdit={isEdit} handleUpdate={updatedDone}/>
          </div>

          <div className="div">
            <Table contactList={contactList} handleChildData ={handleSingleDetails} onDelete={handleDelete}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
