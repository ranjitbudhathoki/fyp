import { Formik } from 'formik';

interface Props {
  onUpdate: (data: any) => void;
  bio?: string;
  preferredGender?: string;
}

const validateValues = (values: any) => {
  const errors: Record<string, string> = {};
  if (!values.bio) {
    errors.bio = 'Missing Required Field *';
  }
  if (!values.preferredGender) {
    errors.preferredGender = 'Missing Required Field *';
  }
  return errors;
};

function UpdateProfileModal({ bio, preferredGender, onUpdate }: Props) {
  const onSubmit = (values: any) => {
    console.log('values', values);
    onUpdate({ bio: values.bio, preferredGender: values.preferredGender });
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ bio, preferredGender }}
      validate={validateValues}
    >
      {(formik: any) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-96 rounded-md text-white"
        >
          <label htmlFor="bio">Bio:</label>
          {formik.errors.bio ? (
            <p className="text-red-600 text-xs">{formik.errors.name}</p>
          ) : null}
          <input
            id="bio"
            type="text"
            placeholder="Enter your bio..."
            className="bg-[#09090a] rounded text-base p-2"
            {...formik.getFieldProps('bio')}
          />

          <label htmlFor="preferredGender">Preferred Gender:</label>
          {formik.errors.preferredGender ? (
            <p className="text-red-600 text-xs">
              {formik.errors.preferredGender}
            </p>
          ) : null}
          <select
            id="preferredGender"
            className="bg-[#09090a] rounded text-base p-2"
            {...formik.getFieldProps('preferredGender')}
          >
            <option value="">Select an option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="bg-custom-light-green px-4 py-2 rounded-md text-base text-custom-black font-bold"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

export default UpdateProfileModal;
