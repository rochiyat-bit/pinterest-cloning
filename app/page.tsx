export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          Pinterest Clone
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover and share inspiration
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition">
            Get Started
          </button>
          <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:opacity-90 transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
