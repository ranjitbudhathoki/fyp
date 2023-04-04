import { Formik } from 'formik';

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'py' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Go', value: 'go' },
  { label: 'PHP', value: 'php' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'C#', value: 'csharp' },
  { label: 'Rust', value: 'rust' },
  { label: 'Scala', value: 'scala' },
  { label: 'Perl', value: 'perl' },
  { label: 'Lua', value: 'lua' },
];

const validateValues = (values: any) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = 'Missing Required Field *';
  }
  if (!values.language) {
    errors.language = 'Missing Required Field *';
  }
  return errors;
};

const CreateMatchPost = ({ onSubmit }) => {
  const handleSubmit = ({ title, language }: any) => {
    onSubmit({ title, language });
  };

  return (
    <Formik
      initialValues={{ title: '', language: '' }}
      validate={validateValues}
      onSubmit={handleSubmit}
    >
      {(formik: any) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-96 rounded-md "
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
            placeholder="Enter title..."
            className="bg-[#09090a]  text-white rounded text-base p-2"
            {...formik.getFieldProps('title')}
          />

          <label htmlFor="language" className="text-white">
            Select language:
          </label>
          {formik.errors.language ? (
            <p className="text-red-600 text-xs">{formik.errors.language}</p>
          ) : null}
          <select
            id="language"
            className="bg-[#09090a] text-white rounded text-base p-2"
            {...formik.getFieldProps('language')}
          >
            <option value="">Select a language...</option>
            {languages.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
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
};

export default CreateMatchPost;
