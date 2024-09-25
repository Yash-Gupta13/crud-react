import { useEffect, useState } from "react";
import {Camera} from '../../assets/index'
import {format} from 'date-fns'

const InputField = ({formFields , onSubmit, initialData , buttonLabel}) => {
   const initializeFormData = () => {
     const initialFormData = {};
     formFields.forEach((field) => {
       if (field.type === "file") {
         initialFormData[field.name] = null;
       } else if (field.type === "date") {
         initialFormData[field.name] = format(
           new Date(),
           "MMMM d, yyyy h:mm aa"
         );
       } else if (field.type === "select") {
         initialFormData[field.name] =
           field.options.length > 0 ? field.options[0].value : "";
       } else {
         initialFormData[field.name] = "";
       }
     });
     return initialFormData;
   };

   const [formData, setFormData] = useState(initializeFormData);

   useEffect(() => {
     if (initialData) {
       const updatedData = { ...initialData };
       if (updatedData.createdOn) {
         updatedData.createdOn = format(
           new Date(updatedData.createdOn),
           "MMMM d, yyyy h:mm aa"
         );
       }
       setFormData(updatedData);
     }
   }, [initialData]);

   const handleChange = (e) => {
     const { name, value, files } = e.target;
     setFormData({
       ...formData,
       [name]: e.target.type === "file" ? files[0] : value,
     });
   };

    const handleButtonClick = (inputId) => {
      document.getElementById(inputId).click();
    };

   const handleSubmit = (e) => {
     e.preventDefault();
     onSubmit(formData);
    setFormData(initializeFormData());
   };


  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, index) => (
        <div className="formContent" key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            >
              {field.options.map((option, optIndex) => (
                <option key={optIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "file" ? (
            <div className="fileInputWrapper">
              <div className="fileDetails">
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <label htmlFor={field.name} className="fileInputLabel">
                  <div className="uploadImage">
                    <img src={Camera} alt="Upload File" />
                  </div>

                  <div className="fileSize">
                    <span>Upload File</span>
                    <span>Size: 600x150px, JPG, SVG, PNG, Max:200kb</span>
                  </div>
                </label>
              </div>
              <div className="chooseFile">
                <button
                  type="button"
                  onClick={() => handleButtonClick(field.name)}
                >
                  Choose File
                </button>
              </div>
            </div>
          ) : field.type === "date" ? (
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              readOnly
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit" className="submitButton">
       {buttonLabel}
      </button>
    </form>
  );
};

export default InputField