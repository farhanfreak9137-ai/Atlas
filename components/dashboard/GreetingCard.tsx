export function GreetingCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-4xl font-bold">
        {greeting}, Farhan 👋
      </h1>

      <p className="mt-3 text-zinc-400">
        Everything important, in one place.
      </p>
    </div>
  );
}