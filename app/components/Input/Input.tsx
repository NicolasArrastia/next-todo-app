import React from "react";

type Props = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input = ({ label, onChange, value }: Props) => {
  return (
    <div className="grid">
      <label
        className="text-[12px] text-neutral-500 dark:text-neutral-100"
        htmlFor={label}
      >
        Todo Name
      </label>
      <input
        onChange={onChange}
        id={label}
        className="px-3 py-1 rounded-md border-2 text-neutral-900 dark:border-neutral-400 outline-none"
        type="text"
        value={value}
        placeholder="placeholder"
      />
    </div>
  );
};

export default Input;
