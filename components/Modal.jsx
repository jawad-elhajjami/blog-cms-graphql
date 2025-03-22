const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        {/* The overlay with blur effect */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm"></div>
        
        {/* The modal content */}
        <div className="bg-white p-6 rounded-lg shadow-lg lg:max-w-lg max-w-sm w-full relative">
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
  