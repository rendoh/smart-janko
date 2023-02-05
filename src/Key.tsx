import * as Tone from 'tone';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useIsInScale, useKeyboardNote } from './dataflow';
import * as styles from './Key.css';
import { useMediaQuery } from './useMediaQuery';

const synth = new Tone.PolySynth().toDestination();

export type KeyProps = {
  keyboardKey: string;
};

export const Key: FC<KeyProps> = ({ keyboardKey }) => {
  const [isPressed, setIsPressed] = useState(false);
  const note = useKeyboardNote(keyboardKey);
  const pressed = useRef(false);
  pressed.current = isPressed;

  const down = useCallback(() => {
    setIsPressed(true);
    synth.triggerAttack(note);
  }, [note]);
  const up = useCallback(() => {
    setIsPressed(false);
    synth.triggerRelease(note);
  }, [note]);

  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key !== keyboardKey || pressed.current) {
        return;
      }
      down();
    };
    const handleKeyup = ({ key }: KeyboardEvent) => {
      if (key !== keyboardKey || !pressed.current) {
        return;
      }
      up();
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
      synth.triggerRelease(note);
    };
  }, [down, keyboardKey, note, up]);

  const isInScale = useIsInScale(note);

  const canUseMouse = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <div
      className={styles.key({ pressed: isPressed, outOfScale: !isInScale })}
      onMouseDown={canUseMouse ? down : undefined}
      onMouseUp={canUseMouse ? up : undefined}
      onMouseLeave={canUseMouse && isPressed ? up : undefined}
      onTouchStart={canUseMouse ? undefined : down}
      onTouchEnd={canUseMouse ? undefined : up}
    >
      <span className={styles.keyChar}>{keyboardKey}</span>
      <span className={styles.keyNote}>{note}</span>
    </div>
  );
};
