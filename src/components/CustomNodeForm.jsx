import React, { useState } from "react";
import ImageForm from "./forms/ImageForm";
import VideoForm from "./forms/VideoForm";
import VideoCallForm from "./forms/VideoCallForm";

const CustomNodeForm = ({ type, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    setFormData(data); // Save form data in state
    console.log("Submitted Data:", data);
  };

  // Dynamic Form Rendering
  const renderForm = () => {
    switch (type) {
      case "image":
        return (
          <ImageForm onSubmit={handleFormSubmit} initialValues={formData} />
        );
      case "video":
        return (
          <VideoForm onSubmit={handleFormSubmit} initialValues={formData} />
        );
      case "videoCall":
        return (
          <VideoCallForm onSubmit={handleFormSubmit} initialValues={formData} />
        );
      default:
        return <p className="text-gray-300">No form available</p>;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg w-full">
      {renderForm()}
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomNodeForm;
