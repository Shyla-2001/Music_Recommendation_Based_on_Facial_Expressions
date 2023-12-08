import React, { useState } from 'react';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import list from '../languages.json';

function Dropdown({ onSelect, defaultLang }) {
    console.log('got it as lang')
    console.log(defaultLang)
    console.log('got it as lang')
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLang);



    return (
        <div className="relative flex flex-col items-center w-[200px] h-[120px] rounded-lg">
            <button
                onClick={() => {
                    setIsOpen((prev) => !prev);


                }}
                className='bg-black-400 p-2 w-full flex items-center justify-center font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'>
                {selectedLanguage} {!isOpen ? (<AiOutlineCaretDown className='h-8' />) : <AiOutlineCaretUp className='h-8' />}
            </button>
            {isOpen && (
                <div className='absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
                    {list.map((item, i) => (
                        <div
                            onClick={() => {
                                setSelectedLanguage(item.language)
                                setIsOpen(false);
                                onSelect(item.language);
                            }}
                            className='flex w-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-green border-l-4 ' key={i} >
                            <h3 className='font-bold'>{item.language}</h3>
                            <h3>{item.icon}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
