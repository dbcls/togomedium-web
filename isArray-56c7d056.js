/** Returns the object type of the given payload */
function getType(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
}

/** Returns whether the payload is an array */
function isArray(payload) {
    return getType(payload) === 'Array';
}

export { getType as g, isArray as i };
//# sourceMappingURL=isArray-56c7d056.js.map
