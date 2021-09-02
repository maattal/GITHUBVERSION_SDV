export default (arr) =>
  arr.reduce((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), [])
