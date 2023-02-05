import * as Tone from 'tone';
import { atom, useRecoilState } from 'recoil';

export const synths = {
  normal: new Tone.PolySynth().toDestination(),
  square: new Tone.PolySynth({
    options: {
      oscillator: {
        type: 'square',
      },
    },
  }).toDestination(),
  am: new Tone.PolySynth(Tone.AMSynth).toDestination(),
  fm: new Tone.PolySynth(Tone.FMSynth).toDestination(),
} as const;

export type SynthType = keyof typeof synths;
export const synthTypes = Object.keys(synths) as SynthType[];

const synthTypeState = atom<SynthType>({
  key: 'synthType',
  default: 'normal',
});

export function useSynthType() {
  return useRecoilState(synthTypeState);
}
