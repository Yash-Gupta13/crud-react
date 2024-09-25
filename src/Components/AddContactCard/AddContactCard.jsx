import moment from "moment";
import "./AddContactCard.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Camera } from "../../assets/index";

const AddContactCard = ({ editId, isEdit, handleUpdate, renderData }) => {
  const date = new Date();
  const timeStamp = date.getTime();
  const formattedDate = moment(timeStamp).format("MMMM D, YYYY h:mm A");

  // File input state
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [fileName, setFileName] = useState(""); // State to store selected file name

  const formInitialState = {
    Name: "",
    Address: "",
    Number: "",
    CreatedOn: formattedDate,
    ContactStatus: "Active",
    Notes: "",
    Image: null,
  };

  const [formData, setFormData] = useState(formInitialState);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        Image: file,
      });
      setFileName(file.name); // Set file name in state
    }
  };

  const fileInputRef = useRef(null);

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input click
    }
  };

  // Fetch the editable data on edit
  useEffect(() => {
    if (editId && isEdit) {
      const fetchEditableData = async () => {
        try {
          const res = await axios.get(
            `https://demobackend.web2.99cloudhosting.com/user/get_details?id=${editId}`
          );

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
            Image: contact_pic, // Assuming this is a URL of the image
          });
        } catch (error) {
          console.error("Error fetching editable data", error);
        }
      };

      fetchEditableData();
    }
  }, [editId, isEdit]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        contact_address: formData.Address,
        contact_name: formData.Name,
        contact_notes: formData.Notes,
        contact_number: formData.Number,
        contact_status: formData.ContactStatus,
        contact_city: "",
        contact_email: "",
        contact_state: "",
      };

      let res;
      if (isEdit) {
        apiData.contact_id = editId;
        res = await axios.post(
          `https://demobackend.web2.99cloudhosting.com/user/update_contact_details`,
          apiData
        );
      } else {
        res = await axios.post(
          `https://demobackend.web2.99cloudhosting.com/user/add_contact`,
          apiData
        );
      }

      const id = res.data.record?.id || editId;

      // Image upload if a new image is selected
      if (formData.Image && typeof formData.Image !== "string") {
        const formDataObj = new FormData();
        formDataObj.append("contact_id", id);
        formDataObj.append("photo", formData.Image);

        await axios.post(
          `https://demobackend.web2.99cloudhosting.com/profile_pic/add_contact_pic`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // Reset form after submission
      setFormData({
        ...formInitialState,
        CreatedOn: formattedDate,
      });
      setFileInputKey(Date.now()); // Reset the file input
      setFileName(""); // Reset file name
      renderData();
      handleUpdate();
      alert(isEdit ? "Updated Successfully" : "Added Successfully");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="addCardContainer">
      <div className="addCardHeading">
        <h1>{isEdit ? "Edit Contact Card" : "Add New Contact Card"}</h1>
      </div>
      <div className="formContent">
        <form onSubmit={handleSubmit}>
          <div className="formInput">
            <label>Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
            />
          </div>

          <div className="formInput">
            <label>Address</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
            />
          </div>

          <div className="formInput">
            <label>Number</label>
            <input
              type="text"
              name="Number"
              value={formData.Number}
              onChange={handleInputChange}
            />
          </div>

          <div className="formInput">
            <label>Created On</label>
            <input
              type="text"
              name="CreatedOn"
              value={formData.CreatedOn}
              readOnly // Read-only for created date
            />
          </div>

          <div className="formInput">
            <label>Contact Status</label>
            <select
              name="ContactStatus"
              value={formData.ContactStatus}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="formInput">
            <label>Notes</label>
            <input
              type="text"
              name="Notes"
              value={formData.Notes}
              onChange={handleInputChange}
            />
          </div>

          <div className="formInput">
            <label>Attachment File</label>
            <div className="imageUpload">
              <div className="uploadImage">
                <img src={Camera} alt="Upload File" />
              </div>
              <div className="fileSize">
                {fileName ? (
                  <span>{fileName}</span>
                ) : (
                  <>
                    <span>Upload File</span>
                    <span>Size: 600x150px, JPG, SVG, PNG, Max: 200kb</span>
                  </>
                )}
              </div>
              <input
                type="file"
                name="Image"
                accept="image/*"
                onChange={handleFileChange}
                key={fileInputKey}
                ref={fileInputRef}
                className="fileInput"
                style={{ display: "none" }}
              />

              {isEdit && editId && formData.Image ? (
                <div className="editImage">
                  <img
                    src={`https://demobackend.web2.99cloudhosting.com/profile_pic/list_contact_pic?contact_id=${editId}`}
                    alt="Current contact"
                  />
                </div>
              ) : (
                <p className="chooseFileButton" onClick={handleChooseFileClick}>
                  Choose File
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="submitButton">
            {isEdit ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContactCard;
