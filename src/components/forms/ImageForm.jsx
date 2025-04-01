import { useFormik } from "formik";
import * as Yup from "yup";

const ImageForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      numOfImages: "",
      maxSize: "",
      minSize: "",
      maxWidth: "",
      maxHeight: "",
    },
    validationSchema: Yup.object({
      numOfImages: Yup.number()
        .min(1, "At least 1 image required")
        .max(10, "Cannot upload more than 10 images")
        .required("Required"),
      maxSize: Yup.number()
        .min(1, "Minimum size must be at least 1MB")
        .max(10, "Maximum size must be less than 10MB")
        .required("Required"),
      minSize: Yup.number()
        .min(1, "Minimum size must be at least 1MB")
        .lessThan(Yup.ref("maxSize"), "Min size should be less than Max size")
        .required("Required"),
      maxWidth: Yup.number()
        .min(100, "Width must be at least 100px")
        .max(5000, "Width cannot exceed 5000px")
        .required("Required"),
      maxHeight: Yup.number()
        .min(100, "Height must be at least 100px")
        .max(5000, "Height cannot exceed 5000px")
        .required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg   text-black">
      <h2 className="text-lg font-bold mb-4">🖼️ Upload Image Settings</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Number of Images */}
        <div>
          <label className="block mb-1">Number of Images</label>
          <input
            type="number"
            className="border rounded w-full p-2 text-black"
            {...formik.getFieldProps("numOfImages")}
          />
          {formik.touched.numOfImages && formik.errors.numOfImages && (
            <p className="text-red-500 text-sm">{formik.errors.numOfImages}</p>
          )}
        </div>

        {/* Max Size */}
        <div>
          <label className="block mb-1">Max Size (MB)</label>
          <input
            type="number"
            className="border rounded w-full p-2 text-black"
            {...formik.getFieldProps("maxSize")}
          />
          {formik.touched.maxSize && formik.errors.maxSize && (
            <p className="text-red-500 text-sm">{formik.errors.maxSize}</p>
          )}
        </div>

        {/* Min Size */}
        <div>
          <label className="block mb-1">Min Size (MB)</label>
          <input
            type="number"
            className="border rounded w-full p-2 text-black"
            {...formik.getFieldProps("minSize")}
          />
          {formik.touched.minSize && formik.errors.minSize && (
            <p className="text-red-500 text-sm">{formik.errors.minSize}</p>
          )}
        </div>

        {/* Max Width */}
        <div>
          <label className="block mb-1">Max Width (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2 text-black"
            {...formik.getFieldProps("maxWidth")}
          />
          {formik.touched.maxWidth && formik.errors.maxWidth && (
            <p className="text-red-500 text-sm">{formik.errors.maxWidth}</p>
          )}
        </div>

        {/* Max Height */}
        <div>
          <label className="block mb-1">Max Height (px)</label>
          <input
            type="number"
            className="border rounded w-full p-2 text-black"
            {...formik.getFieldProps("maxHeight")}
          />
          {formik.touched.maxHeight && formik.errors.maxHeight && (
            <p className="text-red-500 text-sm">{formik.errors.maxHeight}</p>
          )}
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
