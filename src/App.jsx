import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import ContactCard from "./Components/ContactCard/ContactCard";
import AddContactCard from "./Components/AddContactCard/AddContactCard";
import Table from "./Components/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contactList, setContactList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://demobackend.web2.99cloudhosting.com/user/list_contacts?rows=${rows}&page=${page}&offset=${offset}`
      );
      setTotalRecords(response.data.metadata.total);
      console.log(response.data);
      const contacts = response.data.record;
      setContactList(contacts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]); 
  const handleNextPage = () => {
    if (page * rows < totalRecords) { 
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

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
            <Table contactList={contactList} />
          </div>
        </div>
      </div>
      <div>Total records: {totalRecords}</div>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={page * rows >= totalRecords}>
          Next Page
        </button>
      </div>
    </>
  );
}

export default App;
