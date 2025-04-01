const VideoForm = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">🎥 Video Upload</h2>
      <input
        type="file"
        accept="video/*"
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default VideoForm;
