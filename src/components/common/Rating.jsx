import React from 'react';

const Rating = React.memo(({ value, showValue = true }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (value >= starValue) return 'filled';
    if (value >= starValue - 0.5) return 'half';
    return 'empty';
  });

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${value} out of 5 stars`}>
      {stars.map((type, index) => (
        <span
          key={index}
          className={`text-base ${type === 'empty' ? 'text-surface-container-highest' : 'text-tertiary-fixed-dim'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      {showValue && <span className="text-sm text-on-surface-variant ml-1">{value}</span>}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;
