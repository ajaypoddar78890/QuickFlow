import React from "react";

const CustomForm = ({
  formData,
  handleChange,
  handleFormSubmit,
  closeModal,
}) => {
  return (
    <div style={modalOverlayStyles}>
      <div style={modalContentStyles}>
        <h3>Enter Detailss</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyles}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyles}
          />
          <div style={buttonContainerStyles}>
            <button type="button" onClick={closeModal} style={buttonStyles}>
              Cancel
            </button>
            <button type="submit" style={buttonStyles}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalOverlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: 400,
};

const inputStyles = {
  width: "100%",
  marginBottom: 10,
  padding: "8px",
  boxSizing: "border-box",
};

const buttonContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
};

const buttonStyles = {
  marginLeft: 10,
  padding: "8px 12px",
};

export default CustomForm;
