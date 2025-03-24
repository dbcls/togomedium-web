/**
 *
 * @deprecated
 */
const capitalizeFirstLetter = (str) => {
    if (!str) {
        return str;
    }
    const reg = /^(.)(.*)$/.exec(str);
    // console.log(reg);
    return `${reg[1].toUpperCase()}${reg[2]}`;
};
const stringToArray = (str) => {
    return str.split(",").map((str) => str.trim());
};
const makeSpeciesName = (str) => {
    const arr = str.split(" ");
    if (arr.length < 1) {
        return "";
    }
    const first = arr.shift().replace("[", "").charAt(0).toUpperCase();
    const rest = capitalizeFirstLetter(arr.join(" "));
    return `${first}. ${rest}`;
};

export { capitalizeFirstLetter as c, makeSpeciesName as m, stringToArray as s };
//# sourceMappingURL=string-cf2ce947.js.map
