const Spinner = ({ size = 'default', text = '' }) => {
  const sizeMap = { sm: 20, default: 32, lg: 48 };
  const dim = sizeMap[size] || sizeMap.default;
  const borderW = Math.max(2, Math.round(dim / 8));

  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-label="Loading">
      <div
        style={{ width: dim, height: dim, borderWidth: borderW }}
        className="border-surface-container-highest border-t-primary rounded-full animate-spin box-border"
      />
      {text && <p className="text-sm text-on-surface-variant">{text}</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
