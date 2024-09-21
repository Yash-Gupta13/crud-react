import './ContactCard.css'
import { Profile , RecycleBin , Edit } from '../../assets/index'



const ContactCard = () => {


  // let formattedDate = "No data available";
  // if (userDetails && userDetails.generated) {
  //   try {
  //     const date = new Date(userDetails.generated * 1000);
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

  // const handleDelete = () => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this contact?"
  //   );
  //   if (!isConfirmed) {
  //     return;
  //   }
    
  //   if (userDetails && userDetails.user_id) {
  //     dispatch(deleteContact(userDetails.user_id));
  //     dispatch(setUserDetails(null));
  //   } else {
  //     console.log("No user details available to delete");
  //   }
    
  // };

  // const handleEdit = ()=>{
  //   dispatch(setSelectedContact(userDetails));
  // }


  return (
    <div className="contactContainer">
      <div className="contactHeading">
        <h1>Contact Card</h1>
        {userDetails ? (
          <div className="profileImg">
            <img src={Profile} alt="" />
          </div>
        ) : null}
      </div>

      {userDetails ? (
        <div>
          <div className="contactContent">
            <p>
              Name : <span className="result">{userDetails.contact_name}</span>
            </p>
            <p>
              Address :{" "}
              <span className="result">{userDetails.contact_address}</span>
            </p>
            <p>
              Number :{" "}
              <span className="result">{userDetails.contact_number}</span>
            </p>
            <p>
              Created On : <span className="result">{formattedDate}</span>
            </p>
            <p>
              Contact Status :{" "}
              <span className="result">{userDetails.contact_status}</span>
            </p>
            <p>
              Notes :{" "}
              <span className="result">{userDetails.contact_notes}</span>
            </p>
          </div>

          <div className="contactEdit">
            <p>
              Check In :{" "}
              <span className="result">
                {formatDate(currentDate)} {formatTime(currentDate)}
              </span>
            </p>

            <div className="contactEditIcon">
              <div onClick={handleDelete}>
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