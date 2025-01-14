'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import questData from './QuestID.json';
import nextId from './Ques.json'; // Ensure this path is correct

const RoadSignHunt = () => {
  const [gameState, setGameState] = useState('setup');
  const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [lastIndex, setLastIndex] = useState(-1);

  const validIds = questData.map((item) => item.id.toString());


  useEffect(() => {
    // Disable right-click
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);
  
    // Disable specific key combinations
    const disableKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || // Ctrl + Shift + I/J/C
        (e.ctrlKey && e.key === 'U') // Ctrl + U
      ) {
        e.preventDefault();
        alert("Inspect is disabled.");
      }
    };
    document.addEventListener('keydown', disableKeyDown);
  
    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeyDown);
    };
  }, []);
  



  useEffect(() => {
    if (userId.trim() && validIds.includes(userId)) {
      const foundQuestion = questData.find((q) => q.id === parseInt(userId));
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setErrorMessage('');
      } else {
        setErrorMessage('No question found for this ID.');
      }
    }
  }, [userId]);

  const secCode = () => {
    const data = nextId; // Imported JSON array
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * data.length);
    } while (newIndex === lastIndex);

    setLastIndex(newIndex); // Update last index
    setSecretCode(data[newIndex]); // Set secret code
  };

  const startJourney = () => {
    if (!userId.trim()) {
      setErrorMessage('Please enter your ID.');
      return;
    } else if (!validIds.includes(userId)) {
      setErrorMessage('Invalid ID. Please enter a valid ID.');
      return;
    }

    setErrorMessage('');
    setGameState('playing');
    secCode(); // Fetch and display a new random secret code
  };

  return (
    <div className={styles.container}>
      <div className={styles.roadBackground}>
        <div className={styles.roadSigns}>
          {Array(8)
            .fill()
            .map((_, i) => (
              <div key={i} className={styles.sign} />
            ))}
        </div>
      </div>

      <div className={styles.content}>
        {gameState === 'setup' && (
          <div className={styles.setup}>
            <div className={styles.header}>
              <h1 className={styles.title}>Road Sign Hunt</h1>
            </div>

            <div className={styles.instructions}>
              <h2 className={styles.instructionsTitle}>INSTRUCTIONS</h2>
              <ol className={styles.instructionsList}>
                <li>Hooray! You found QR codes around the area.</li>
                <li>Solve the riddle on each road sign.</li>
                <li>Once submitted, you can't go back.</li>
              </ol>
              <div className={styles.IDBox}>
                <input
                  type="text"
                  placeholder="Type your ID"
                  className={styles.IDInput}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
              <button onClick={startJourney} className={styles.startButton}>
                START JOURNEY
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && question && (
          <div className={styles.playing}>
            <div className={styles.question}>
              <div className={styles.questionBox}>
                <p className={styles.nextClue}>Next Clue</p>
                <p className={styles.quest}>{question.question}</p>
              </div>
            </div>
            <div className={styles.score}>
              <div>Secret Code</div>
              <span className={styles.secretCode}>{secretCode}</span>
            </div>
            <div className={styles.hexagonWrapper}>
              <div className={styles.GTNH}>Go to Next Hunt</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadSignHunt;
