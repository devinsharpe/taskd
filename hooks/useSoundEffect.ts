import { SoundEffects } from "../pages/_app";

const useSoundEffect = () => {
  return {
    playSoundEffect: async (id: SoundEffects) => {
      const storedSoundSetting = localStorage.getItem("taskd-disable-sound") as
        | "true"
        | "false"
        | null;
      let isSoundDisabled = false;
      if (storedSoundSetting) {
        isSoundDisabled = JSON.parse(storedSoundSetting);
      }
      if (!isSoundDisabled) {
        const soundEl = document.getElementById(id) as
          | HTMLAudioElement
          | undefined;
        if (soundEl) {
          await soundEl.play();
        }
      }
    },
  };
};

export default useSoundEffect;
