import React, { useState, useEffect } from "react";

const DynamicFieldsManager = () => {
  const [fields, setFields] = useState(() => {
    // Retrieve stored fields from localStorage
    const savedFields = localStorage.getItem("fields");
    return savedFields ? JSON.parse(savedFields) : [];
  });

  const [currentField, setCurrentField] = useState({
    fieldName: "",
    dataType: "string",
    isArray: false,
    isRequired: false,
  });

  // Save fields to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(fields));
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentField((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (!currentField.fieldName) {
      alert("Please enter a field name");
      return;
    }
    setFields((prev) => [...prev, currentField]);
    setCurrentField({
      fieldName: "",
      dataType: "string",
      isArray: false,
      isRequired: false,
    });
  };

  const handleRemoveField = (index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    console.log(JSON.stringify(fields, null, 2));
    alert("Check console for JSON output!");
  };

  return (
    <div className="h-auto bg-gray-100 p-4">
      <div className="min-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Collection Detail-Form</h1>

        <form onSubmit={handleAddField} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Field Name
            </label>
            <input
              type="text"
              name="fieldName"
              value={currentField.fieldName}
              onChange={handleChange}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              placeholder="Enter field name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data Type
            </label>
            <select
              name="dataType"
              value={currentField.dataType}
              onChange={handleChange}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="object">object</option>
              <option value="any">any</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isArray"
                checked={currentField.isArray}
                onChange={handleChange}
                id="isArray"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="isArray" className="ml-2 text-sm text-gray-700">
                Is Array
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isRequired"
                checked={currentField.isRequired}
                onChange={handleChange}
                id="isRequired"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="isRequired"
                className="ml-2 text-sm text-gray-700"
              >
                Required
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="self-end bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Field
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                  Field Name
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                  Data Type
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-center text-sm font-medium text-gray-700">
                  Is Array
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-center text-sm font-medium text-gray-700">
                  Required
                </th>
                <th className="px-4 py-2 border-b border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {fields.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No fields added yet.
                  </td>
                </tr>
              )}
              {fields.map((field, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                    {field.fieldName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                    {field.dataType}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-700">
                    {field.isArray ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-700">
                    {field.isRequired ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-right">
                    <button
                      onClick={() => handleRemoveField(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicFieldsManager;
