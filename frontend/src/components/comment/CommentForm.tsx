import { useState } from 'react';

export function CommentForm({
  onSubmit,
  autoFocus = false,
  initialValue = '',
}) {
  const [message, setMessage] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('this is from the handle submit');
    if (!message) return alert('Missing Required Fields');
    onSubmit({ body: message });
  }

  return (
    <form
      id="submit-message"
      onSubmit={handleSubmit}
      className="flex items-center flex-grow"
    >
      <input
        type="text"
        value={message}
        autoFocus={autoFocus}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter a comment..."
        className="py-2 pl-2 pr-10 border-2  border-dark-gray w-full  text-black focus:outline-none text-sm rounded-2xl"
      />
    </form>
  );
}

export default CommentForm;

// import React, { useMemo } from 'react';
// import { CommentList } from './ProductCommentList';
// import { CommentForm } from './ProductCommentForm';
// import { useState } from 'react';
// import {
//   BackwardIcon,
//   ChatBubbleBottomCenterTextIcon,
//   FaceSmileIcon,
//   FlagIcon,
//   ForwardIcon,
//   HeartIcon,
//   PencilSquareIcon,
//   ShareIcon,
//   TrashIcon,
// } from '@heroicons/react/24/outline';
// import { Link, useParams } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';
// import Similarproduct from './Similarproduct';
// import { useAuth } from '../context/AuthContextProvider';
// import profile from '../Images/profile.png';

// const SingleProduct = ({
//   productName,
//   image,
//   price,
//   purpose,
//   condition,
//   description,
// }) => {
//   const queryClient = useQueryClient();
//   const [user] = useAuth();
//   const { productId } = useParams();
//   const singleProduct = useQuery(['single-product', productId], async () => {
//     const res = await axios.get(
//       `http://localhost:8000/products/${productId}/get-single-product`
//     );
//     return res;
//   });

//   const productsQuery = useQuery('products-query', async () => {
//     const res = await axios.get('http://localhost:8000/products/get-products');
//     return res;
//   });

//   const productsData = productsQuery.data?.data?.products || [];

//   const [activeTab, setActiveTab] = useState(1);

//   const handleClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };

//   const [messagemodal, setModal] = useState(false);

//   const messageModal = () => {
//     setModal(!messagemodal);
//   };

//   const [replymodal, setreplyModal] = useState(false);

//   const replyModal = () => {
//     setreplyModal(!replymodal);
//   };

//   const productComments = singleProduct?.data?.data?.product?.productComments;

//   const commentsByParentId = useMemo(() => {
//     const payload = {};
//     productComments?.forEach((comment) => {
//       payload[comment.parentId] ||= [];
//       payload[comment.parentId].push(comment);
//     });
//     return payload;
//   }, [productComments]);

//   function getReplies(parentId) {
//     return commentsByParentId[parentId];
//   }

//   const commentCreateMutation = useMutation(
//     async (data) => {
//       if (!user.id && !user.token) {
//         return alert('Please Login Firstj my bou');
//       }
//       const res = await axios.post(
//         `http://localhost:8000/products/create-product-comment/${user.id}/${productId}`,
//         data,
//         {
//           headers: {
//             authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       return res.data;
//     },
//     {
//       onError: (error) => {
//         console.log('error', error);
//       },
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(['single-product', productId]);
//       },
//     }
//   );
//   const createProductComment = (data) => {
//     commentCreateMutation.mutate(data);
//   };

//   console.log({ singleProduct });
//   console.log({ productComments });
//   let rootComments = commentsByParentId['null'];
//   console.log({ rootComments });
//   if (singleProduct.isLoading) return <h2>Loading...</h2>;

