import { createPortal } from 'react-dom';

/** Renders overlays at the document root so they escape local stacking contexts. */
export default function Portal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}
