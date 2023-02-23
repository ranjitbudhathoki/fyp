import React from 'react';

import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import SnippetForm from './CodeSnippet';

function CodeEditor() {
  const FileUploader = ({ onFileLoad }) => {
    return (
      <input type="file" onChange={(e) => onFileLoad(e.target.files[0])} />
    );
  };
  const [file, setFile] = useState<File>();
  const [value, setValue] = useState();
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

  return (
    <>
      {/* <FileUploader onFileLoad={setFile} />
      <div className="flex flex-col justify-self-center">
        <Editor
          height="90vh"
          language={language}
          value={value}
          className="p-5"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-1 px-1 rounded  "
        >
          Submit
        </button>
      </div> */}
      <SnippetForm />
    </>
  );
}

export default CodeEditor;
