import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const keyboardTypes = ['US', 'JIS'] as const;
export type KeyboardType = (typeof keyboardTypes)[number];
const keyboardTypeState = atom<KeyboardType>({
  key: 'keyboardType',
  default: 'JIS',
});

type KeyboardLayout = readonly string[][];
function createKeyboardLayout(source: string[]): KeyboardLayout {
  return source.map((row) => row.split(''));
}
const usLayout: KeyboardLayout = createKeyboardLayout([
  '1234567890-=',
  'qwertyuiop[]',
  "asdfghjkl;'",
  'zxcvbnm,./',
]);
const jisLayout: KeyboardLayout = createKeyboardLayout([
  '1234567890-^¥',
  'qwertyuiop@[',
  'asdfghjkl;:]',
  'zxcvbnm,./_',
]);

const keyboardLayoutState = selector<KeyboardLayout>({
  key: 'keyboardLayout',
  get: ({ get }) => {
    const keyboardType = get(keyboardTypeState);
    return keyboardType === 'US' ? usLayout : jisLayout;
  },
});

const upperOctaveState = atom<number>({
  key: 'upperOctave',
  default: 4,
});

const upperKeyShiftState = atom<number>({
  key: 'upperKeyShift',
  default: 0,
});

const lowerOctaveState = atom<number>({
  key: 'lowerOctave',
  default: 4,
});

const lowerKeyShiftState = atom<number>({
  key: 'lowerKeyShift',
  default: 0,
});

const upperSmartChordState = atom<boolean>({
  key: 'upperSmartChord',
  default: false,
});

const lowerSmartChordState = atom<boolean>({
  key: 'lowerSmartChord',
  default: false,
});

function findKeyRowAndIndex(
  keyboardKey: string,
  layout: KeyboardLayout,
): {
  y: number;
  x: number;
} {
  for (let i = 0; i < layout.length; i++) {
    const index = layout[i].indexOf(keyboardKey);
    if (index === -1) {
      continue;
    }
    return {
      y: i,
      x: index,
    };
  }

  return {
    y: -1,
    x: -1,
  };
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((range + ((value - min) % range)) % range) + min;
}

export const notes = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

const keyState = atom<string | null>({
  key: 'key',
  default: 'C',
});

const scaleState = selector<string[] | null>({
  key: 'scale',
  get: ({ get }) => {
    const key = get(keyState);
    if (!key) {
      return null;
    }

    const rootIndex = notes.indexOf(key);
    const rotated = [...notes.slice(rootIndex), ...notes.slice(0, rootIndex)];
    return [
      rotated[0],
      rotated[2],
      rotated[4],
      rotated[5],
      rotated[7],
      rotated[9],
      rotated[11],
    ];
  },
});

const noteInScaleState = selectorFamily<boolean, string>({
  key: 'noteInScale',
  get:
    (note) =>
    ({ get }) => {
      const scale = get(scaleState);
      return scale ? scale.includes(note.replace(/\d/, '')) : true;
    },
});

function generateNote(
  offsetFromC: number,
  index: number,
  standardOctave: number,
  keyShift: number,
) {
  const note = notes[wrap(0, notes.length, index * 2 + offsetFromC + keyShift)];
  const octave =
    Math.floor((index + (offsetFromC + keyShift) / 2) / (notes.length / 2)) +
    standardOctave;

  return `${note}${octave}`;
}

function isMinor(degree: number) {
  return degree !== 1 && degree !== 4 && degree !== 5;
}

const keyboardNoteState = selectorFamily<
  string | { chord: string; notes: string[] },
  string
>({
  key: 'keyboardNote',
  get:
    (keyboardKey) =>
    ({ get }) => {
      const layout = get(keyboardLayoutState);
      const { y, x } = findKeyRowAndIndex(keyboardKey, layout);
      const isUpperKey = y < 2;
      const octave = get(isUpperKey ? upperOctaveState : lowerOctaveState);
      const keyShift = get(
        isUpperKey ? upperKeyShiftState : lowerKeyShiftState,
      );
      const note = generateNote(-3 + y, x, octave, keyShift);
      const root = note.replace(/\d/, '');

      const scale = get(scaleState);
      const preDegree = scale?.indexOf(root);
      const isChord = get(
        isUpperKey ? upperSmartChordState : lowerSmartChordState,
      );
      if (
        !isChord ||
        !scale ||
        typeof preDegree !== 'number' ||
        preDegree === -1
      ) {
        return note;
      }

      const flat5 = preDegree === 6;
      const baseNoteOctave = Number(note.match(/\d/)?.[0]);
      const third = scale[wrap(0, 7, preDegree + 2)];
      const fifth = scale[wrap(0, 7, preDegree + (flat5 ? 3 : 4))];
      const isMinorChord = isMinor(preDegree + 1);
      return {
        chord: `${root}${isMinorChord ? 'm' : ''}${flat5 ? '-5' : ''}`,
        notes: [
          note,
          third +
            (baseNoteOctave +
              (notes.indexOf(third) < notes.indexOf(root) ? 1 : 0)),
          fifth +
            (baseNoteOctave +
              (notes.indexOf(fifth) < notes.indexOf(root) ? 1 : 0)),
        ],
      };
    },
});

export function useKey() {
  return useRecoilState(keyState);
}

export function useIsInScale(note: string) {
  return useRecoilValue(noteInScaleState(note));
}

export function useKeyboardType() {
  return useRecoilState(keyboardTypeState);
}

export function useKeyboardLayout() {
  return useRecoilValue(keyboardLayoutState);
}

export function useKeyboardNote(keyboardKey: string) {
  return useRecoilValue(keyboardNoteState(keyboardKey));
}

export function useUpperOctave() {
  return useRecoilState(upperOctaveState);
}

export function useUpperKeyShift() {
  return useRecoilState(upperKeyShiftState);
}

export function useLowerOctave() {
  return useRecoilState(lowerOctaveState);
}

export function useLowerKeyShift() {
  return useRecoilState(lowerKeyShiftState);
}

export function useUpperSmartChord() {
  return useRecoilState(upperSmartChordState);
}

export function useLowerSmartChord() {
  return useRecoilState(lowerSmartChordState);
}
