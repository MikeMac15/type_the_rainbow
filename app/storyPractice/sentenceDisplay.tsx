import type { Sentence, Word } from "logic/classes/StoryList";
import 'app/styles/sentenceDisplay.css'
import WordLetterBoxes from "../home/wordLetterBoxes";

export default function SentenceDisplay({sentence,currentWord, currentLetter}:{sentence:Sentence<string>, currentWord:Word<string> | null, currentLetter:string|null}) {
    const sentenceText = sentence.toStringArray();

    const FullSentenceText = () => {
        let currIdx = -1
        let beforeCurr: string[] = [];
        let afterCurr: string[] = [];
        if (currentWord){
            currIdx = sentenceText.findIndex(word => word === currentWord?.toString())
        }
        if (currIdx >= 0){
            beforeCurr = sentenceText.slice(0, currIdx);
            afterCurr = sentenceText.slice(currIdx + 1);
        }

        return (
            <div className="sentenceDisplay">
                    <p>
                        {beforeCurr.join(' ')}{" "}
                        <span className="current-word">{currentWord?.toString()}</span>{" "}
                        {afterCurr.join(' ')}
                    </p>
            </div>
        );
    }

    return (
        <div >
            <FullSentenceText />
            <WordLetterBoxes word={currentWord?.toString()} currentLetter={currentLetter!} />
        </div>
    )

}

