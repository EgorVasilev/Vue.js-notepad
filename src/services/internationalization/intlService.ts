export function createIntlService() {
  const dateFormatter = (
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions,
  ): {format: (date: Date) => string} => {
    const formatter = Intl.DateTimeFormat(locales, options);

    return {format: date => formatter.format(date)};
  };

  return Object.freeze({
    dateFormatter,
  });
}

const IntlService = createIntlService();

export default IntlService;
