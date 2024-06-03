import React, { useEffect, useState } from 'react';
import 'react-toggle/style.css';
import { IoSunnyOutline, IoMoon } from 'react-icons/io5';
import '../static/css/nav.css';


const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check local storage for dark mode preference on initial load
    const userPreference = localStorage.getItem('dark-mode');
    return userPreference === 'true';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'false');
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  return (
    <div onClick={toggle} className="dark-mode-toggle">
      {isDark ? (
        <IoMoon size={24} />
      ) : (
        <IoSunnyOutline size={24} />
      )}
      
    </div>

  );
};


export default DarkModeToggle;