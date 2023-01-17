import { h } from 'preact';

export function Main({ children }) {
  return (
    <main className="flex justify-center items-center flex-col bg-slate-900 min-h-screen text-white px-6 py-8">
      {children}
    </main>
  );
}