//   return (
//     <>
//       <div className="bg-gray-900 pt-2">
//         <div className="w-[95%] mx-auto">
//           <div className="lg:flex md:gap-0 gap-10 md:flex sm:grid-cols-1 mb-8">
//             <div className=" my-auto mx-auto w-[300px]">
//               <div className="p-1 overflow-hidden rounded-md">
//                 <img
//                   className="w-full h-[260px] sm:h-[270px] rounded-lg"
//                   src={singleProduct?.data?.data?.product?.image}
//                   alt={singleProduct?.data?.data?.product?.productName}
//                 />
//               </div>
//               {/* <div className="flex justify-center px-auto gap-4 mt-2 cursor-pointer">
//                 <div>
//                   <BackwardIcon className="w-16 h-6 bg-[#dfe4f1ad] text-slate-900 rounded-sm"></BackwardIcon>
//                 </div>
//                 <div>
//                   <ForwardIcon className="w-16 h-6 bg-[#dfe4f1ad] text-slate-900 rounded-sm"></ForwardIcon>
//                 </div>
//               </div> */}
//               <div>
//                 <div className="flex gap-2 justify-center mt-2">
//                   <div className="bg-slate-400 w-10 h-10 rounded-md cursor-pointer">
//                     <p className="text-center mt-2">1</p>
//                   </div>
//                   <div className="bg-slate-400 w-10 h-10 rounded-md cursor-pointer">
//                     <p className="text-center mt-2">2</p>
//                   </div>
//                   <div className="bg-slate-400 w-10 h-10 rounded-md cursor-pointer">
//                     <p className="text-center mt-2">3</p>
//                   </div>
//                   <div className="bg-slate-400 w-10 h-10 rounded-md cursor-pointer">
//                     <p className="text-center mt-2">4</p>
//                   </div>
//                   <div className="bg-slate-400 w-10 h-10 rounded-md cursor-pointer">
//                     <p className="text-center mt-2">5</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-base text-gray-400 mt-2 px-1 py-1">
//                 <div className="flex justify-between">
//                   <h2 className="font-semibold text-[22px] text-white">
//                     {singleProduct?.data?.data?.product?.productName}
//                   </h2>

//                   <div>
//                     <button
//                       className="peer ml-[120px] text-gray-400 dark:hover:bg-gray-700 rounded-lg"
//                       type="button"
//                     >
//                       <svg
//                         className="w-6 h-6"
//                         aria-hidden="true"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
//                       </svg>
//                     </button>
//                     <div className="hidden absolute mt-[-35px] text-white shadow-2xl shadow-black z-50 peer-hover:flex hover:flex flex-col bg-[#0e1131] rounded-md">
//                       <a
//                         className="px-5 py-3 hover:bg-[#131e39] rounded-md flex align-middle gap-3"
//                         href="#"
//                       >
//                         <ShareIcon className="w-4 h-auto"></ShareIcon>
//                         Share
//                       </a>
//                       <a
//                         className="px-5 py-3 hover:bg-[#131e39] rounded-md flex gap-3"
//                         href="#"
//                       >
//                         <FlagIcon className="w-4 h-auto"></FlagIcon>Report
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <Link
//                   to={`/userprofile/${singleProduct?.data?.data?.product?.userId}`}
//                   className="flex gap-2 justify-center"
//                 >
//                   <div className="w-11 h-11 my-auto rounded-full overflow-hidden shadow-sm shadow-slate-500">
//                     <img
//                       src={
//                         singleProduct?.data?.data?.product?.user?.photo ||
//                         profile
//                       }
//                       className="object-cover w-full h-full"
//                       alt="Logo"
//                     />
//                   </div>

