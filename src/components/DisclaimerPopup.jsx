import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const DisclaimerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if we've already shown the popup in this session
    const hasSeenPopup = sessionStorage.getItem('disclaimerShown');
    
    if (!hasSeenPopup) {
      // Small delay for better UX on initial load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('disclaimerShown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Heads Up!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Welcome to my portfolio! Please note that some of the information shown on this page is currently a placeholder while the content is being finalized.
        </p>
        <button 
          onClick={handleClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          Understand
        </button>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
