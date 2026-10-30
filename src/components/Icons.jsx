const make = (children) =>
  function Icon(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="1em"
        height="1em"
        aria-hidden="true"
        {...props}
      >
        {children}
      </svg>
    )
  }

export const Heart = make(
  <path d="M12 21s-7-4.6-9.3-9.2C1.2 8.7 3 5 6.5 5c2 0 3.5 1.2 5.5 3.3C14 6.2 15.5 5 17.5 5 21 5 22.8 8.7 21.3 11.8 19 16.4 12 21 12 21z" />
)
export const Search = make(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>)
export const Compare = make(<path d="M7 7h13M17 3l3 4-3 4M17 17H4M7 13l-3 4 3 4" />)
export const Arrow = make(<path d="M5 12h14M13 6l6 6-6 6" />)
export const ArrowLeft = make(<path d="M19 12H5M11 6l-6 6 6 6" />)
export const Close = make(<path d="M6 6l12 12M18 6L6 18" />)
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />)
export const Check = make(<path d="M5 12.5l4.5 4.5L19 7.5" />)
export const Plus = make(<path d="M12 5v14M5 12h14" />)
export const Minus = make(<path d="M5 12h14" />)
export const Chevron = make(<path d="M6 9l6 6 6-6" />)
export const ChevronRight = make(<path d="M9 6l6 6-6 6" />)
export const ChevronLeft = make(<path d="M15 6l-6 6 6 6" />)
export const Gauge = make(<><path d="M4.5 18a9 9 0 1 1 15 0" /><path d="M12 14l4-5" /></>)
export const Bolt = make(<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />)
export const Phone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />)
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>)
export const Pin = make(<><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>)
export const Star = make(<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />)
export const Filter = make(<><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>)
export const Shield = make(<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>)
export const Clock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
export const Wrench = make(<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z" />)
export const Calendar = make(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>)
export const Expand = make(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />)
export const Trophy = make(<><path d="M8 4h8v5a4 4 0 0 1-8 0V4z" /><path d="M8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 21h8M9.5 17h5" /></>)
export const Globe = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>)
export const Instagram = make(<><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><path d="M16.8 7.2h.01" /></>)
export const Facebook = make(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />)
export const Youtube = make(<><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.5 9.5l4 2.5-4 2.5v-5z" /></>)
export const Twitter = make(<path d="M4 4l16 16M20 4L4 20" />)
export const Car = make(
  <>
    <path d="M3 16.5V12l2.2-4.6A2 2 0 0 1 7 6.2h10a2 2 0 0 1 1.8 1.2L21 12v4.5h-1.7M3 16.5h1.7M9.3 16.5h5.4M3 12h18" />
    <circle cx="7.5" cy="16.5" r="1.8" />
    <circle cx="16.5" cy="16.5" r="1.8" />
  </>
)
export const Crown = make(
  <>
    <path d="M5 8.5L8.5 13L12 6.5L15.5 13L19 8.5L17.5 16.5H6.5L5 8.5Z" />
    <path d="M6.5 19.5H17.5" />
  </>
)
