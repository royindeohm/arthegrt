import React from 'react';

const SkeletonCard = React.memo(() => {
  return (
    <div className="bg-surface-container-lowest border-4 border-on-surface overflow-hidden shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]" aria-hidden="true">
      <div className="w-full h-48 bg-surface-container-highest animate-pulse border-b-4 border-on-surface" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-2/3 bg-surface-container-highest animate-pulse" />
        <div className="h-3 w-full bg-surface-container-highest animate-pulse" />
        <div className="h-3 w-1/2 bg-surface-container-highest animate-pulse" />
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="h-5 w-16 bg-surface-container-highest animate-pulse" />
        <div className="h-9 w-24 bg-surface-container-highest animate-pulse" />
      </div>
    </div>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

export default SkeletonCard;
