import React from 'react';
import { Formik } from 'formik';

const validateValues = (values: any) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = 'Missing Required Field *';
  }
  return errors;
};

const CreateMatchPost = ({ onSubmit }) => {
  const handleSubmit = ({ title }: any) => {
    onSubmit({ title });
  };

  return (
    <Formik
      initialValues={{ title: '' }}
      validate={validateValues}
      onSubmit={handleSubmit}
    >
      {(formik: any) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-96 rounded-md"
        >
          <label htmlFor="title" className="text-white">
            Enter title:
          </label>
          {formik.errors.title ? (
            <p className="text-red-600 text-xs">{formik.errors.title}</p>
          ) : null}
          <input
            id="title"
            type="text"
            placeholder="Enter description..."
            className="bg-[#09090a]  text-white rounded text-base p-2"
            {...formik.getFieldProps('title')}
          />
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
};

export default CreateMatchPost;
