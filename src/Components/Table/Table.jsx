import "./Table.css";
import { RecycleBin } from "../../assets";
import moment from "moment";
import axios from "axios";

const Table = ({ contactList, handleChildData, onDelete }) => {
  const handleRowClick = async (id) => {
    const res = await axios.get(
      `https://demobackend.web2.99cloudhosting.com/user/get_details?id=${id}`
    );

    handleChildData({ data: res.data.contact_details, id: id });
  };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>{/* <span className="selectTable"></span> */}</th>
            <th>Contact Pic</th>
            <th>Name & Address</th>
            <th>Number</th>
            <th>Created On</th>
            <th>Contact Status</th>
            <th>Notes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactList?.map((contact, index) => (
            <tr key={index}>
              <td>
                <span
                  className={`selectTable selected`}
                  onClick={() => handleRowClick(contact.id)}
                ></span>
              </td>
              <td>
                <div className="contImg">
                  <img
                    src={`https://demobackend.web2.99cloudhosting.com/profile_pic/list_contact_pic?contact_id=${contact?.id}`}
                    alt="No pic is available"
                  />
                </div>
              </td>
              <td>{`${contact.contact_name}, ${contact.contact_address}`}</td>
              <td>{contact.contact_number}</td>
              <td>
                {moment(contact.created_on * 1000).format("DD/MM/YY")}
              </td>
              <td className="status">{contact.contact_status}</td>
              <td>{contact.contact_notes}</td>
              <td>
                <div className="deletebtn" onClick={() => onDelete(contact.id)}>
                  <img src={RecycleBin} alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
