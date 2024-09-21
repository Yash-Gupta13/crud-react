import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import ContactCard from "./Components/ContactCard/ContactCard";
import AddContactCard from "./Components/AddContactCard/AddContactCard";
import Table from "./Components/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contactList, setContactList] = useState([]);

  const fetchData = async()=>{
    try {
      const response = await axios.get(
        `https://demobackend.web2.99cloudhosting.com/user/list_contacts`
      );

      const contacts = response.data.record;
      setContactList(contacts);
      // setContactList(contactWithPics);
    } catch (error) {
      
    }
  }

  

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
      <div className="mainContainer">
        <Sidebar />
        <div className="mainContent">
          <div className="mainCard">
            {/* <ContactCard /> */}
            <AddContactCard />
          </div>

          <div className="div">
            <Table contactList={contactList}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
