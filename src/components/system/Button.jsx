import { h } from 'preact';

export function Button({ children, onClick, type = 'button' }) {
  return (
    <button className="p-4 text-sky-400" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
