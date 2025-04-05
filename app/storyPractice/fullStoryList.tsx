import { Sentence, Word } from 'logic/classes/StoryList';
import 'app/styles/fullStoryDisplay.css';
import type { JSX } from 'react';

type Props = {
  sentences: Sentence<string>[];
  currentSentence: Sentence<string> | null;
  currentWord: Word<string> | null;
  wasWrongLetter: boolean;
};
export default function FullStoryDisplay({ sentences, currentSentence, currentWord, wasWrongLetter }: Props) {
    return (
      <div className="full-story-display">
        {sentences.map((sentence, index) => {
          const isActive = sentence === currentSentence;
  
          let words: JSX.Element[] = [];
          let current = sentence.head;
          let i = 0;
  
          while (current) {
            const isCurrentWord = current === currentWord;
  
            words.push(
              <span
                key={i}
                className={`word-span ${isCurrentWord ? 'current-word' : ''} ${
                  isCurrentWord && wasWrongLetter ? 'wrong-word' : ''
                }`}
              >
                {current.toString()}
              </span>
            );
  
            current = (current as any).next;
            i++;
          }
  
          return (
            <p key={index} className={`sentence ${isActive ? 'active' : ''}`}>
              {words}
            </p>
          );
        })}
      </div>
    );
  }
  