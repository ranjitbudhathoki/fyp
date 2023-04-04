import Editor from '@monaco-editor/react';
import { useState } from 'react';
import axios from '../../utils/axios-instance';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

function CodeEditor({
  postId,
  userId,
  onSubmit,
  language: lang,
  preferredGender,
}) {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(lang);

  const handleEditorChange = (value: string, event: any) => {
    setValue(value);
  };
  const createSolutionMutation: any = useMutation({
    mutationFn: async (data: any) => {
      await axios.post('/api/solutions/', {
        ...data,
      });
    },
    onSuccess: () => {
      toast.success('Solution sent successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });

  const handleSave = async () => {
    if (value.length > 1000) {
      toast.error('Code is too long. Please upload image instead.');
      return;
    }
    if (value) {
      createSolutionMutation.mutate({
        userId,
        postId,
        code: value,
        preferredGender,
      });
    }
    onSubmit(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className="text-white  text-lg  font-bold content-center">
          Code Editor
        </h1>
        <Editor
          height="500px"
          width="700px"
          language={language}
          value={value}
          onChange={handleEditorChange}
          className="p-5 overflow-hidden"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <a
            href={`https://dreamy-ptolemy-eb4e80.netlify.app/?code=${encodeURIComponent(
              value
            )}`}
            target="_blank"
            className="text-blue-500"
            rel="noreferrer"
          >
            Click to preview
          </a>
          <div className="text-gray-500 items-center">
            Note: The canvas will be set to width 400px and height{' '}
            {Math.floor((400 * 10) / 7)}px for the image.If the code is long we
            recommend you to upload image instead.
          </div>
        </div>

        <div className="flex  justify-center">
          <button
            onClick={handleSave}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-light-green text-base font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
