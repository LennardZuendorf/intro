import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { CommandPalette } from '../command-palette';

// Behaviour test for the neon-nav command palette's keyboard + jump contract.
//
// `src/components/nav/command-palette.tsx` owns the single global keydown
// listener and the smooth-scroll jump. It was shipped without a test, so this
// file locks the contract from `.spec/features/neon-nav`:
//   - `/` opens the palette, EXCEPT while focus is in an editable field.
//   - ⌘K / Ctrl+K always opens it (even from an input).
//   - Typing filters the section rows (cmdk).
//   - Enter on a match smooth-scrolls the target section and closes.
//   - Esc closes.
//
// `Element.prototype.scrollIntoView` is mocked globally in `jest.setup.ts`
// (jsdom has no layout). cmdk calls it internally with `{ block: 'nearest' }`
// while navigating, so the jump assertion matches on `{ behavior: 'smooth' }`
// — the exact argument `jumpTo` uses — to stay specific to our code.

/**
 * Mirrors how `<Dock>` wires the palette: the parent owns the open state and
 * passes `open` / `onOpenChange`. We render this thin harness rather than the
 * full `<Dock>` so the test stays focused on the palette's keyboard/jump
 * contract without pulling in the theme + accent providers that Dock's other
 * segments require. The `<section>` targets give `jumpTo` real elements to
 * resolve via `getElementById`; the outside `<input>` exercises the editable
 * guard.
 */
function PaletteHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <input aria-label="outside field" />
      <section id="about" />
      <section id="work" />
      <section id="notes" />
      <section id="contact" />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}

describe('CommandPalette — keyboard & jump contract', () => {
  const scrollIntoView = Element.prototype.scrollIntoView as jest.Mock;

  beforeEach(() => {
    scrollIntoView.mockClear();
  });

  it('opens when "/" is pressed outside an editable field', () => {
    render(<PaletteHarness />);

    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.keyDown(document.body, { key: '/' });

    expect(screen.getByRole('dialog', { name: 'Navigation palette' })).toBeInTheDocument();
  });

  it('ignores "/" while focus is in an <input> (so it types normally)', () => {
    render(<PaletteHarness />);
    const outside = screen.getByLabelText('outside field');
    outside.focus();

    fireEvent.keyDown(outside, { key: '/' });

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it.each([
    ['metaKey (⌘K)', { key: 'k', metaKey: true }],
    ['ctrlKey (Ctrl+K)', { key: 'k', ctrlKey: true }]
  ])('opens on %s even when an input is focused', (_label, init) => {
    render(<PaletteHarness />);
    const outside = screen.getByLabelText('outside field');
    outside.focus();

    fireEvent.keyDown(outside, init);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('filters the section rows to the typed query', async () => {
    render(<PaletteHarness />);
    fireEvent.keyDown(document.body, { key: '/' });

    const input = screen.getByPlaceholderText('Jump to a section…');
    fireEvent.change(input, { target: { value: 'work' } });

    expect(await screen.findByText('Work')).toBeInTheDocument();
    expect(screen.queryByText('About')).toBeNull();
    expect(screen.queryByText('Notes')).toBeNull();
    expect(screen.queryByText('Contact')).toBeNull();
  });

  it('smooth-scrolls the matched section and closes on Enter', async () => {
    render(<PaletteHarness />);
    fireEvent.keyDown(document.body, { key: '/' });

    const input = screen.getByPlaceholderText('Jump to a section…');
    fireEvent.change(input, { target: { value: 'work' } });

    // Wait for cmdk to filter to the single match and auto-select it.
    const item = (await screen.findByText('Work')).closest('[cmdk-item=""]');
    await waitFor(() => expect(item).toHaveAttribute('aria-selected', 'true'));

    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' }));

    // The smooth scroll targeted the #work section specifically.
    const smoothCall = scrollIntoView.mock.calls.findIndex(
      (args) => (args[0] as ScrollIntoViewOptions | undefined)?.behavior === 'smooth'
    );
    expect((scrollIntoView.mock.instances[smoothCall] as HTMLElement).id).toBe('work');

    // And the palette closed.
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('closes when Escape is pressed', async () => {
    render(<PaletteHarness />);
    fireEvent.keyDown(document.body, { key: '/' });

    const input = screen.getByPlaceholderText('Jump to a section…');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});
