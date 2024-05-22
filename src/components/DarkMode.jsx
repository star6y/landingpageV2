import React, { useEffect, useState } from 'react';
// import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { IoSunnyOutline , IoMoon } from 'react-icons/io5';
import '../static/css/nav.css';


const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false)


  useEffect(() => {
    const userPreference = localStorage.getItem('dark-mode');
    if (userPreference === 'enabled') {
      setIsDark(true);
      document.body.classList.add('dark')
    } else {
      setIsDark(false);
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    }
  }, [isDark])

  function toggle () {
    setIsDark(!isDark)

  }

  return (
    // <Toggle
    //   checked={isDark}
    //   onChange={({ target}) => setIsDark(target.checked)}
    //   icons = {{ checked: "🌙", unchecked: "🔆"}}
    //   aria-label="Dark mode toggle"
    // /> 
    <div onClick={toggle} className="dark-mode-toggle">
      {isDark ? (
        <IoMoon   size={24} />
      ) : (
        <IoSunnyOutline size={24} />
      )}
      
    </div>

  )
}


export default DarkModeToggle;