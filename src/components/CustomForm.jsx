import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { FaTrash } from "react-icons/fa";
import { useReactFlow } from "@xyflow/react";

const DynamicFieldsManager = ({ nodeId, closeModal }) => {
  const { getNodes } = useReactFlow();
  const nodes = getNodes(); // Fetch the latest nodes

  const [allFields, setAllFields] = useState(() => {
    const savedData = localStorage.getItem("allFields");
    try {
      return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
      console.error("Error parsing initial allFields from localStorage", error);
      return {};
    }
  });

  const [fields, setFields] = useState(allFields[nodeId] || []);

  const [currentField, setCurrentField] = useState({
    fieldName: "",
    dataType: "string",
    isArray: false,
    isRequired: false,
  });

  useEffect(() => {
    setFields(allFields[nodeId] || []);
  }, [allFields, nodeId]);

  useEffect(() => {
    try {
      localStorage.setItem("allFields", JSON.stringify(allFields));
    } catch (error) {
      console.error("Error setting allFields to localStorage:", error);
    }
  }, [allFields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentField((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (!currentField.fieldName.trim()) {
      toast.error("Field name cannot be empty!");
      return;
    }

    setAllFields((prev) => {
      const updatedFields = {
        ...prev,
        [nodeId]: [...(prev[nodeId] || []), currentField],
      };
      return updatedFields;
    });

    setCurrentField({
      fieldName: "",
      dataType: "string",
      isArray: false,
      isRequired: false,
    });

    toast.success("Field added successfully!");
  };

  const handleRemoveField = (index) => {
    setAllFields((prev) => {
      const updatedFields = prev[nodeId].filter((_, i) => i !== index);
      return {
        ...prev,
        [nodeId]: updatedFields,
      };
    });
    toast.success("Field removed!");
  };

  const handleExport = async () => {
    try {
      const exportData = fields.map((field) => ({
        fieldName: field.fieldName,
        dataType: field.dataType,
        isArray: field.isArray,
        isRequired: field.isRequired,
        connectedTo:
          nodes.find((node) => node.id === field.id)?.data?.connectedTo || [], // Fetch connectedTo
      }));

      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
      console.log(
        "Nodes Before Export:",
        nodes.map((node) => ({
          id: node.id,
          connectedTo: node.data?.connectedTo,
        }))
      );

      toast.success("Copied to Clipboard!");
      console.log("Final Export Data:", JSON.stringify(exportData, null, 2));
    } catch (error) {
      toast.error("Failed to copy data!");
      console.error("Export Error:", error);
    }
  };

  return (
    <div className="h-auto bg-gray-100 p-4 z-30">
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
                id={`isArray_${nodeId}`}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor={`isArray_${nodeId}`}
                className="ml-2 text-sm text-gray-700"
              >
                Is Array
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isRequired"
                checked={currentField.isRequired}
                onChange={handleChange}
                id={`isRequired_${nodeId}`}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor={`isRequired_${nodeId}`}
                className="ml-2 text-sm text-gray-700"
              >
                Required
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="self-end bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
          >
            Add Field
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Field Name
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  Data Type
                </th>
                <th className="px-4 py-2 border-b text-center text-sm font-medium text-gray-700">
                  Is Array
                </th>
                <th className="px-4 py-2 border-b text-center text-sm font-medium text-gray-700">
                  Required
                </th>
                <th className="px-4 py-2 border-b"></th>
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
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {field.fieldName}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {field.dataType}
                  </td>
                  <td className="px-4 py-2 border-b text-center text-sm text-gray-700">
                    {field.isArray ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b text-center text-sm text-gray-700">
                    {field.isRequired ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b text-right cursor-pointer">
                    <button
                      onClick={() => handleRemoveField(index)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer"
          >
            Export JSON
          </button>
          <button
            onClick={closeModal}
            className="bg-black text-white py-2 px-4 rounded   cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicFieldsManager;
