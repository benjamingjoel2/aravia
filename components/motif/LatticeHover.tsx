/** Place inside an element with `.lattice-host`; a faint lattice fades in on hover and focus. */
export function LatticeHover() {
  return (
    <span aria-hidden className="lattice-hover">
      <span className="lattice-field absolute inset-0" />
    </span>
  );
}
