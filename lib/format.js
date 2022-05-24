// Configuration
const COUNT_FORMATS = [
  {
    // 0 - 999
    letter: "",
    limit: 1e3,
  },
  {
    // 1,000 - 999,999
    letter: "K",
    limit: 1e6,
  },
  {
    // 1,000,000 - 999,999,999
    letter: "M",
    limit: 1e9,
  },
  {
    // 1,000,000,000 - 999,999,999,999
    letter: "B",
    limit: 1e12,
  },
  {
    // 1,000,000,000,000 - 999,999,999,999,999
    letter: "T",
    limit: 1e15,
  },
];

// Format Method:
export const format = {
  date: (value) => {
    const d = new Date(value);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    let formatted = `${mo} ${da}, ${ye}`;
    return formatted;
  },

  count: (value) => {
    const format = COUNT_FORMATS.find((format) => value < format.limit);

    value = (1000 * value) / format.limit;
    value = Math.round(value * 10) / 10; // keep one decimal number, only if needed

    return value + format.letter;
  },
};
