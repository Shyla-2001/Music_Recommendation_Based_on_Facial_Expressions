import Papa from 'papaparse';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Angry from '../../src/music/Angry.csv';
import Disgusted from '../../src/music/Disgusted.csv';
import Fearful from '../../src/music/Fearful.csv';
import Happy from '../../src/music/Happy.csv';
import Sad from '../../src/music/Sad.csv';
import Surprised from '../../src/music/Surprised.csv';
import Neutral from '../../src/music/Neutral.csv';
import ReactPlayer from 'react-player'
import Dropdown from './dropdown';
import DropdownEmotion from './dropdown_emotion';
import '../components/music.css';
import { FaLocationDot } from "react-icons/fa6";
import music from './musical-note.png'


function MusicPage(props) {
    const location = useLocation();
    const data = location.state;
    console.log('dfl')
    console.log(data.place)
    console.log('dfl')


    const [csvData, setCsvData] = useState([]);
    const [header, setHeader] = useState(null);
    const [languageColumnIndex, setLanguageColumnIndex] = useState(-1);
    const [languageFilter, setLanguageFilter] = useState(data.place);
    const [emotionFilter, setemotionFilter] = useState(data.emt || 'Neutral');

    const emotionCsvMap = {
        Angry,
        Happy,
        Surprised,
        Disgusted,
        Fearful,
        Sad,
        Neutral,
    };

    const papaConfig = {
        complete: (results, file) => {
            setHeader(results.data[0]);
            const languageIndex = results.data[0].indexOf('Language');
            setLanguageColumnIndex(languageIndex);
            const dataWithoutHeader = results.data.slice(1);
            setCsvData(dataWithoutHeader);
        },
        download: true,
        error: (error, file) => {
            console.log('Error while parsing:', error, file);
        },
    };


    useEffect(() => {
        console.log('emotionFilter')
        console.log(emotionFilter)
        console.log('emotionFilter')
        const selectedCsv = emotionCsvMap[emotionFilter];
        console.log('selectedCsv')
        console.log(selectedCsv)
        console.log('selectedCsv')
        Papa.parse(selectedCsv, papaConfig);
    }, [emotionFilter]);

    const handleLanguageSelect = (selectedLanguage) => {
        setLanguageFilter(selectedLanguage);
    };

    const handleEmotionSelect = (selectedEmtoion) => {
        console.log('Value recieved')
        console.log(selectedEmtoion)
        console.log('Value recieved')
        setemotionFilter(selectedEmtoion);
        console.log('emotion')
        console.log(emotionFilter)
        console.log('emotion')
    };

    // console.log(csvData);
    // useEffect(() => {
    //     console.log('emotion', emotionFilter);
    //     // Additional actions you want to perform after emotionFilter is updated
    // }, [emotionFilter]);

    return (
        <>
            <nav className='flex justify-between p-4'>

                <div className='loccontainer'>
                    <img className='logo' src={music}></img>
                    <div className='location'>
                        <FaLocationDot />
                        <h3>{data.loc}</h3>

                    </div>
                </div>

                {/* <h1> {emotionFilter}</h1> */}
                <DropdownEmotion onSelect={handleEmotionSelect} defaultEmotion={emotionFilter} />
                <Dropdown onSelect={handleLanguageSelect} defaultLang={data.place} />
            </nav>
            <div className='song-container'>
                <ul>
                    {csvData
                        .filter(row => languageFilter === null || (languageColumnIndex !== -1 && row[languageColumnIndex] === languageFilter))
                        .map((row, index) => (
                            <>

                                <li key={index}>
                                    <img className='preview' src={row[row.length - 1]}></img>
                                    <div className='audiobox'>
                                        <h1>{row[row.length - 5]}</h1>
                                        <ReactPlayer className="cat" url={row[row.length - 2]} controls config={{ file: { forceAudio: true } }} />
                                    </div>
                                </li>

                            </>
                        ))}
                </ul>
            </div>
        </>
    );
}

export default MusicPage;