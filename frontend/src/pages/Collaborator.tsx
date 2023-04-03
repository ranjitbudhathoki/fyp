import { useEffect, useState } from 'react';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import HelpPost from '../components/collaborator/HelpPost';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Collaborator: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: any) => state.auth);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    //free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const { data } = useQuery({
    queryKey: ['help-posts'],
    queryFn: async () => {
      const response = await axios.get('/api/help-posts/');
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 5,
  });

  const createPostMutation = useMutation({
    mutationFn: async (data) => {
      await axios.post('/api/help-posts/', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['help-posts']);
      toast.success('post created');
    },
    onError: () => {
      toast.error('error creating post created');
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('selected file', selectedFile);
    const formData = new FormData(event.target);
    console.log('from data', formData.get('image'));
    const helpPost: any = {
      userId: user.id,
      title: formData.get('topic') ?? '',
      body: formData.get('description') ?? '',
      project_link: formData.get('link') ?? '',
      tech_stack: formData.get('tech') ?? '',
      image: selectedFile,
    };

    createPostMutation.mutate(helpPost);

    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderedPosts = (
    <div className="max-w-full h-screen ">
      {data?.data?.posts.map((post) => {
        return (
          <Link to={`/collaborator/posts/${post.id}`} key={post.id}>
            <HelpPost post={post} />
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="fixed bottom-4 right-12">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={toggleModal}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 z-50 ${
          showModal ? 'flex' : 'hidden'
        }`}
      >
        <div
          className="bg-gray-900 opacity-75 w-full h-full"
          onClick={() => setShowModal(false)}
        />
        <div className="fixed inset-y-0 right-0 w-1/3 bg-black shadow-lg p-3 h-[650px] overflow-y-scroll">
          <form onSubmit={handleSubmit}>
            <div className="px-4 py-5 m-0">
              <h2
                className="text-lg font-bold text-gray-200 text-center"
                id="modal-title"
              >
                Create a new post
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-400"
                >
                  Topic:
                </label>
                <div className="mt-1">
                  <textarea
                    rows={3}
                    name="topic"
                    id="topic"
                    className=" p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-700 border-gray-600 rounded-md text-gray-200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="blocktext-sm font-medium text-gray-400"
                >
                  Problem Description
                </label>
                <div className="mt-1">
                  <textarea
                    name="description"
                    id="description"
                    rows={8}
                    className="p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-gray-200"
                  ></textarea>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-400"
                >
                  Upload:
                </label>
                <div className="mt-1">
                  <input
                    onChange={onSelectFile}
                    type="file"
                    name="image"
                    id="image"
                    className="shadow-sm focus:ring-blue-500  focus:border-blue-500 block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-gray-200"
                  />
                  {selectedFile && <img src={preview} className="bg-cover" />}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="project_link"
                  className="block text-sm font-medium text-gray-400"
                >
                  Project Link
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="project_link"
                    id="link"
                    className=" p-2 shadow-sm focus:ring-blue-500 h-10 focus:border-blue-500 block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-gray-200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="tech_stack"
                  className="block text-sm font-medium text-gray-400"
                >
                  Tech Stack:
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tech_stack"
                    id="tech"
                    className=" p-2 shadow-sm focus:ring-blue-500 h-10 focus:border-blue-500 block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-gray-200"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-full h-screen ">{renderedPosts}</div>
    </>
  );
};

export default Collaborator;
