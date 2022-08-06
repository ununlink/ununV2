import React, { useState } from 'react';

export default function DarkButton() {

  const [isClicked, setIsClicked] = useState(false)

  function myFunction() {
  
    let element = document.body;
    // let element2 = document.getElementById('darks')

    element.classList.toggle("dark");
    // element2.classList.toggle("dark");

    setIsClicked(isClicked => !isClicked);
  }

  return (
  <>
    <button className="dark-mode-btn" onClick={myFunction}>{isClicked ? "☾" : "☼"}</button>
  </>
  );
}