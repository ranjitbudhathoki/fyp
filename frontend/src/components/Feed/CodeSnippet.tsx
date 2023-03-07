// import { useState } from 'react';
// import InputField from './InputField';
// import SelectField from './SelectField';

// import {
//   fontOptions,
//   languageOptions,
//   themeOptions,
// } from '../../shared/constants';
// import type { SnippetData } from '../../shared/types';

// function SnippetForm() {
//   const [data, setData] = useState<SnippetData>({
//     language: 'javascript',
//     theme: 'monokai',
//     fontFamily: 'Fira Code',
//     code: '',
//   });

//   const handleSave = () => {
//     if (data.code) {
//       fetch('http://localhost:8000/api/save-snippet', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // handle response data from server
//           console.log(data);
//         })
//         .catch((error) => {
//           console.error('Error saving snippet:', error);
//         });
//     }
//   };

//   return (
//     <main className="max-w-md mx-auto my-4 p-6 rounded-md shadow-md">
//       <div className="mb-4">
//         <SelectField
//           label="Syntax Highlighting"
//           name="language"
//           value={data.language}
//           options={languageOptions}
//           onChange={(e) =>
//             setData((prevData) => ({ ...prevData, language: e.target.value }))
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <SelectField
//           label="Theme"
//           name="theme"
//           value={data.theme}
//           options={themeOptions}
//           onChange={(e) =>
//             setData((prevData) => ({ ...prevData, theme: e.target.value }))
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <SelectField
//           label="Font Family"
//           name="fontFamily"
//           value={data.fontFamily}
//           options={fontOptions}
//           onChange={(e) =>
//             setData((prevData) => ({ ...prevData, fontFamily: e.target.value }))
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <InputField
//           min={0}
//           max={600}
//           textarea="true"
//           name="code"
//           label={`Code ${data.code.length}/600`}
//           value={data.code}
//           onChange={(e) =>
//             setData((prevData) => ({ ...prevData, code: e.target.value }))
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <a
//           href={`https://dreamy-ptolemy-eb4e80.netlify.app/?code=${encodeURIComponent(
//             data.code
//           )}&l=${encodeURIComponent(data.language)}&t=${encodeURIComponent(
//             data.theme
//           )}&fm=${encodeURIComponent(data.fontFamily)}&fs=14px`}
//           target="_blank"
//           className="text-blue-500"
//         >
//           Click to preview
//         </a>
//         <div className="text-gray-500">
//           Note: The canvas will be set to width 400px and height{' '}
//           {Math.floor((400 * 10) / 7)}px for the image
//         </div>
//       </div>
//       <div className="pt-4">
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         >
//           Save code snippet
//         </button>
//       </div>
//     </main>

//   );
// }

// export default SnippetForm;

function CodeSnippet() {
  return <div></div>;
}

export default CodeSnippet;
