import { useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import { toast } from 'react-toastify';

const CreateHelpPost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) return toast('Please Select an Image ');
    const formData = new FormData();
    formData.append(file.name, file);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('link', link);
    formData.append('tags', JSON.stringify(tags));
    console.log('selecteFile', selectedFile);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    if (!title || !tags) {
      toast.warning('Please Povide title and tags');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="h-[500px] w--[550px] overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 rounded-md text-white"
      >
        <label htmlFor="progress-title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Enter a  title..."
          className="bg-[#09090a] rounded text-base p-2"
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          rows={5}
          value={body}
          placeholder="Enter description..."
          className="bg-[#09090a] rounded text-base p-2"
          onChange={(event) => setBody(event.target.value)}
        />

        <label htmlFor="progress-title">Image:</label>
        <input
          id="title"
          type="file"
          accept="image/*"
          placeholder="Select an image..."
          className="bg-[#09090a] rounded text-base p-2"
          onChange={onSelectFile}
        />
        {preview && (
          <img src={preview} alt="Preview" style={{ width: '100%' }} />
        )}

        <label htmlFor="link">Project Link:</label>
        <input
          id="link"
          type="text"
          value={link}
          placeholder="Enter a progress title..."
          className="bg-[#09090a] rounded text-base p-2"
          onChange={(event) => setLink(event.target.value)}
        />
        <label htmlFor="link">Tags:</label>

        <div className="bg-black">
          <TagsInput
            classNames={{
              tag: 'bg-custom-light-green text-black rounded-md px-2 py-1 mr-2',
              input: 'bg-custom-light-dark text-white',
            }}
            value={tags}
            onChange={setTags}
            name="fruits"
            placeHolder="enter tags"
          />
        </div>
        <em>press enter to add new tag</em>

        <button
          type="submit"
          className="bg-custom-light-green px-4 text-black py-2 rounded-md text-base"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateHelpPost;
