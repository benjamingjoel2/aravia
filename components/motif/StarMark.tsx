type Props = { className?: string; title?: string };

/** The Aravia eight-point star: two overlaid squares. Inherits currentColor. */
export function StarMark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M5.64 5.64h12.72v12.72H5.64Z" />
      <path d="M12 3 21 12 12 21 3 12Z" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
