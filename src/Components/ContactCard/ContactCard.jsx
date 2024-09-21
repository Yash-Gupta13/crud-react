import './ContactCard.css'
import { Profile , RecycleBin , Edit } from '../../assets/index'
import moment from 'moment';



const ContactCard = ({data,id,onDelete}) => {

console.log(data,id)
  // let formattedDate = "No data available";
  // if (data && data.generated) {
  //   try {
  //     const date = new Date(data.generated * 1000);
  //     formattedDate = format(date, "MMMM d, yyyy h:mm aaa");
  //   } catch (error) {
  //     console.error("Error formatting date:", error);
  //   }
  // }

  // const formatDate = (date) => {
  //   const options = {
  //     year: '2-digit', // 2-digit year (e.g., 21 for 2021)
  //     month: '2-digit', // 2-digit month (e.g., 06 for June)
  //     day: '2-digit', // 2-digit day (e.g., 19)
  //   };
  //   return new Date(date).toLocaleDateString('en-US', options);
  // };

  // const formatTime = (date) => {
  //   const options = {
  //     hour: 'numeric', // 12-hour format (e.g., 7)
  //     minute: '2-digit', // 2-digit minute (e.g., 41)
  //     hour12: true, // Use 12-hour format with AM/PM
  //   };
  //   return new Date(date).toLocaleTimeString('en-US', options);
  // };

  // const currentDate = new Date();

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!isConfirmed) {
      return;
    }
    
   
    
  };

  const handleEdit = ()=>{
    
  }

  const date = new Date();


  return (
    <div className="contactContainer">
      <div className="contactHeading">
        <h1>Contact Card</h1>
        {data ? (
          <div className="profileImg">
            <img
              src={`https://demobackend.web2.99cloudhosting.com/profile_pic/list_contact_pic?contact_id=${id}`}
              alt=""
            />
          </div>
        ) : null}
      </div>

      {data ? (
        <div>
          <div className="contactContent">
            <p>
              Name : <span className="result">{data.contact_name}</span>
            </p>
            <p>
              Address : <span className="result">{data.contact_address}</span>
            </p>
            <p>
              Number : <span className="result">{data.contact_number}</span>
            </p>
            <p>
              Created On :{" "}
              <span className="result">
                {moment.unix(data.generated).format("MMMM D, YYYY h:mm A")}
              </span>
            </p>
            <p>
              Contact Status :{" "}
              <span className="result">{data.contact_status}</span>
            </p>
            <p>
              Notes : <span className="result">{data.contact_notes}</span>
            </p>
          </div>

          <div className="contactEdit">
            <p>
              Check In :{" "}
              <span className="result">
                {moment(date.getTime()).format("MM/DD/YY h:mm A")}
              </span>
            </p>

            <div className="contactEditIcon">
              <div onClick={()=>onDelete(id)}>
                <img src={RecycleBin} alt="" />
              </div>
              <div onClick={handleEdit}>
                <img src={Edit} alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="noDataMessage">No data available for this contact card</p>
      )}
    </div>
  );
}
export default ContactCard