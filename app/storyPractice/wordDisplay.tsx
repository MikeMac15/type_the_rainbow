import { useTypingStory } from "logic/typingStory";
import { useState } from "react";
import 'app/styles/wordDisplay.css';
import WordLetterBoxes from "../home/wordLetterBoxes";
import GameSettingsMenu from "./gameSettingsMenu";
import SentenceDisplay from "./sentenceDisplay";
import FullStoryDisplay from "./fullStoryList";

const story1 = 'It was a dim day fogs hid the sun a boy Max got his red cap let me go he said out he ran his dog Pip was by him they ran to old hut see it Max said Pip did bark a cat sat on top hop Max said the cat did hop Pip ran Max ran then sun fogs had fled all was fun';
const story2 = `The wind howled through the trees.
Max zipped up his tent, hoping it would hold.
Raindrops tapped like fingers on the canvas above him.
Pip, his small dog, curled up close, trembling.
A flash of lightning lit up the forest, followed by a deep rumble.
"It's just a storm," Max whispered.
He reached for his flashlight and clicked it on.
The light flickered once, then stayed steady.
Max smiled. "We're okay, Pip. Just us, the rain, and the night."
Outside, the storm rolled on.`
export default function WordDisplay() {
  const [input, setInput] = useState('');
  const [resetOnFail, setResetOnFail] = useState(true);
  const [showSentence, setShowSentence] = useState(false);

  const {
    story,
    currentLetter,
    currentWord,
    nextWord,
    prevWord,
    currentSentence,
    typedLetters,
    wasWrongLetter,
    wasCorrectWord,
    isCompleted,
    typeLetter,
  } = useTypingStory(story2, resetOnFail, showSentence);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    setInput(value);

    if (lastChar) {
      typeLetter(lastChar);
        setInput('');
    }
  };
  

  return (
    <div>
      {/* <h2>Type this word:</h2> */}
      <div>
        {showSentence ? (
          currentSentence && <SentenceDisplay sentence={currentSentence} currentWord={currentWord ? currentWord : null} currentLetter={currentLetter} />
        ) : (<>
          {/* <h5 className="prevWord">{prevWord?.toString()}</h5> */}
          <WordLetterBoxes word={currentWord?.toString()} currentLetter={currentLetter!} shake={wasWrongLetter} correct={wasCorrectWord}/>
          {/* <h5 className="nextWord">{nextWord?.toString()}</h5> */}
        </>
        )}



      </div>
      {/* <p>{typedLetters.join('')}</p> */}
      {isCompleted && <p>🎉 Story complete!</p>}
      <input
        className="text-input"
        value={input}
        onChange={handleInput}
        disabled={isCompleted}
        placeholder="Type here"
      />
      <GameSettingsMenu
        resetOnFail={resetOnFail}
        setResetOnFail={setResetOnFail}
        showSentence={showSentence}
        setShowSentence={setShowSentence}
      />
      {/* <h6>{resetOnFail ? 'true' : 'false'}</h6> */}
      {/* <button onClick={resetWord}>Reset word</button> */}
      <div>
        <FullStoryDisplay sentences={story.toSentenceList()} currentSentence={currentSentence} currentWord={currentWord} wasWrongLetter={wasWrongLetter}/>
      </div>
    </div>
  );
}
