import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./TransButton.css"


const TranselationButton = ({ onDirectionChange }) => {
  const [t, i18n] = useTranslation();
  const [dire, setDirection] = useState('ltr'); // Default to LTR
  


  

  const handleDirectionChange = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    if (typeof onDirectionChange === 'function') {
      onDirectionChange(newDirection); // Call the callback function
    }
  };
  

  return (
    <div>
      <button onClick={handleDirectionChange}>
        {i18n.language === 'en' ? 'AR' : 'EN'}
      </button>

    </div>
  );
};

export default TranselationButton;
