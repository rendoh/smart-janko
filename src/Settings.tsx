import { FC, useEffect, useRef } from 'react';
import {
  KeyboardType,
  keyboardTypes,
  notes,
  useKey,
  useKeyboardType,
  useLowerKeyShift,
  useLowerOctave,
  useLowerSmartChord,
  useUpperKeyShift,
  useUpperOctave,
  useUpperSmartChord,
} from './dataflow';
import { GoSettings } from 'react-icons/go';
import { RangeSlider } from './RangeSlider';
import { Select } from './Select';
import * as styles from './Settings.css';
import { Switch } from './Switch';

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
  const [upperSmartChord, setUpperSmartChord] = useUpperSmartChord();
  const [lowerOctave, setLowerOctave] = useLowerOctave();
  const [lowerKeyShift, setLowerKeyShift] = useLowerKeyShift();
  const [lowerSmartChord, setLowerSmartChord] = useLowerSmartChord();

  return (
    <>
      <button
        className={styles.openButton}
        onClick={() => dialogRef.current?.showModal()}
        aria-label="設定"
      >
        <GoSettings />
      </button>
      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.fields}>
          <label className={styles.label} htmlFor="keyboardType">
            キーボードタイプ
          </label>
          <div className={styles.field}>
            <Select
              id="keyboardType"
              value={keyboardType}
              onChange={(e) => setKeyboardType(e.target.value as KeyboardType)}
            >
              {keyboardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <label className={styles.label} htmlFor="key">
            キー
          </label>
          <div className={styles.field}>
            <Select
              id="key"
              value={key ?? 'none'}
              onChange={(e) => {
                setKey(e.target.value || null);
                if (!e.target.value) {
                  setUpperSmartChord(false);
                  setLowerSmartChord(false);
                }
              }}
            >
              <option value="">-</option>
              {notes.map((note) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
            </Select>
          </div>

          <hr className={styles.divider} />

          <label className={styles.label} htmlFor="upperOctave">
            上段オクターブ: <span className={styles.value}>{upperOctave}</span>
          </label>
          <div className={styles.field}>
            <RangeSlider
              id="upperOctave"
              min={1}
              max={8}
              value={upperOctave}
              step={1}
              onChange={(e) => setUpperOctave(e.target.valueAsNumber)}
            />
          </div>

          <label className={styles.label} htmlFor="upperKeyShift">
            上段キーシフト:{' '}
            <span className={styles.value}>{upperKeyShift}</span>
          </label>
          <div className={styles.field}>
            <RangeSlider
              id="upperKeyShift"
              min={-11}
              max={11}
              value={upperKeyShift}
              step={1}
              onChange={(e) => setUpperKeyShift(e.target.valueAsNumber)}
            />
          </div>

          <label className={styles.label} htmlFor="upperSmartChord">
            上段スマートコード
            <span className={styles.value}>{upperSmartChord}</span>
          </label>
          <div className={styles.field}>
            <div className={styles.fieldInline}>
              <Switch
                checked={upperSmartChord}
                onChange={() => setUpperSmartChord((s) => !s)}
                disabled={!key}
              />
              {upperSmartChord ? 'ON' : 'OFF'}
            </div>
          </div>

          <hr className={styles.divider} />

          <label className={styles.label} htmlFor="lowerOctave">
            下段オクターブ: <span className={styles.value}>{lowerOctave}</span>
          </label>
          <div className={styles.field}>
            <RangeSlider
              id="lowerOctave"
              min={1}
              max={8}
              value={lowerOctave}
              step={1}
              onChange={(e) => setLowerOctave(e.target.valueAsNumber)}
            />
          </div>

          <label className={styles.label} htmlFor="lowerKeyShift">
            下段キーシフト:{' '}
            <span className={styles.value}>{lowerKeyShift}</span>
          </label>
          <div className={styles.field}>
            <RangeSlider
              id="lowerKeyShift"
              min={-11}
              max={11}
              value={lowerKeyShift}
              step={1}
              onChange={(e) => setLowerKeyShift(e.target.valueAsNumber)}
            />
          </div>

          <label className={styles.label} htmlFor="lowerSmartChord">
            下段スマートコード
            <span className={styles.value}>{lowerSmartChord}</span>
          </label>
          <div className={styles.field}>
            <div className={styles.fieldInline}>
              <Switch
                checked={lowerSmartChord}
                onChange={() => setLowerSmartChord((s) => !s)}
                disabled={!key}
              />
              {lowerSmartChord ? 'ON' : 'OFF'}
            </div>
          </div>
        </div>

        <div className={styles.caption}>
          <p>※ 上段二行、下段二行ごとに異なる設定を適用可能</p>
          <p>
            ※ スマートコード: 設定したキーに基づくダイアトニックコードを生成
          </p>
        </div>

        <button
          className={styles.closeButton}
          onClick={() => dialogRef.current?.close()}
        >
          閉じる
        </button>
      </dialog>
    </>
  );
};
