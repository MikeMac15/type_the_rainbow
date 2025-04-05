
// Letter
export class ListNode<T> {
    public value: T;
    public next: ListNode<T> | null = null;
  
    constructor(value: T) {
      this.value = value;
    }
  }
// Word
export class Word<T> {
  public head: ListNode<T> | null = null;
  public tail: ListNode<T> | null = null;
  public length = 0;

  constructor(word?: string) {
    if (word) this.addWord(word);
  }

  public add(value: T) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      if (this.tail) this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  public addWord(value: string) {
    for (let ch of value) {
      this.add(ch as T);
    }
  }

  public toArray(): T[] {
    let result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  public toString(): string {
    return this.toArray().join('');
  }
}

// Sentence

export class Sentence<T> {
  public head: Word<T> | null = null;
  public tail: Word<T> | null = null;
  public next: Sentence<T> | null = null;

  constructor(words?: string[]) {
    if (words) {
      for (let word of words) {
        this.addWord(new Word<T>(word));
      }
    }
  }

  public addWord(word: Word<T>) {
    if (!this.head) {
      this.head = this.tail = word;
    } else {
      if (this.tail) (this.tail as any).next = word;
      this.tail = word;
    }
  }

  public toArray(): T[][] {
    const result: T[][] = [];
    let current = this.head;
    while (current) {
      result.push(current.toArray());
      current = (current as any).next;
    }
    return result;
  }

  public toStringArray(): string[] {
    const result: string[] = [];
    let current = this.head;
    while (current) {
      result.push(current.toString());
      current = (current as any).next;
    }
    return result;
  }

  public toString(): string {
    let result = '';
    let current = this.head;
  
    while (current) {
      result += current.toString() + ' ';
      current = (current as any).next;
    }
  
    return result.trim();
  }
  

}


// Story
export class StoryList<T> {
  public head: Sentence<T> | null = null;
  public tail: Sentence<T> | null = null;
  public length = 0;

  constructor(story?: string) {
    if (story) this.splitStory(story);
  }

  public addSentence(sentence: Sentence<T>) {
    if (!this.head) {
      this.head = this.tail = sentence;
    } else {
      if (this.tail) this.tail.next = sentence;
      this.tail = sentence;
    }
    this.length++;
  }


  public splitStory(story: string) {
    // Split by sentence enders with basic punctuation match
    const sentenceStrings = story.match(/[^.!?]+[.!?]?/g) || [];

    for (const sentenceText of sentenceStrings) {
      const words = sentenceText.trim().split(/\s+/);
      const sentence = new Sentence<T>(words);
      this.addSentence(sentence);
    }
  }


  public toArray(): string[] {
    let result: string[] = [];
    let current = this.head;
    while (current) {
      result.push(current.toArray().join(''));
      current = current.next;
    }
    return result;
  }

  public toString(): string {
    let result = '';
    let current = this.head;
  
    while (current) {
      result += current.toString() + ' ';

      current = current.next;
    }
  
    return result;
  }

  public toSentenceList(): Sentence<T>[] {
    const sentences: Sentence<T>[] = [];
    let current = this.head;
  
    while (current) {
      sentences.push(current);
      current = current.next;
    }
  
    return sentences;
  }
  
}