import {Settings} from 'lucide-react';
import React from 'react';

interface SettingButtonProps {
    onClick: () => void;
}

const SettingButton: React.FC<SettingButtonProps> = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center justify-center shrink-0 w-8 h-8 transition-[outline-color] duration-[0.2s,border-color] delay-[0.2s] outline-transparent cursor-pointer m-0 p-0 rounded-md relative group overflow-hidden !border-transparent"
        >
      <span
          style={{
              animationDuration: '2s',
              background: 'conic-gradient(from 90deg, #f97316, #f59e0b, #eab308, #84cc16, #22c55e, #10b981, #14b8a6, #06b6d4, #0ea5e9, #3b82f6, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f43f5e)'
          }}
          className="absolute -top-5 -left-5 w-20 h-20 animate-spin"
      />
            <span
                style={{inset: '1px', borderRadius: '4px'}}
                className="absolute z-[2] bg-background transition-all"
            />
            <Settings className="z-[40] h-5 w-5 text-primary shrink-0 bg-background rounded"/>
        </button>
    );
};

export default SettingButton;