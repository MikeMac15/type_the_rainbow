const indexFinger = new Set(['r','t','y','u','f','g','h','j','v','b','n','m']);
const middleFinger = new Set(['e','i','d','k','c']);
const ringFinger = new Set(['w','s','x','o','l']);
const pinkieFinger = new Set(['q','a','z','p']);

export default function whichFinger(letter:string){
    if (indexFinger.has(letter)) return 'index';
    if (middleFinger.has(letter)) return 'middle';
    if (ringFinger.has(letter)) return 'ring';
    if (pinkieFinger.has(letter)) return 'pinkie';
}


type Hand = 'l' | 'r';
type Finger = 't' | 'i' | 'i2' | 'm' | 'r' | 'p' | 'p2'; //thumb / medial index / distal index / middle / ring / pinky
type Row = 't' | 'h' | 'b' // top / home / bottom

type LetterData = {
  finger: Finger;
  hand: Hand;
  row: Row;
};


export function getFingerColor(finger: Finger, row: Row): string {
    const rowOpacityMap: Record<Row, number> = {
      t: 1,  // Top row = darkest
      h: 0.6, // Home row = medium
      b: 0.4,  // Bottom row = lightest
    };
  
    const opacity = rowOpacityMap[row];
  
    const colorMap: Record<Finger, string> = {
      t: `rgba(255, 216, 61, ${opacity})`,   // 
      i: `rgba(240, 46, 28, ${opacity})`,    // 
      i2: `rgba(212, 138, 28, ${opacity})`,  // 
      m: `rgba(212, 200, 28, ${opacity})`,   // 
      r: `rgba(87, 143, 24, ${opacity})`,    // 
      p: `rgba(2, 204, 181, ${opacity})`,   // 
      p2: `rgba(2, 204, 181, ${opacity})`,   // 
    };
  
    return colorMap[finger];
  }

  export const keyData: Record<string, LetterData> = {
    a: { finger: 'p', hand: 'l', row: 'h' },
    b: { finger: 'i', hand: 'l', row: 'b' },
    c: { finger: 'm', hand: 'l', row: 'b' },
    d: { finger: 'm', hand: 'l', row: 'h' },
    e: { finger: 'm', hand: 'l', row: 't' },
    f: { finger: 'i2', hand: 'l', row: 'h' },
    g: { finger: 'i', hand: 'l', row: 'h' },
    h: { finger: 'i', hand: 'r', row: 'h' },
    i: { finger: 'm', hand: 'r', row: 't' },
    j: { finger: 'i2', hand: 'r', row: 'h' },
    k: { finger: 'm', hand: 'r', row: 'h' },
    l: { finger: 'r', hand: 'r', row: 'h' },
    m: { finger: 'i2', hand: 'r', row: 'b' },
    n: { finger: 'i', hand: 'r', row: 'b' },
    o: { finger: 'r', hand: 'r', row: 't' },
    p: { finger: 'p', hand: 'r', row: 't' },
    q: { finger: 'p', hand: 'l', row: 't' },
    r: { finger: 'i2', hand: 'l', row: 't' },
    s: { finger: 'r', hand: 'l', row: 'h' },
    t: { finger: 'i', hand: 'l', row: 't' },
    u: { finger: 'i2', hand: 'r', row: 't' },
    v: { finger: 'i2', hand: 'l', row: 'b' },
    w: { finger: 'r', hand: 'l', row: 't' },
    x: { finger: 'r', hand: 'l', row: 'b' },
    y: { finger: 'i', hand: 'r', row: 't' },
    z: { finger: 'p', hand: 'l', row: 'b' },
    ',': { finger: 'm', hand: 'r', row: 'b' },
    '.': { finger: 'r', hand: 'r', row: 'b' },
    '/': { finger: 'r', hand: 'r', row: 'b' },
    '?': { finger: 'r', hand: 'r', row: 'b' },
    ':': { finger: 'p', hand: 'r', row: 'h' },
    ';': { finger: 'p', hand: 'r', row: 'h' },
    "\'": { finger: 'p2', hand: 'r', row: 'h' },
    '\"': { finger: 'p2', hand: 'r', row: 'h' },
  };