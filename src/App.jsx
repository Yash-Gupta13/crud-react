import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddContactCard from "./Components/AddContactCard/AddContactCard";
import Table from "./Components/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contactList, setContactList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10); // Default number of rows
  const [totalPages, setTotalPages] = useState(0); // New state for total pages

  // Fetch data based on current page and rows
  const fetchData = async () => {
    try {
      const offset = (page - 1) * rows; // Calculate offset based on current page
      const response = await axios.get(
        `https://demobackend.web2.99cloudhosting.com/user/list_contacts?rows=${rows}&page=${page}&offset=${offset}`
      );
      setTotalRecords(response.data.metadata.total);
      const contacts = response.data.record;
      setContactList(contacts);

      // Calculate total pages
      const pages = Math.ceil(response.data.metadata.total / rows);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rows]); // Fetch data whenever the page or rows change

  const handleNextPage = () => {
    if (page < totalPages) { // Update check to use totalPages
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleRowSelection = (event) => {
    setRows(Number(event.target.value)); // Update the rows based on user selection
    setPage(1); // Reset to the first page when rows change
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
            <div className="records-info">
              <div className="total-records-div">Total records: {totalRecords}</div>
              <div className="pagination-info">
                Page {page} of {totalPages}
              </div>
            </div>
            <div className="row-selection-div">
              <label htmlFor="rows">Select rows per page: </label>
              <select id="rows" value={rows} onChange={handleRowSelection}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
            <div className="pagination-div">
              <button onClick={handlePreviousPage} disabled={page === 1}>
                Previous Page
              </button>
              <span>{page}</span>
              <button onClick={handleNextPage} disabled={page >= totalPages}>
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
