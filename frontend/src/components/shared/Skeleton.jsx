export default function Skeleton({ width, height, className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
      style={{
        width:  width  ?? '100%',
        height: height ?? '1rem',
      }}
    />
  );
}
