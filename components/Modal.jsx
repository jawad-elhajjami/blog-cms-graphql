import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {

    const modalRef = useRef();

    // Close modal when clicking outside of the modal
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center z-[99999]">
        {/* The overlay with blur effect */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm "></div>
        
        {/* The modal content */}
        <div 
          ref={modalRef}
          className="bg-white p-6 rounded-lg shadow-lg lg:max-w-lg max-w-sm w-full relative "
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <p className="text-4xl">&times;</p>
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  