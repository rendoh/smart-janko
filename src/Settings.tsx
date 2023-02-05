import { FC, useEffect, useRef } from 'react';
import {
  KeyboardType,
  keyboardTypes,
  notes,
  useKey,
  useKeyboardType,
  useLowerKeyShift,
  useLowerOctave,
  useUpperKeyShift,
  useUpperOctave,
} from './dataflow';

export const Settings: FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) {
      return;
    }
    dialogEl.showModal();
    return () => {
      dialogEl.close();
    };
  }, []);

  const [key, setKey] = useKey();
  const [keyboardType, setKeyboardType] = useKeyboardType();
  const [upperOctave, setUpperOctave] = useUpperOctave();
  const [upperKeyShift, setUpperKeyShift] = useUpperKeyShift();
  const [lowerOctave, setLowerOctave] = useLowerOctave();
  const [lowerKeyShift, setLowerKeyShift] = useLowerKeyShift();

  return (
    <div>
      <button onClick={() => dialogRef.current?.showModal()}>
        Open Settings Modal
      </button>
      <dialog ref={dialogRef}>
        <p>Settings</p>
        <div>
          <label htmlFor="keyboardType">キーボードタイプ</label>
          <select
            id="keyboardType"
            value={keyboardType}
            onChange={(e) => setKeyboardType(e.target.value as KeyboardType)}
          >
            {keyboardTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="key">キー</label>
          <select
            id="key"
            value={key ?? 'none'}
            onChange={(e) => {
              setKey((e.target.value as (typeof notes)[number]) || null);
            }}
          >
            <option value="">-</option>
            {notes.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="upperOctave">上段オクターブ: {upperOctave}</label>
          <input
            id="upperOctave"
            type="range"
            min={1}
            max={8}
            value={upperOctave}
            step={1}
            onChange={(e) => setUpperOctave(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label htmlFor="upperKeyShift">上段キーシフト: {upperKeyShift}</label>
          <input
            id="upperKeyShift"
            type="range"
            min={-11}
            max={11}
            value={upperKeyShift}
            step={1}
            onChange={(e) => setUpperKeyShift(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label htmlFor="lowerOctave">下段オクターブ: {lowerOctave}</label>
          <input
            id="lowerOctave"
            type="range"
            min={1}
            max={8}
            value={lowerOctave}
            step={1}
            onChange={(e) => setLowerOctave(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label htmlFor="lowerKeyShift">下段キーシフト: {lowerKeyShift}</label>
          <input
            id="lowerKeyShift"
            type="range"
            min={-11}
            max={11}
            value={lowerKeyShift}
            step={1}
            onChange={(e) => setLowerKeyShift(e.target.valueAsNumber)}
          />
        </div>
      </dialog>
    </div>
  );
};
