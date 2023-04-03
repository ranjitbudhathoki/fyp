// import moment from 'moment';
// import { useState } from 'react';
// import { RiSendPlaneFill } from 'react-icons/ri';
// import { useSelector } from 'react-redux';
// import CodeEditor from './CodeEditor';

// function MatchPost({ post }) {
//   const { user } = useSelector((state: any) => state.auth);

//   const formattedDate = moment(post.updatedAt).fromNow();

//   const [showModal, setShowModal] = useState(false);

//   // const handleSendSolutionClick = () => {
//   //   setShowModal(true);
//   // };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <>
//       <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 text-white ">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3.5">
//             <img
//               src={post.user.photoUrl}
//               alt={`${post.user.username}'s profile`}
//               className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
//             />
//             <div className="flex flex-col">
//               <p className="mb-2 capitalize text-sm">{post.user.username}</p>
//               <time dateTime="06-08-21" className="text-xs text-gray-400">
//                 {formattedDate}
//               </time>
//             </div>
//           </div>
//         </div>
//         <div className="mt-7 whitespace-pre-wrap text-lg">{post.body}</div>
//         <div className="mt-5 flex flex-wrap justify-center gap-2 border-b pb-4"></div>
//         <div className="flex justify-center mt-2">
//           <button
//             onClick={toggleModal}
//             type="button"
//             className="text-black font-bold bg-custom-light-green hover:bg-orange-400 f rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  "
//           >
//             Send Solution
//           </button>
//         </div>
//       </div>

//       <div
//         className={`fixed top-0 left-0 bottom-0 right-0 z-50 ${
//           showModal ? 'flex' : 'hidden'
//         }`}
//       >
//         <div
//           className="bg-gray-900 opacity-75 w-full h-full"
//           onClick={() => setShowModal(false)}
//         />
//         <div className="fixed inset-y-0 right-0 w-1/2 bg-black shadow-lg p-3 h-[650px] overflow-y-scroll">
//           <form>
//             <div className="px-4 py-5 m-0">
//               <h2
//                 className="text-lg font-bold text-gray-200 text-center"
//                 id="modal-title"
//               >
//                 Send Solution
//               </h2>
//             </div>
//             <CodeEditor postId={post.id} userId={post.userId} />
//             <div className="px-4 py-3 flex justify-center">
//               <button
//                 onClick={() => setShowModal(false)}
//                 type="button"
//                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
// export default MatchPost;

import moment from 'moment';
import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import Overlay from '../../Modals/Overlay';
import SendSolutionModal from '../../Modals/SendSolutionModal';
import Modal from '../../Modals/Modal';

function MatchPost({ post }) {
  const { user } = useSelector((state: any) => state.auth);

  const handleSubmit = () => {};

  const formattedDate = moment(post.updatedAt).fromNow();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 text-white ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.user.photoUrl}
              alt={`${post.user.username}'s profile`}
              className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
            />
            <div className="flex flex-col">
              <p className="mb-2 capitalize text-sm">{post.user.username}</p>
              <time dateTime="06-08-21" className="text-xs text-gray-400">
                {formattedDate}
              </time>
            </div>
          </div>
        </div>
        <div className="mt-7 whitespace-pre-wrap text-lg">{post.body}</div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 border-b pb-4"></div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="inline-flex justify-center  rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-light-green text-base w-12 font-medium text-black hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Send Solution
          </button>
        </div>
      </div>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Modal onClick={() => setIsOpen(false)}>
          <SendSolutionModal
            onSubmit={setIsOpen}
            postId={post.id}
            userId={post.userId}
          ></SendSolutionModal>
        </Modal>
      </Overlay>
    </>
  );
}
export default MatchPost;