//                   <div className="my-auto text-lg text-slate-300 flex gap-2">
//                     <p>{singleProduct?.data?.data?.product?.user?.firstName}</p>
//                     <p>{singleProduct?.data?.data?.product?.user?.lastName}</p>
//                   </div>
//                 </Link>
//                 <p className="border-[1px] border-t-0 my-3"></p>
//                 <div className="mt-2 grid grid-cols-2 justify-between gap-4 mx-3">
//                   <button className="h-10 bg-blue-700 px-2 text-white text-base font-semibold rounded hover:shadow hover:bg-blue-800">
//                     <Link
//                       to={`/userprofile/${singleProduct?.data?.data?.product?.userId}`}
//                     >
//                       View Profile
//                     </Link>
//                   </button>
//                   <button
//                     className="h-10 bg-blue-700 px-2 text-white text-base font-semibold rounded hover:shadow hover:bg-blue-800"
//                     onClick={messageModal}
//                   >
//                     Message
//                   </button>
//                   <div>
//                     {messagemodal &&
//                       (user ? (
//                         <div className="">
//                           <div className="flex flex-col items-center justify-center w-auto h-[380px] text-gray-800 fixed bottom-0 right-2 z-50">
//                             <div className="flex justify-start gap-3 border-[1px] border-x-0 w-full bg-gray-800 border-gray-500 rounded-t-lg px-2 py-[5px]">
//                               <div className="w-9 h-9 my-auto rounded-full overflow-hidden shadow-sm shadow-slate-500">
//                                 <img
//                                   src={
//                                     singleProduct?.data?.data?.product?.user
//                                       ?.photo || profile
//                                   }
//                                   className="object-cover w-full h-full"
//                                   alt="Logo"
//                                 />
//                               </div>
//                               <div className="my-auto text-white text-base">
//                                 {
//                                   singleProduct?.data?.data?.product?.user
//                                     ?.firstName
//                                 }
//                               </div>
//                               <button
//                                 onClick={() => messageModal(false)}
//                                 type="button"
//                                 className="absolute top-2 right-2 text-slate-300"
//                               >
//                                 <svg
//                                   aria-hidden="true"
//                                   className="w-7 h-7"
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     fill-rule="evenodd"
//                                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                     clip-rule="evenodd"
//                                   ></path>
//                                 </svg>
//                                 <span className="sr-only">Close modal</span>
//                               </button>
//                             </div>
//                             <div className="flex flex-col flex-grow w-[280px] max-w-xl bg-gray-800 shadow-xl overflow-hidden shadow-black">
//                               <div className="flex flex-col flex-grow px-4 overflow-auto overflow-y-scroll scrollbar-thin scrollbar-corner-gray-800 scrollbar-thumb-slate-600">
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs">
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                   <div>
//                                     <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet, consectetur
//                                         adipiscing elit.
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//                                   <div>
//                                     <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet, consectetur
//                                         adipiscing elit, sed do eiusmod.
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//                                   <div>
//                                     <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet.
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs">
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                   <div>
//                                     <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet, consectetur
//                                         adipiscing elit, sed do eiusmod tempor
//                                         incididunt ut labore et dolore magna
//                                         aliqua.{' '}
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//                                   <div>
//                                     <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet, consectetur
//                                         adipiscing elit, sed do eiusmod tempor
//                                         incididunt ut labore et dolore magna
//                                         aliqua.{' '}
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//                                   <div>
//                                     <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet, consectetur
//                                         adipiscing elit, sed do eiusmod tempor
//                                         incididunt.
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//                                   <div>
//                                     <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet.
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs">
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                   <div>
//                                     <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit amet, consectetur
//                                         adipiscing elit, sed do eiusmod tempor
//                                         incididunt ut labore et dolore magna
//                                         aliqua.{' '}
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//                                   <div>
//                                     <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                                       <p className="text-sm">
//                                         Lorem ipsum dolor sit.
//                                       </p>
//                                     </div>
//                                     <span className="text-xs text-gray-500 leading-none">
//                                       2 min ago
//                                     </span>
//                                   </div>
//                                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//                                 </div>
//                               </div>
//                               <div className="bg-gray-800 mx-3 my-2 flex justify-center gap-1">
//                                 <input
//                                   className="flex items-center h-9 w-full text-sm bg-gray-700 rounded-full px-3 text-slate-300 focus:outline-none"
//                                   type="text"
//                                   placeholder="Type your message…"
//                                 ></input>
//                                 <div className="w-9 h-9 my-auto bg-slate-700 flex p-[6px] rounded-full">
//                                   <svg viewBox="0 0 24 24" color="blue">
//                                     <path
//                                       d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,
//                                 20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,
//                                 14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,
//                                 10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,
//                                 3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,
//                                 11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
//                                     ></path>
//                                   </svg>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className=" inset-0 fixed z-50  bg-[#0000009c] ">
//                           <div className="flex h-screen justify-center items-center ">
//                             <div className="flex-col justify-center bg-gray-900 py-12 px-24 rounded-xl border-[1px] border-green-700">
//                               <div className="flex justify-center text-lg  text-gray-300 font-semibold  mb-10">
//                                 You Must Login to use this feature!!
//                               </div>
//                               <div className="flex justify-center">
//                                 <Link
//                                   to={'/loginform'}
//                                   className="hover:bg-green-500 rounded px-4 py-2 text-white  bg-green-600 "
//                                 >
//                                   Login
//                                 </Link>
//                                 <button
//                                   type="button"
//                                   className="hover:bg-blue-500 rounded px-4 py-2 ml-4 text-white bg-blue-600 "
//                                   onClick={() => messageModal(false)}
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//                 <p className="pt-2 text-justify">
//                   Note: We recommend you to physically inspect the product/
//                   Service before making payment. Beaware of fraud.
//                 </p>
//               </div>
//             </div>

