import React, { useState } from "react";

const VideoForm = ({ onSubmit, initialValues = {} }) => {
  const defaultData = {
    title: "",
    description: "",
    settings: {
      maxSize: 500, // Default max size (MB)
      minDuration: 0,
      maxDuration: 300,
      watermark: false,
      coordinate: false,
    },
  };

  // Merge initialValues with defaultData
  const [videoData, setVideoData] = useState({
    ...defaultData,
    ...initialValues,
    settings: { ...defaultData.settings, ...initialValues.settings },
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("settings.")) {
      const settingKey = name.split(".")[1];
      setVideoData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          [settingKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setVideoData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024); // Convert to MB
      if (fileSizeMB > videoData.settings.maxSize) {
        setError(
          `File size exceeds max limit of ${videoData.settings.maxSize}MB`
        );
        return;
      }
      setFile(selectedFile);
      setError(""); // Clear errors
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoData.title || !videoData.description || !file) {
      setError("All fields are required!");
      return;
    }

    const formData = {
      ...videoData,
      file: file.name, // Just storing file name, actual upload happens elsewhere
    };

    onSubmit(formData); // Pass data to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">🎥 Video Upload</h2>

      <label className="block mb-2">Title</label>
      <input
        type="text"
        name="title"
        value={videoData.title}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      />

      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        value={videoData.description}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      />

      <label className="block mb-2">Upload Video</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="border p-2 rounded w-full mb-3"
        required
      />

      {/* Settings */}
      <div className="mt-4 border p-3 rounded bg-gray-100">
        <h3 className="font-bold mb-2">Settings</h3>

        <label className="block mb-2">Max Size (MB)</label>
        <input
          type="number"
          name="settings.maxSize"
          value={videoData.settings.maxSize}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <label className="block mb-2">Min Duration (seconds)</label>
        <input
          type="number"
          name="settings.minDuration"
          value={videoData.settings.minDuration}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <label className="block mb-2">Max Duration (seconds)</label>
        <input
          type="number"
          name="settings.maxDuration"
          value={videoData.settings.maxDuration}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
        />

        <label className="inline-flex items-center space-x-2 mb-3">
          <input
            type="checkbox"
            name="settings.watermark"
            checked={videoData.settings.watermark}
            onChange={handleChange}
          />
          <span>Add Watermark</span>
        </label>

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="settings.coordinate"
            checked={videoData.settings.coordinate}
            onChange={handleChange}
          />
          <span>Use Coordinates</span>
        </label>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default VideoForm;
