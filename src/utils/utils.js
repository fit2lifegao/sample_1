// @flow

import cloudinary from 'cloudinary-core';
import moment from 'moment-timezone';
import type Moment from 'moment-timezone';

import qs from 'qs';

import { URL, cloudinaryConfig } from '../constants';

const cloudinaryCore = new cloudinary.Cloudinary(cloudinaryConfig);

export function dedupeArray<T>(ids: Array<T>): Array<T> {
  return [...new Set(ids)];
}

export function camelCaseToSnakeCase(camelCase: string): string {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export const capitalize = (someString: string): string =>
  someString.replace(/(^|\s)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());

export const humanizeSnakeCase = (snakeCase: string): string =>
  snakeCase ? capitalize(snakeCase.replace(/_/g, ' ')) : '';

export function isObject(value: any): boolean {
  return value === Object(value) && !Array.isArray(value);
}

export function paramsSerializer(params: any): any {
  return qs.stringify(
    Object.keys(params).reduce(
      (p, k) => ({
        ...p,
        [k]:
          typeof params[k] === 'object' ? JSON.stringify(params[k]) : params[k],
      }),
      {},
    ),
  );
}

/**
 * Converts an objects keys from `camelCase` to `snake_case` (recursively)
 */
export function keysToSnakeCase(original: any): any {
  if (!isObject(original)) {
    return original;
  }

  const sanitized = {};

  Object.keys(original).forEach(oldKey => {
    const newKey = camelCaseToSnakeCase(oldKey);
    sanitized[newKey] = keysToSnakeCase(original[oldKey]);
  });

  return sanitized;
}

export function formatStringToDate(formatString: string): Date {
  return moment(formatString).toDate();
}

export function dateToFormatString(
  date: Date | Moment,
  format: string,
): string {
  return moment(date).format(format);
}

export const formatLongDateWithTimezone = (date: Moment | string): string =>
  `${moment(date).format('MMM D Y @ h:mm A')} ${moment
    .tz(moment.tz.guess())
    .zoneAbbr()}`;

/*
 * Parses a number out of a string or returns 0
 * eg/ "123.22" => 123.22, undefined => 0, NaN => 0
 */
export const parseNumber = (param: ?string): number => {
  const number = parseFloat(param);
  return !isNaN(number) ? number : 0;
};

/*
 * Format a number with commas*
 */
export const formatNumber = (x: string): string => {
  const number: number = parseNumber(x);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/*
 * Format a number as a price string
 * eg/ 123456.666 => $123,345.66
 */
export const formatPrice = (
  x: string,
  leading: string = '$',
  removeTrailingZeros: boolean = false,
) => {
  const number: number = parseNumber(x);

  return removeTrailingZeros
    ? leading + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : leading +
        number
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatOdometer = (x: number) =>
  x !== null ? `${formatNumber(String(x))} km` : '';

export const isValidVinCharacter = (charCode: number): boolean => {
  // I, O, Q, i, o, q are invalid
  if ([73, 79, 81, 105, 111, 113].includes(charCode)) {
    return false;
  }

  if (
    (charCode > 47 && charCode < 58) || // numeric (0-9)
    (charCode > 64 && charCode < 91) || // upper alpha (A-Z)
    (charCode > 96 && charCode < 123) // lower alpha (a-z)
  ) {
    return true;
  }

  return false;
};

/*
 * Format a number as a percent
 * eg/ 4.99 => 4.99%
 */
export const formatPercent = (x: string, trailing: string = '%') => {
  const number: number = parseNumber(x);

  return number.toFixed(2).toString() + trailing;
};

/**
 * Get a parameter from URL
 */
export function getUrlParameter(name: string) {
  const param = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]?${param}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
}

export const generatePhotoPreview = (
  photo: {
    cloudinary_public_id: ?string,
    photo_service_id: ?string,
  },
  photoWidth: number,
  photoHeight: ?number,
) =>
  photo.cloudinary_public_id
    ? cloudinaryCore.url(photo.cloudinary_public_id, {
        width: parseInt(photoWidth, 10),
        height: photoHeight,
        crop: 'fit',
      })
    : `${URL.photoService}/image/show/${photoWidth}/${photoHeight ||
        '_'}/${photo.photo_service_id || ''}.jpg`;

export function combineStrings(...strings: any[]) {
  const parts = strings.filter(x => x !== null && x !== undefined && x !== '');
  return parts.join(' ');
}

/**
 * Only works for numbers that we know are 2 digits ( or less).
 */
const pad2 = num => `00${num}`.slice(-2);

/**
 * Formats a duration (input can be string, duration, or ISO duration string)
 */
export const formatDuration = (duration: string | Moment) => {
  const dur = moment.duration(duration);
  const d = dur.days();
  const h = dur.hours();
  const m = dur.minutes();
  const s = dur.seconds();
  const HMSDiff = `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  return `${d > 0 ? `${d} day${d > 1 ? 's ' : ' '}` : ''} ${
    !(h === 0 && m === 0 && s === 0) ? HMSDiff : ''
  }`;
};

export const parseGraphQLErrors = ({ graphQLErrors }: any): string =>
  graphQLErrors
    ? graphQLErrors
        .map(
          ({ extensions: { response, exception } }) =>
            `${
              response
                ? response.body.errors.join('\n')
                : exception
                ? exception.message
                : 'An unknown error occurred.'
            }`,
        )
        .join(',')
    : '';

export const parseApolloError = (e: any): string =>
  `${e.message}:${parseGraphQLErrors(e)}`;
