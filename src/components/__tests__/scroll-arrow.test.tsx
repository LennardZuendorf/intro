import { render } from '@testing-library/react';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { Button } from '@/components/retroui/Button';

// Characterization test for `motion.create(Button)` ref-forwarding.
//
// `src/components/scroll-arrow.tsx` relies on `motion.create(Button)` to wrap
// the shadcn-style Button in framer-motion props. That HOC only works because
// `Button` is built with `React.forwardRef`. If a future Button swap (e.g.
// RetroUI in U9) drops `forwardRef`, `motion.create` silently degrades and the
// underlying ref stops landing on the `<button>` element. This file locks the
// current behaviour so that regression fails loudly.

describe('motion.create(Button) ref forwarding', () => {
  it('forwards a ref through the motion HOC to the underlying <button>', () => {
    const MotionButton = motion.create(Button);
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <MotionButton ref={ref} aria-label='test'>
        click
      </MotionButton>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('clears the ref without throwing when AnimatePresence unmounts the motion child', () => {
    const MotionButton = motion.create(Button);
    const ref = React.createRef<HTMLButtonElement>();

    function Harness({ show }: { show: boolean }) {
      return (
        <AnimatePresence>
          {show && (
            <MotionButton
              ref={ref}
              aria-label='test'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
            >
              click
            </MotionButton>
          )}
        </AnimatePresence>
      );
    }

    const { rerender, unmount } = render(<Harness show={true} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);

    // Toggle the conditional child off; AnimatePresence drives the unmount.
    rerender(<Harness show={false} />);

    // And tear the whole tree down. Neither step should throw.
    expect(() => unmount()).not.toThrow();
  });
});
