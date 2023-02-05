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
  key: 'keyType',
  default: 'US',
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
  '1234567890-^',
  'qwertyuiop@[',
  'asdfghjkl;:]',
  'zxcvbnm,./',
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

function findKeyRowAndIndex(
  key: string,
  layout: KeyboardLayout,
): {
  y: number;
  x: number;
} {
  for (let i = 0; i < layout.length; i++) {
    const index = layout[i].indexOf(key);
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

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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

const keyNoteState = selectorFamily<string, string>({
  key: 'keyNote',
  get:
    (key) =>
    ({ get }) => {
      const layout = get(keyboardLayoutState);
      const { y, x } = findKeyRowAndIndex(key, layout);
      const isUpperKey = y < 2;
      const octave = get(isUpperKey ? upperOctaveState : lowerOctaveState);
      const keyShift = get(
        isUpperKey ? upperKeyShiftState : lowerKeyShiftState,
      );
      return generateNote(-3 + y, x, octave, keyShift);
    },
});

export function useKeyboardType() {
  return useRecoilState(keyboardTypeState);
}

export function useKeyboardLayout() {
  return useRecoilValue(keyboardLayoutState);
}

export function useKeyNote(key: string) {
  return useRecoilValue(keyNoteState(key));
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
