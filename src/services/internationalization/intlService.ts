interface DateFormatter {
  format: (date: Date) => string;
}

export function createIntlService() {
  const dateFormatter = (
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions,
  ): DateFormatter => {
    const formatter = Intl.DateTimeFormat(locales, options);

    return {format: date => formatter.format(date)};
  };

  const defaultLocaleDateFormatter = (
    options?: Intl.DateTimeFormatOptions,
  ): DateFormatter => dateFormatter(undefined, options); // Intl interprets undefined as flag to use a locale from browser config

  return Object.freeze({
    dateFormatter,
    defaultLocaleDateFormatter,
  });
}

const IntlService = createIntlService();

export default IntlService;
