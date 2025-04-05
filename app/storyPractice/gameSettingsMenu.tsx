import type { SetStateAction, Dispatch } from "react";
import 'app/styles/gameSettingsMenu.css'

export default function GameSettingsMenu({
    resetOnFail,
    setResetOnFail,
    showSentence,
    setShowSentence,
}: {
    resetOnFail: boolean;
    setResetOnFail: Dispatch<SetStateAction<boolean>>;
    showSentence: boolean;
    setShowSentence: Dispatch<SetStateAction<boolean>>;
}) {
    const SettingsSwitch = ({
        title,
        state,
        toggle,
      }: {
        title: string;
        state: boolean;
        toggle: () => void;
      }) => (
        <div className="settingsSwitch">
          <h6>{title}</h6>
          <button onClick={toggle}>{state ? 'ON' : 'OFF'}</button>
        </div>
      );
    
      return (
        <div className="settingsMenu">
          <SettingsSwitch
            title="Reset Word On Fail"
            state={resetOnFail}
            toggle={() => setResetOnFail((prev) => !prev)}
          />
          <SettingsSwitch
            title="Sentence Mode"
            state={showSentence}
            toggle={() => setShowSentence((prev) => !prev)}
          />
        </div>
      );
    }