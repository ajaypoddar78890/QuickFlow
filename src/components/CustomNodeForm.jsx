import React from "react";

const CustomNodeForm = ({ type , onClose}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
    <div className="bg-gray-500 p-4 rounded shadow-lg w-96">
      <h2 className="text-lg font-bold mb-2">{type} Form</h2>
      {type === "image" && <p>🖼️ Upload Image Form</p>}
      {type === "video" && <p>🎥 Video Upload Form</p>}
      {type === "videoCall" && <p>📞 Video Call Setup</p>}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
    </div>
  </div>  
  );
};

export default CustomNodeForm;
