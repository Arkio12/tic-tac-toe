import Game from './components/Game';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4 border-2 border-sienna-700 w-full max-w-xl mx-auto box-border bg-[url('/coffee_cup.jpg')] bg-cover bg-center rounded-lg shadow-lg">
      <Game />
    </main>
  );
}