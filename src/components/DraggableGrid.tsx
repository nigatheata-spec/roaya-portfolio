import { useEffect, useRef, useState, useContext, createContext, memo } from 'react';
import { gsap } from '../lib/gsap';
import { cn } from '../lib/cn';

type variants = 'default' | 'masonry' | 'polaroid';

const GridVariantContext = createContext<variants | undefined>(undefined);

export const DraggableContainer = ({
  className,
  children,
  variant = 'masonry',
}: {
  className?: string;
  children: React.ReactNode;
  variant?: variants;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const currentY = useRef(0);

  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return;

    const grid = gridRef.current;
    const container = containerRef.current;
    const containerHeight = container.offsetHeight;
    const gridHeight = grid.scrollHeight;
    const maxScroll = Math.max(0, gridHeight - containerHeight);

    let startY = 0;

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      currentY.current = Math.max(-maxScroll, Math.min(0, currentY.current - deltaY * 0.5));
      gsap.set(grid, { y: currentY.current });
      startY = e.clientY;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isDragging) return;
      e.preventDefault();
      const targetY = Math.max(-maxScroll, Math.min(0, currentY.current - e.deltaY * 2.7));
      gsap.to(grid, {
        y: targetY,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          currentY.current = gsap.getProperty(grid, 'y') as number;
        },
      });
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging]);

  const variantClasses = {
    default: 'gap-14 p-7 md:gap-28 md:p-14',
    masonry: 'gap-x-14 px-7 md:gap-x-28 md:px-14',
    polaroid: 'gap-x-14 px-7 md:gap-x-28 md:px-14',
  };

  return (
    <GridVariantContext.Provider value={variant}>
      <div
        ref={containerRef}
        className="h-dvh overflow-hidden bg-void cursor-grab active:cursor-grabbing"
      >
        <div
          ref={gridRef}
          className={cn(
            'grid h-fit w-fit grid-cols-[repeat(2,1fr)] bg-void will-change-transform',
            variantClasses[variant],
            className,
          )}
        >
          {children}
        </div>
      </div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const variant = useContext(GridVariantContext);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.3 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
        delay: Math.random() * 0.5 + 1.5,
      },
    );
  }, []);

  const variantClasses = {
    default: 'rounded-2xl',
    masonry: 'even:mt-[60%] rounded-2xl',
    polaroid: 'border-10 border-b-28 border-cream shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[60%]',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden hover:cursor-pointer w-full h-full will-change-transform',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};

export const GridBody = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={className}>
            {children}
          </div>
        ))}
      </>
    );
  },
);

GridBody.displayName = 'GridBody';
