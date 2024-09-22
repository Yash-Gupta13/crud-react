import './ContactCard.css'
import { Profile , RecycleBin , Edit } from '../../assets/index'
import moment from 'moment';



const ContactCard = ({data,id,onDelete,onEdit}) => {
  console.log(`Contact card`,id)
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
              <div onClick={()=>onEdit(id)}>
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