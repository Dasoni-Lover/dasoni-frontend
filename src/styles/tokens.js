import { css } from "styled-components";

/**
 *
 * @param {object} obj
 * @param {string} path
 * @returns
 */
const get = (obj, path) => path.split(".").reduce((o, k) => o?.[k], obj);

// 타이포 프리셋: ${typo('h1')}
export const typo =
  (key) =>
  ({ theme }) =>
    css`
      ${get(theme, `fonts.${key}`)}
    `;

// 컬러 단축: ${color('black.80')}
export const color =
  (path) =>
  ({ theme }) =>
    get(theme, `colors.${path}`);