//             <div className="mx-auto my-auto mt-[100px]">
//               <ul className="text-white flex justify-center sm:gap-28 md:gap-1 sm:px-12">
//                 <li className=" hover:border-b-2 px-4 border-slate-500">
//                   <a
//                     className={`tab-link ${activeTab === 1 ? 'active' : ''}`}
//                     onClick={() => handleClick(1)}
//                     href="#"
//                   >
//                     Description
//                   </a>
//                 </li>
//                 <li className=" hover:border-b-2 px-4 border-slate-500">
//                   <a
//                     className={`tab-link ${activeTab === 2 ? 'active' : ''}`}
//                     onClick={() => handleClick(2)}
//                     href="#"
//                   >
//                     Comments
//                   </a>
//                 </li>
//                 <li className=" hover:border-b-2 px-4 border-slate-500">
//                   <a
//                     className={`tab-link ${activeTab === 3 ? 'active' : ''}`}
//                     onClick={() => handleClick(3)}
//                     href="#"
//                   >
//                     Location
//                   </a>
//                 </li>
//               </ul>
//               <div className="p-1">
//                 {activeTab === 1 && (
//                   <div className="w-[340px] md:w-[400px] mx-auto sm:w-[600px]">
//                     <p className="text-slate-300 leading-[1.5] h-auto rounded-sm border-[1px] border-slate-600 border-x-0 pt-6 m-1 pb-1 text-justify overflow-y-scroll scrollbar-thumb-slate-800 scrollbar-thin">
//                       {singleProduct?.data?.data?.product?.description}
//                     </p>
//                     <h1 className="text-white py-4 text-xl">General</h1>
//                     <div className="">
//                       <ul className="grid grid-rows text-slate-400 px-2">
//                         <li className="flex px-7 justify-between border-[1px] border-t-0 border-x-0 py-1 border-slate-500">
//                           Purpose:
//                           <p>{singleProduct?.data?.data?.product?.purpose}</p>
//                         </li>
//                         <li className="flex px-6  justify-between border-[1px] border-t-0 border-x-0 py-1 border-slate-500">
//                           Condition:
//                           <p>{singleProduct?.data?.data?.product?.condition}</p>
//                         </li>
//                         <li className="flex px-6 justify-between border-[1px] border-t-0 border-x-0 py-1 border-slate-500">
//                           Posted Date:
//                           <p>Feb-8-2023</p>
//                         </li>
//                         <li className="flex px-6 justify-between border-[1px] border-t-0 border-x-0 py-1 border-slate-500">
//                           Delivery:
//                           <p>No</p>
//                         </li>
//                         <li className="flex px-6 justify-between border-[1px] border-t-0 border-x-0 py-1 border-slate-500">
//                           Products expire in:
//                           <p>11 Days</p>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === 2 && (
//                   <div>
//                     <div className="w-[340px] h-[250px] shadow-md shadow-slate-800 rounded-lg flex md:w-[400px] mx-auto sm:w-[600px] overflow-y-scroll scrollbar-thin scroll-smooth scrollbar-thumb-gray-800 px-2">
//                       <img
//                         className="w-11 h-11 rounded-full mr-4"
//                         src={
//                           singleProduct?.data?.data?.product?.user?.photo ||
//                           profile
//                         }
//                         alt={singleProduct?.data?.data?.product?.productName}
//                       ></img>
//                       <div className="w-full text-left">
//                         <div className="mb-2 mt-3 flex flex-col justify-between text-gray-600 sm:flex-row">
//                           <h3 className="font-medium">
//                             {
//                               singleProduct?.data?.data?.product?.user
//                                 ?.firstName
//                             }
//                           </h3>
//                           <time
//                             className="text-xs"
//                             datetime="2022-11-13T20:00Z"
//                           >
//                             July 18, 2022 at 10:36 AM
//                           </time>
//                         </div>
//                         <p className="text-sm text-slate-400">
//                           This is a Comment
//                         </p>
//                         <div className="flex gap-4 text-slate-600">
//                           <a
//                             title="Likes"
//                             href="#"
//                             className="group flex cursor-pointer items-center gap-1 my-auto"
//                           >
//                             <HeartIcon className="w-[18px] h-[18px]"></HeartIcon>
//                             12
//                           </a>
//                           <button
//                             className="cursor-pointer border py-1 px-2 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg border-slate-700"
//                             onClick={replyModal}
//                           >
//                             Reply
//                           </button>
//                           <div>
//                             <button
//                               className="peer text-gray-400 dark:hover:bg-gray-700 align-middle rounded-lg"
//                               type="button"
//                             >
//                               <svg
//                                 className="w-4 h-4"
//                                 aria-hidden="true"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
//                               </svg>
//                             </button>
//                             <div className="hidden text-white m-[-3px] ml-[1px] absolute shadow-2xl shadow-black z-50 peer-hover:flex hover:flex w-auto flex-row bg-[#131e39] rounded-md">
//                               <a
//                                 className="text-sm text-slate-400 px-2  py-1 hover:text-green-500 rounded-md flex align-middle gap-1"
//                                 href="#"
//                               >
//                                 <PencilSquareIcon className="w-[12px] h-[12px] my-auto"></PencilSquareIcon>
//                                 Edit
//                               </a>
//                               <a
//                                 className="text-sm text-slate-400 px-2  py-1 hover:text-red-500 rounded-md flex align-middle gap-1"
//                                 href="#"
//                               >
//                                 <TrashIcon className="w-[12px] h-[12px] my-auto"></TrashIcon>
//                                 Delete
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="mx-auto flex max-w-screen-sm rounded-xl text-left text-gray-600 shadow-lg mt-2">
//                           <img
//                             className="w-8 h-8 rounded-full mr-4"
//                             src={
//                               singleProduct?.data?.data?.product?.user?.photo ||
//                               profile
//                             }
//                             alt={
//                               singleProduct?.data?.data?.product?.productName
//                             }
//                           ></img>
//                           <div className="w-full text-left">
//                             <div className="mb-2 mt-1 text-xs flex flex-col justify-between text-gray-600 sm:flex-row">
//                               <h3 className="">
//                                 {
//                                   singleProduct?.data?.data?.product?.user
//                                     ?.firstName
//                                 }
//                               </h3>
//                               <time
//                                 className="text-xs"
//                                 datetime="2022-11-13T20:00Z"
//                               >
//                                 July 18, 2022 at 10:36 AM
//                               </time>
//                             </div>
//                             <p className="text-sm text-slate-400">
//                               This is a Reply.
//                             </p>
//                             <div className="flex gap-4">
//                               <a
//                                 title="Likes"
//                                 href="#"
//                                 className="group flex cursor-pointer items-center gap-1 my-auto text-sm"
//                               >
//                                 <HeartIcon className="w-[15px] h-[15px]"></HeartIcon>
//                                 12
//                               </a>
//                               <button
//                                 className="cursor-pointer border py-[2px] px-[5px] text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg border-slate-700"
//                                 onClick={replyModal}
//                               >
//                                 Reply
//                               </button>

