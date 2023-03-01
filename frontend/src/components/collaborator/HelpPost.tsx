import moment from 'moment';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function HelpPost({ post }) {
  const { user } = useSelector((state: any) => state.auth);

  const formattedDate = moment(post.updatedAt).fromNow();
  return (
    <>
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 bg-gray-900  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.user.photoUrl}
              alt={`${post.user.username}'s profile`}
              className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
            />
            <div className="flex flex-col">
              <b className="mb-2 capitalize">{post.user.username}</b>
              <time dateTime="06-08-21" className="text-xs text-gray-400">
                {formattedDate}
              </time>
            </div>
          </div>
          <div className="flex h-3.5 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="34px"
              fill="#92929D"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
        </div>
        <div className="mt-7 whitespace-pre-wrap">{post.body}</div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 border-b pb-4"></div>
        <div className="flex h-12 items-center justify-around border-b ">
          <div className="flex items-center gap-3">
            <svg
              width="20px"
              height="19px"
              viewBox="0 0 20 19"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="?-Social-Media"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Square_Timeline"
                  transform="translate(-312.000000, -746.000000)"
                >
                  <g id="Post-1" transform="translate(280.000000, 227.000000)">
                    <g
                      id="Post-Action"
                      transform="translate(0.000000, 495.000000)"
                    >
                      <g
                        transform="translate(30.000000, 21.000000)"
                        id="Comment"
                      >
                        <g>
                          <g id="ic_comment-Component/icon/ic_comment">
                            <g id="Comments">
                              <polygon
                                id="Path"
                                points="0 0 24 0 24 25 0 25"
                              ></polygon>
                              <g
                                id="iconspace_Chat-3_25px"
                                transform="translate(2.000000, 3.000000)"
                                fill="#92929D"
                              >
                                <path
                                  d="M10.5139395,15.2840977 L6.06545155,18.6848361 C5.05870104,19.4544672 3.61004168,18.735539 3.60795568,17.4701239 L3.60413773,15.1540669 C1.53288019,14.6559967 0,12.7858138 0,10.5640427 L0,4.72005508 C0,2.11409332 2.10603901,0 4.70588235,0 L15.2941176,0 C17.893961,0 20,2.11409332 20,4.72005508 L20,10.5640427 C20,13.1700044 17.893961,15.2840977 15.2941176,15.2840977 L10.5139395,15.2840977 Z M5.60638935,16.5183044 L9.56815664,13.4896497 C9.74255213,13.3563295 9.955971,13.2840977 10.1754888,13.2840977 L15.2941176,13.2840977 C16.7876789,13.2840977 18,12.0671403 18,10.5640427 L18,4.72005508 C18,3.21695746 16.7876789,2 15.2941176,2 L4.70588235,2 C3.21232108,2 2,3.21695746 2,4.72005508 L2,10.5640427 C2,12.0388485 3.1690612,13.2429664 4.6301335,13.28306 C5.17089106,13.297899 5.60180952,13.7400748 5.60270128,14.2810352 L5.60638935,16.5183044 Z"
                                  id="Path"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div className="text-sm">10 Comments</div>
          </div>
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm">5 Likes</div>
          </div>
        </div>
        <div className=" h-10 p-8 flex items-center gap-2 justify-between">
          <img
            src={user.photoUrl}
            className="h-8 w-8 rounded-full border bg-yellow-500 object-cover "
            alt={`${user.username}'s profile`}
          />
          <div className="flex h-10 w-11/12 items-center bg-black text-black justify-between overflow-hidden rounded-2xl border ">
            <input
              type="text"
              className="h-full w-full outline-none p-4"
              placeholder=""
              name="comment"
            />
          </div>
          <div>
            <RiSendPlaneFill size={20} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpPost;
