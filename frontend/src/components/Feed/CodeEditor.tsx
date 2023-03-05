import React from 'react';

import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios-instance';

function CodeEditor({ postId, userId }) {
  const FileUploader = ({ onFileLoad }) => {
    return (
      <input type="file" onChange={(e) => onFileLoad(e.target.files[0])} />
    );
  };
  const [file, setFile] = useState<File>();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    if (file) {
      var reader = new FileReader();
      reader.onload = async (e: any) => {
        setValue(e.target.result);
      };
      reader.readAsText(file);
      let newLanguage = 'javascript';
      const extension = file.name.split('.').pop();
      if (['css', 'html', 'json'].includes(extension)) {
        newLanguage = extension;
      } else if (extension === 'md') {
        newLanguage = 'markdown';
      }
      setLanguage(newLanguage);
    }
  }, [file]);

  console.log(value);

  const handleEditorChange = (value: string, event: any) => {
    setValue(value);
  };

  const handleSave = async () => {
    console.log(userId);
    console.log(value);
    console.log('handle triggred');
    if (value) {
      const response = await axios.post(
        'http://localhost:8000/api/save-snippet',
        { code: value }
      );
      const response2 = await axios
        .post('http://localhost:8000/api/save-solution', {
          postId,
          userId,
          body: value,
          imgUrl: response.data.filename,
        })
        .catch((error) => {
          console.error('Error saving snippet:', error);
        });
    }
  };

  return (
    <>
      <FileUploader onFileLoad={setFile} />
      <div className="flex flex-col justify-self-center">
        <Editor
          height="70vh"
          language={language}
          value={value}
          onChange={handleEditorChange}
          className="p-5"
        />
      </div>

      <div className="mb-4">
        <a
          href={`https://dreamy-ptolemy-eb4e80.netlify.app/?code=${encodeURIComponent(
            value
          )}`}
          target="_blank"
          className="text-blue-500"
        >
          Click to preview
        </a>
        <div className="text-gray-500">
          Note: The canvas will be set to width 400px and height{' '}
          {Math.floor((400 * 10) / 7)}px for the image
        </div>
      </div>

      <div className="flex  justify-center">
        <button
          onClick={handleSave}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Submit
        </button>
      </div>

      {/* <SnippetForm /> */}
    </>
  );
}

export default CodeEditor;

// import Editor from "react-simple-code-editor";
// import Highlight, { defaultProps } from "prism-react-renderer";
// import darkTheme from "prism-react-renderer/themes/nightOwl";
// import lightTheme from "prism-react-renderer/themes/nightOwlLight";

// function CodeEditor(){
//   const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}'`);
// const [theme, setTheme] = useState("dark");
// }
