import moment from "moment";
import "./AddContactCard.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AddContactCard = ({ editId, isEdit, handleUpdate,renderData }) => {
  const date = new Date();
  const timeStamp = date.getTime();
  const formattedDate = moment(timeStamp).format("MMMM D, YYYY h:mm A");

  const formIntialState = {
    Name: "",
    Address: "",
    Number: "",
    CreatedOn: formattedDate,
    ContactStatus: "Active",
    Notes: "",
    Image: null,
  };
  const [formData, setFormData] = useState(formIntialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        Image: file,
      });
    }
    e.target.value = null;
  };

  useEffect(() => {
    if (editId && isEdit) {
      try {
        const fetchEditableData = async () => {
          const res = await axios.get(
            `https://demobackend.web2.99cloudhosting.com/user/get_details?id=${editId}`
          );

          console.log(res.data.contact_details);
          const {
            contact_address,
            contact_name,
            contact_notes,
            contact_number,
            contact_pic,
            contact_status,
          } = res?.data.contact_details;

          setFormData({
            Name: contact_name || "",
            Address: contact_address || "",
            Number: contact_number || "",
            CreatedOn: formattedDate, 
            ContactStatus: contact_status || "Active",
            Notes: contact_notes || "",
            Image: contact_pic, 
          });
        };

        fetchEditableData();
      } catch (error) {
        console.log(
          `Something went wrong in fetching the editable data`,
          error
        );
      }
    }
  }, [editId,isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const apiData = {
          contact_address: formData.Address,
          contact_name: formData.Name,
          contact_notes: formData.Notes,
          contact_number: formData.Number,
          contact_city: "",
          contact_email: "",
          contact_state: "",
          contact_id: editId,
        };

        console.log(`Under the handleSubmit and is edit is true`,apiData);
        const res = await axios.post(
          `https://demobackend.web2.99cloudhosting.com/user/update_contact_details`,
          {
            ...apiData,
            
          }
        );


      } else {
        const apiData = {
          contact_address: formData.Address,
          contact_name: formData.Name,
          contact_notes: formData.Notes,
          created_on: moment(timeStamp).format("YYYY-MM-DD"),
          contact_status: formData.ContactStatus,
          contact_number: formData.Number,
          contact_city: "",
          contact_email: "",
          contact_state: "",
        };

        const res = await axios.post(
          `https://demobackend.web2.99cloudhosting.com/user/add_contact`,
          apiData
        );

        const id = res.data.record.id;
        if (formData.Image === null) {
          alert("Please select the image");
          return;
        }
        const image = await axios.post(
          `https://demobackend.web2.99cloudhosting.com/profile_pic/add_contact_pic`,
          {
            contact_id: id,
            photo: formData.Image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setFormData({
        ...formIntialState,
        CreatedOn: formattedDate, 
      });
      renderData();
      handleUpdate();
       alert(isEdit ? "Updated Successfully" : "Added Successfully");
    } catch (error) {
      console.log(`There is something error in submitting the form`, error);
    }
  };

  return (
    <div className="addCardContainer">
      <div className="addCardHeading">
        <h1>{isEdit ? "Edit Contact Card" : "Add New Contact Card"}</h1>
      </div>
      <div className="formContent">
        <form onSubmit={handleSubmit} method="POST">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Number:</label>
            <input
              type="text"
              name="Number"
              value={formData.Number}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Created On:</label>
            <input
              type="text"
              name="CreatedOn"
              value={formData.CreatedOn}
              readOnly // The CreatedOn field is read-only
            />
          </div>

          <div>
            <label>Contact Status:</label>
            <select
              name="ContactStatus"
              value={formData.ContactStatus}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label>Notes:</label>
            <input
              type="text"
              name="Notes"
              value={formData.Notes}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Upload Media:</label>
            <input
              type="file"
              name="Image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {isEdit && editId && formData.Image ? (
            <div className="editImage">
              <img
                src={`https://demobackend.web2.99cloudhosting.com/profile_pic/list_contact_pic?contact_id=${editId}`}
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
          <button type="Submit">{editId ? "Update" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};
export default AddContactCard;