//                               <div>
//                                 <button
//                                   className="peer text-gray-400 dark:hover:bg-gray-700 align-middle rounded-lg"
//                                   type="button"
//                                 >
//                                   <svg
//                                     className="w-4 h-4"
//                                     aria-hidden="true"
//                                     fill="currentColor"
//                                     viewBox="0 0 20 20"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
//                                   </svg>
//                                 </button>
//                                 <div className="hidden text-white m-[-3px] ml-[0px] absolute shadow-2xl shadow-black z-50 peer-hover:flex hover:flex w-auto flex-row bg-[#131e39] rounded-md">
//                                   <a
//                                     className="text-sm text-slate-400 px-2  py-1 hover:text-green-500 rounded-md flex align-middle gap-1"
//                                     href="#"
//                                   >
//                                     <PencilSquareIcon className="w-[12px] h-[12px] my-auto"></PencilSquareIcon>
//                                     Edit
//                                   </a>
//                                   <a
//                                     className="text-sm text-slate-400 px-2  py-1 hover:text-red-500 rounded-md flex align-middle gap-1"
//                                     href="#"
//                                   >
//                                     <TrashIcon className="w-[12px] h-[12px] my-auto"></TrashIcon>
//                                     Delete
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div>
//                           {replymodal &&
//                             (user ? (
//                               <div className="relative left-[-15px] flex justify-center my-2">
//                                 <img
//                                   className="w-7 h-7 rounded-full mr-4"
//                                   src={user?.photo || profile}
//                                   alt={user?.firstName}
//                                 ></img>
//                                 <div className="flex text-xs bg-slate-600 w-[75%] rounded-xl my-auto focus:outline-none border-0">
//                                   <input
//                                     className="bg-transparent focus:outline-none w-full placeholder:text-slate-300 px-2 text-slate-200 placeholder:text-xs"
//                                     placeholder="Write a Comment......"
//                                   ></input>

