import { createFileRoute } from '@tanstack/react-router';
import { stagger, useAnimate } from 'motion/react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const [scope, animate] = useAnimate();

  const onButtonClick = () => {
    animate([['.letter', { y: -48 }, { delay: stagger(0.05), duration: 0.2 }]]);
  };

  return (
    <div className="flex h-svh justify-center items-center" ref={scope}>
      <button
        className="relative rounded-full border-2 border-blue-600 px-6 py-2 text-2xl text-blue-600 transition-colors hover:bg-blue-100"
        onClick={onButtonClick}
      >
        <span className="sr-only">Motion</span>
        <span aria-hidden>
          {['M', 'o', 't', 'i', 'o', 'n'].map((letter, index) => (
            <span className="letter inline-block" key={`${letter}-${index}`}>
              {letter}
            </span>
          ))}
        </span>
      </button>
    </div>
  );
}
