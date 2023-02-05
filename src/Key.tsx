import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useIsInScale, useKeyboardNote } from './dataflow';
import * as styles from './Key.css';
import { useMediaQuery } from './useMediaQuery';
import { synths, useSynthType } from './synth';

export type KeyProps = {
  keyboardKey: string;
};

export const Key: FC<KeyProps> = ({ keyboardKey }) => {
  const [synthType] = useSynthType();
  const synth = synths[synthType];
  const [isPressed, setIsPressed] = useState(false);
  const note = useKeyboardNote(keyboardKey);
  const pressed = useRef(false);
  pressed.current = isPressed;

  const down = useCallback(() => {
    setIsPressed(true);
    synth.triggerAttack(typeof note === 'string' ? note : note.notes);
  }, [note, synth]);
  const up = useCallback(() => {
    setIsPressed(false);
    synth.triggerRelease(typeof note === 'string' ? note : note.notes);
  }, [note, synth]);

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
      synth.triggerRelease(typeof note === 'string' ? note : note.notes);
    };
  }, [down, keyboardKey, note, synth, up]);

  const isInScale = useIsInScale(
    typeof note === 'string' ? note : note.notes[0],
  );

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
      <span className={styles.keyNote}>
        {typeof note === 'string' ? (
          note
        ) : (
          <>
            {note.chord}
            <span className={styles.keyNoteSmall}>({note.notes[0]})</span>
          </>
        )}
      </span>
    </div>
  );
};
