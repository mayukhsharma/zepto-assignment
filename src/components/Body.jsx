import React, { useState, useRef, useEffect } from 'react';
import '../index.css';

const Body = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef();

  const items = ['Mayukh Sharma', 'Jyoti Dwivedi', 'Bhumija Bharadwaj', 'Shruti Singh', 'Yash Singh', 'Nitish Garg'];

  useEffect(() => {
    setFilteredItems(items.filter(item => !chips.includes(item) && item.toLowerCase().includes(inputValue.toLowerCase())));
  }, [inputValue, chips]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setInputValue('');
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter(item => item !== chip));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      inputRef.current.blur();
      const lastChip = document.getElementById(chips[chips.length - 1]);
      lastChip.classList.add('highlighted');
    }
  };

  const handleChipClick = (event) => {
    const lastChip = document.getElementById(chips[chips.length - 1]);
    if (lastChip) {
      lastChip.classList.remove('highlighted');
    }
    inputRef.current.focus();
  };

  return (
    <div className="flex flex-col relative items-center">
      <div className="flex flex-wrap gap-2 w-1/3">
        {chips.map((chip, index) => (
          <div className="bg-gray-400 rounded-xl mt-5 bg-opacity-20 p-2 flex items-center cursor-pointer" key={index} id={chip} onClick={handleChipClick}>
            <img className='w-8 h-6 mr-2' src='https://www.svgrepo.com/show/105517/user-icon.svg' />
            {chip}
            <button className="border-none text-red-500 bg-transparent font-bold ml-2" onClick={() => handleChipRemove(chip)}>
              X
            </button>
          </div>
        ))}
      </div>
      <input
        className='shadow-inner p-5 mt-5 w-1/3 border-2 border-solid border-black'
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type a name to filter..."
      />
      <div className='absolute top-[100%] w-1/3 items-center bg-purple-100 bg-opacity-25 h-[300px] overflow-y-auto border-2 border-solid border-black shadow-2xl'>
        {filteredItems.map((item, index) => (
          <div key={index} className="p-4 cursor-pointer" onClick={() => handleItemClick(item)}>
            <div className='flex flex-row'>
            <img className='w-8 h-6 mr-8' src='https://www.svgrepo.com/show/105517/user-icon.svg' />
            {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
