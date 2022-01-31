import moment from 'moment';

/**
 * Formats date to string
 * @param format Format
 * @param date optional - date to format, if not given current time will be formatted
 * @returns date string
 */
export const formatDate = (format: string, date?: string | number): string =>
  date ? moment(date).format(format) : moment().format(format);

  /**
   * Formats date to ISO string
   * @param date optional - date to format, if not given current time will be formatted
   * @returns ISO date string
   */
export const formatISOdate = (date?: string | number): string =>
  date ? moment(date).toISOString() : moment().toISOString();
