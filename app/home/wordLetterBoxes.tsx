import { keyData, getFingerColor } from "logic/LetterGroups";
import 'app/styles/wordLetterBoxes.css';

type Props = {
  word?: string;
  currentLetter?: string;
  shake?: boolean;
  correct?: boolean;
};

export default function WordLetterBoxes({ word, currentLetter, shake, correct }: Props) {
  if (!word) return null;

  return (
    <div className={`word-container ${shake ? 'shake' : ''} ${correct ? 'correct' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: "8px" }}>
        {[...word].map((letter, i) => {
          const lowerLetter = letter.toLowerCase();
          const keyInfo = keyData[lowerLetter];

          if (!keyInfo) {
            return (
              <div className="letter-box default" key={i}>
                <h1>{letter}</h1>
              </div>
            );
          }

          const bgColor = getFingerColor(keyInfo.finger, keyInfo.row);
          const gradient =
            keyInfo.hand === 'l'
              ? `linear-gradient(to right, ${bgColor}, ${bgColor}, rgb(232, 232, 232))`
              : `linear-gradient(to left, ${bgColor}, ${bgColor}, rgb(232, 232, 232))`;

              return (
                <div key={i}
                  style={{ margin: currentLetter === letter ? '0 6px' : '0 1px',transition: 'transform 0.3s ease', }}
                >
                  <div
                    className="letter-div"
                    style={{
                      transform: currentLetter === letter ? 'scale(1.4)' : '',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <div
                      className="letter-box"
                      style={{
                        background: gradient,
                        color: 'black',
                        borderWidth: 0,
                        fontWeight: currentLetter === letter ? 'bold' : 'normal',
                      }}
                    >
                      <h1>{letter}</h1>
                    </div>
                  </div>
                </div>
              );
        })}
      </div>
    </div>
  );
}