//                                   <FaceSmileIcon className="w-7 h-7 text-slate-400 pr-2"></FaceSmileIcon>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className=" inset-0 fixed z-50  bg-[#0000009c] ">
//                                 <div className="flex h-screen justify-center items-center ">
//                                   <div className="flex-col justify-center bg-gray-900 py-12 px-24 rounded-xl border-[1px] border-green-700">
//                                     <div className="flex justify-center text-lg  text-gray-300 font-semibold  mb-10">
//                                       You Must Login to use this feature!!
//                                     </div>
//                                     <div className="flex justify-center">
//                                       <Link
//                                         to={'/loginform'}
//                                         className="hover:bg-green-500 rounded px-4 py-2 text-white  bg-green-600 "
//                                       >
//                                         Login
//                                       </Link>
//                                       <button
//                                         type="button"
//                                         className="hover:bg-blue-500 rounded px-4 py-2 ml-4 text-white bg-blue-600 "
//                                         onClick={() => replyModal(false)}
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                         </div>{' '}
//                         <h1>This is the real thing ok </h1>
//                         <div className=" mt-8 ml-[-60px]">
//                           <h2 className="text-2xl text-gray-400">Comments:</h2>
//                           {rootComments != null && rootComments.length > 0 && (
//                             <div className="mt-2 flex flex-col gap-4">
//                               <CommentList
//                                 getReplies={getReplies}
//                                 comments={rootComments}
//                               />
//                             </div>
//                           )}
//                           <CommentForm
//                             autoFocus
//                             onSubmit={createProductComment}
//                           />
//                         </div>
//                         {/* <div className="p-4 mr-16 text-slate-400">
//                           <ChatBubbleBottomCenterTextIcon className="h-20 w-20 mx-auto"></ChatBubbleBottomCenterTextIcon>
//                           <h1 className="text-center">
//                             No Comments till Now Be the first one to comment
//                           </h1>
//                         </div> */}
//                       </div>
//                     </div>
//                     <div className="flex justify-center my-2">
//                       <img
//                         className="w-8 h-8 rounded-full mr-4"
//                         src={user?.photo || profile}
//                         alt={singleProduct?.data?.data?.product?.productName}
//                       ></img>
//                       <div className="flex bg-slate-600 w-[75%] rounded-xl my-auto focus:outline-none border-0">
//                         <input
//                           className="bg-transparent focus:outline-none w-full placeholder:text-slate-300 px-2 text-slate-200"
//                           placeholder="Write a Comment......"
//                         ></input>

//                         <FaceSmileIcon className="w-9 h-9 text-slate-400 pr-2"></FaceSmileIcon>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === 3 && <div>This is the content for tab 3.</div>}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mx-auto">
//           <h1 className="text-white text-center text-[24px] font-bold border-2 border-slate-400 border-x-0">
//             Similar Products You May Like
//           </h1>
//           <div className="w-[80%] mx-auto">
//             <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-responsive sm:grid-cols-2 bg-gray-900 gap-8 pt-2 pb-4">
//               {productsData.map(
//                 ({ id, productName, price, image, description, purpose }) => (
//                   <Similarproduct
//                     key={id}
//                     productName={productName}
//                     img={image}
//                     price={price}
//                     purpose={purpose}
//                     description={description}
//                   />
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleProduct;
