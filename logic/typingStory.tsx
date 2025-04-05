import { useReducer, useEffect } from 'react';
import { ListNode, Sentence, StoryList, Word } from './classes/StoryList';



type TypingState = {
  currentSentenceNode: Sentence<string> | null;
  currentWordNode: Word<string> | null;
  prevWordNode: Word<string> | null;
  nextWordNode: Word<string> | null;
  currentLetterNode: ListNode<string> | null;
  story: StoryList<string>;
  typedLetters: string[];
  wasWrongLetter: boolean;
  wasCorrectWord: boolean;
  isCompleted: boolean;
  resetOnFail: boolean;
  showSentence: boolean;
};

type TypingAction =
  | { type: 'INIT'; story: StoryList<string>; resetOnFail: boolean; showSentence: boolean }
  | { type: 'TYPE_LETTER'; letter: string }
  | { type: 'RESET_WORD' }
  | { type: 'CLEAR_FLAGS' }
  | { type: 'UPDATE_GAME_SETTINGS'; resetOnFail?: boolean; showSentence?: boolean };

function typingReducer(state: TypingState, action: TypingAction): TypingState {
  switch (action.type) {
    case 'INIT': {
      const sentence = action.story.head;
      const word = sentence?.head ?? null;
      const letter = word?.head ?? null;

      return {
        story: action.story,
        currentSentenceNode: sentence,
        currentWordNode: word,
        nextWordNode: null,
        prevWordNode: null,
        currentLetterNode: letter,
        typedLetters: [],
        wasWrongLetter: false,
        wasCorrectWord: false,
        isCompleted: false,
        resetOnFail: action.resetOnFail,
        showSentence: action.showSentence,
      };
    }
    case 'CLEAR_FLAGS':
      return {
        ...state,
        wasWrongLetter: false,
        wasCorrectWord: false,
      };


    case 'TYPE_LETTER': {
      if (!state.currentLetterNode || state.isCompleted) return state;

      const expected = state.currentLetterNode.value;
      const typed = action.letter;
    
      console.log('Typed:', typed, '| Expected:', expected);
    
      const isCorrect = typed === expected;

      if (!isCorrect) {
        return state.resetOnFail
          ? {
            ...state,
            currentLetterNode: state.currentWordNode?.head ?? null,
            typedLetters: [],
            wasWrongLetter: true, // Set flag
          }
          : {
            ...state,
            wasWrongLetter: true, // Set flag
          };
      }

      const nextLetter = state.currentLetterNode.next;
      if (nextLetter) {
        return {
          ...state,
          currentLetterNode: nextLetter,
          typedLetters: [...state.typedLetters, action.letter],
        };
      }


      if (!nextLetter) {
  const nextWord = (state.currentWordNode as any).next as Word<string> | null;
  const nextSentence = state.currentSentenceNode?.next ?? null;

  if (nextWord) {
    return {
      ...state,
      currentWordNode: nextWord,
      nextWordNode: nextSentence?.head as Word<string> | null,
      currentLetterNode: nextWord.head,
      typedLetters: [],
      wasCorrectWord: true, // ✅ New
    };
  }


  if (nextSentence) {
    return {
      ...state,
      currentSentenceNode: nextSentence,
      currentWordNode: nextSentence.head,
      currentLetterNode: nextSentence.head?.head ?? null,
      typedLetters: [],
      wasCorrectWord: true,
    };
  }

  return {
    ...state,
    currentWordNode: null,
    currentLetterNode: null,
    currentSentenceNode: null,
    typedLetters: [],
    isCompleted: true,
    wasCorrectWord: true,
  };
}
    }

    case 'RESET_WORD':
      return {
        ...state,
        currentLetterNode: state.currentWordNode?.head ?? null,
        typedLetters: [],
      };

    case 'UPDATE_GAME_SETTINGS':
      return {
        ...state,
        resetOnFail: action.resetOnFail ?? state.resetOnFail,
        showSentence: action.showSentence ?? state.showSentence,
      };

    default:
      return state;
  }
}
export function useTypingStory(
  storyText: string,
  resetOnFail: boolean = true,
  showSentence: boolean = false
) {
  const [state, dispatch] = useReducer(typingReducer, {
    story: new StoryList<string>(),
    currentSentenceNode: null,
    currentWordNode: null,
    prevWordNode: null,
    nextWordNode: null,
    currentLetterNode: null,
    typedLetters: [],
    wasWrongLetter: false,
    wasCorrectWord: false,
    isCompleted: false,
    resetOnFail,
    showSentence,
  });

  useEffect(() => {
    const story = new StoryList<string>();
    story.splitStory(storyText);
    dispatch({ type: 'INIT', story, resetOnFail, showSentence });
  }, [storyText]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_GAME_SETTINGS', resetOnFail, showSentence });
  }, [resetOnFail, showSentence]);

  useEffect(() => {
    if (state.wasWrongLetter || state.wasCorrectWord) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_FLAGS' });
      }, 400); // animation
  
      return () => clearTimeout(timer);
    }
  }, [state.wasWrongLetter, state.wasCorrectWord]);
  
  const typeLetter = (letter: string) => dispatch({ type: 'TYPE_LETTER', letter });
  const resetWord = () => dispatch({ type: 'RESET_WORD' });

  const getCurrentSentenceText = () => {
    return state.currentSentenceNode?.toArray().join(' ') ?? '';
  };

  const getCurrentWordText = () => {
    return state.currentWordNode?.toArray().join('') ?? '';
  };

  return {
    story: state.story,
    currentLetter: state.currentLetterNode?.value ?? null,
    currentWord: state.currentWordNode,
    nextWord: state.currentWordNode,
    prevWord: state.prevWordNode,
    currentSentence: state.currentSentenceNode,
    typedLetters: state.typedLetters,
    wasWrongLetter: state.wasWrongLetter,
    wasCorrectWord: state.wasCorrectWord,
    isCompleted: state.isCompleted,
    showSentence: state.showSentence,
    typeLetter,
    resetWord,
  };
}