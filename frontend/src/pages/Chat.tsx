import React, { RefObject, useRef, useState } from 'react';
import {
  FaceSmileIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';

function Chat() {
  const emojiRef = useRef(null) as RefObject<HTMLDivElement>;
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleMessageSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message) return;
    setMessage('');
    setMessages([...messages, message]);
  };

  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setMessage(message + emojiObject.emoji);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="h-full flex rounded-md ">
      {/* <ChatList /> */}
      <div className="flex-grow flex flex-col  ">
        <div className="flex flex-col gap-2 flex-grow p-3 overflow-y-scroll h-96 ">
          {messages.map((mssg, index) => (
            <div
              className="flex text-base max-w-[300px] shadow-sm rounded-md odd:self-start even:self-end"
              key={index}
            >
              <p className="bg-[#333] p-2 rounded-2xl">{mssg}</p>
            </div>
          ))}
        </div>
        <div className="relative flex items-center gap-3 p-2 border-t-2 border-[#333]">
          <label className="flex items-center cursor-pointer">
            <input className="w-0 h-0" type="file" accept="image/*" />
            <PhotoIcon className="h-6 text-gray-400" />
          </label>

          <form
            id="submit-message"
            className="flex items-center flex-grow"
            onSubmit={handleMessageSubmit}
          >
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              className="py-2 pl-2 pr-10 border-2 border-[#27292a] bg-[#333] w-full  text-gray-300 focus:outline-none text-sm rounded-2xl"
            />
          </form>

          <div
            ref={emojiRef}
            className="absolute right-12 flex items-center justify-center rounded-lg cursor-pointer"
            onClick={() => setShowPicker(!showPicker)}
          >
            <FaceSmileIcon className="h-5 text-gray-400" />

            {showPicker && (
              <div
                onClick={(e) => e.preventDefault()}
                className="absolute bottom-16 right-12 text-base origin-bottom-right"
              >
                <EmojiPicker
                  width={300}
                  height={300}
                  theme={Theme.DARK}
                  searchDisabled={true}
                  skinTonesDisabled={true}
                  previewConfig={{
                    showPreview: false,
                  }}
                  lazyLoadEmojis={true}
                  emojiStyle={EmojiStyle.FACEBOOK}
                  autoFocusSearch={false}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            form="submit-message"
            className="flex items-center justify-center rounded-lg cursor-pointer"
          >
            <PaperAirplaneIcon className="h-5 text-gray-400 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
