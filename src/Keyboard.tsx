import { FC } from 'react';
import { useKeyboardLayout } from './dataflow';
import { Key } from './Key';
import * as styles from './Keyboard.css';

const escapes: Record<string, string> = {
  '-': 'mn',
  '=': 'eq',
  '[': 'bl',
  ']': 'br',
  ';': 'sc',
  ':': 'cl',
  ',': 'cm',
  '.': 'dt',
  '/': 'sl',
  "'": 'sq',
  '"': 'dq',
  '^': 'ca',
  '@': 'at',
  '¥': 'yn',
  _: 'us',
};

function gridArea(key: string) {
  return `k${escapes[key] ?? `${key}`}`;
}

function generateGridTemplateFromLayout(layout: readonly string[][]) {
  const rows = layout.map((row, i) => [
    ...[...Array(i)].fill('.'),
    ...row.flatMap((char) => [gridArea(char), gridArea(char)]),
  ]);

  const maxLength = Math.max(...rows.map((row) => row.length));

  return (
    rows
      .map((row) =>
        [...row, ...[...Array(maxLength - row.length).fill('.')]].join(' '),
      )
      .map((rowTemplate) => `"${rowTemplate}" 1fr`)
      .join(' ') + ` / ${'1fr '.repeat(maxLength)}`
  );
}

export const Keyboard: FC = () => {
  const layout = useKeyboardLayout();

  return (
    <div
      className={styles.keyboard}
      style={{
        gridTemplate: generateGridTemplateFromLayout(layout),
      }}
    >
      {layout.flatMap((row) =>
        row.map((key) => (
          <div key={key} style={{ gridArea: gridArea(key) }}>
            <Key keyboardKey={key} />
          </div>
        )),
      )}
    </div>
  );
};
