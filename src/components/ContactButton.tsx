import { useEffect, useRef, useState } from 'react';

// TODO: replace with your real WhatsApp number in international format (no +, no spaces),
// e.g. '380991234567'
const WHATSAPP_NUMBER = 'REPLACE_WITH_YOUR_NUMBER';

const CONTACT_OPTIONS = [
  { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: 'Telegram', href: 'https://t.me/kholstynin' },
  { label: 'Instagram', href: 'https://ig.me/m/visualtrap200' },
];

export default function ContactButton() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
        style={{
          background:
            'linear-gradient(123deg, #001B33 7%, #0B5FA5 37%, #1C8CE0 72%, #4FE0FF 100%)',
          boxShadow:
            '0px 4px 4px rgba(31, 160, 255, 0.3), 4px 4px 12px #0B5FA5 inset, 0 0 0 2px #FFFFFF',
          outline: '2px solid #FFFFFF',
          outlineOffset: '-3px',
        }}
      >
        Contact Me
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-3 flex flex-col gap-2 rounded-2xl p-2 z-30"
          style={{
            background: '#0C0C0C',
            border: '1px solid rgba(79, 224, 255, 0.4)',
            boxShadow: '0 0 20px rgba(79, 224, 255, 0.25)',
            minWidth: '190px',
          }}
        >
          {CONTACT_OPTIONS.map((option) => (
            <a
              key={option.label}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
              style={{ background: 'rgba(79, 224, 255, 0.12)' }}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
