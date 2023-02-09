import React, { useState } from 'react';

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="bg-gray-700 text-white py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full">
            <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-sm leading-5">
                <button
                  className="text-gray-400 hover:text-white hover:bg-gray-700 py-2 px-4 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <div
              className="px-4 py-5 sm:p-6 overflow-auto"
              style={{ maxHeight: '60vh' }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
