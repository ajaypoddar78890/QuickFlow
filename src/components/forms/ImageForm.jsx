import { useFormik } from "formik";
import * as Yup from "yup";

const ImageForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      images: [{ title: "", description: "" }], // Array of images
      settings: {
        maxSize: "", // Max file size in MB
        width: "",
        height: "",
        mimeType: "",
        minWidth: "",
        minHeight: "",
        maxWidth: "",
        maxHeight: "",
        watermark: false,
        coordinate: false,
      },
    },
    validationSchema: Yup.object({
      images: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
        })
      ),
      settings: Yup.object().shape({
        maxSize: Yup.number().min(1).max(10).required("Required"),
        width: Yup.number().optional(),
        height: Yup.number().optional(),
        minWidth: Yup.number().optional(),
        minHeight: Yup.number().optional(),
        maxWidth: Yup.number().optional(),
        maxHeight: Yup.number().optional(),
        mimeType: Yup.string().optional(),
      }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form Data:", values);
      onSubmit(values);
      const JSonData = JSON.stringify(values, null, 2);
      console.log(JSonData);

      setSubmitting(false);
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg text-black">
      <h2 className="text-lg font-bold mb-4">🖼️ Upload Image Settings</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Image Fields */}
        {formik.values.images.map((image, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold">Image {index + 1}</h3>

            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                {...formik.getFieldProps(`images[${index}].title`)}
              />
              {formik.touched.images?.[index]?.title &&
                formik.errors.images?.[index]?.title && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.images[index].title}
                  </p>
                )}
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                {...formik.getFieldProps(`images[${index}].description`)}
              />
              {formik.touched.images?.[index]?.description &&
                formik.errors.images?.[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.images[index].description}
                  </p>
                )}
            </div>
          </div>
        ))}

        {/* Button to Add More Images */}
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("images", [
              ...formik.values.images,
              { title: "", description: "" },
            ])
          }
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          ➕ Add More Images
        </button>

        {/* Image Settings */}
        <h3 className="font-bold mt-4">📏 Image Settings</h3>

        <div>
          <label className="block mb-1">Max Size (MB)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.maxSize")}
          />
          {formik.touched.settings?.maxSize &&
            formik.errors.settings?.maxSize && (
              <p className="text-red-500 text-sm">
                {formik.errors.settings.maxSize}
              </p>
            )}
        </div>

        <div>
          <label className="block mb-1">Width (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.width")}
          />
        </div>

        <div>
          <label className="block mb-1">Height (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.height")}
          />
        </div>
        <div>
          <label className="block mb-1">Min Width (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.minWidth")}
          />
        </div>

        <div>
          <label className="block mb-1">Min Height (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.minHeight")}
          />
        </div>

        <div>
          <label className="block mb-1">Max Width (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.maxWidth")}
          />
        </div>

        <div>
          <label className="block mb-1">Max Height (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            {...formik.getFieldProps("settings.maxHeight")}
          />
        </div>

        <div>
          <label className="block mb-1">Allowed MIME Type</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            placeholder="e.g., image/png, image/jpeg"
            {...formik.getFieldProps("settings.mimeType")}
          />
        </div>

        <div>
          <label className="block mb-1">Enable Watermark</label>
          <input
            type="checkbox"
            className="mr-2"
            {...formik.getFieldProps("settings.watermark")}
            checked={formik.values.settings.watermark}
          />
          <span>Yes</span>
        </div>

        <div>
          <label className="block mb-1">Enable Coordinate</label>
          <input
            type="checkbox"
            className="mr-2"
            {...formik.getFieldProps("settings.coordinate")}
            checked={formik.values.settings.coordinate}
          />
          <span>Yes</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageForm;
