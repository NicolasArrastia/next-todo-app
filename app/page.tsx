import Header from "./components/Header";
import Content from "./Content";

const asd = `flex flex-col
  p-4 bg-neutral-100 dark:bg-neutral-900 md:rounded-md
  w-full h-screen md:max-w-[420px] aspect-phone`;

export default function Home() {
  return (
    <main className="bg-pattern bg-slate-300 w-full h-screen flex justify-center items-center">
      <div
        className="
        p-4 bg-neutral-100 dark:bg-neutral-900 md:rounded-md
        flex flex-col
        w-full h-full md:h-fit
        md:max-w-[420px] md:aspect-phone"
      >
        <Header />
        <div className="relative flex flex-col gap-2 h-full">
          <Content />
        </div>
      </div>
    </main>
  );
}
