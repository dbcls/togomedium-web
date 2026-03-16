import { g as getType, i as isArray } from './isArray-56c7d056.js';

/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects
 * with other prototypes)
 */
function isPlainObject(payload) {
    if (getType(payload) !== 'Object')
        return false;
    const prototype = Object.getPrototypeOf(payload);
    return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}

function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
    const propType = {}.propertyIsEnumerable.call(originalObject, key)
        ? 'enumerable'
        : 'nonenumerable';
    if (propType === 'enumerable')
        carry[key] = newVal;
    if (includeNonenumerable && propType === 'nonenumerable') {
        Object.defineProperty(carry, key, {
            value: newVal,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }
}
/**
 * Copy (clone) an object and all its props recursively to get rid of any prop referenced of the
 * original object. Arrays are also cloned, however objects inside arrays are still linked.
 *
 * @param target Target can be anything
 * @param [options={}] See type {@link Options} for more details.
 *
 *   - `{ props: ['key1'] }` will only copy the `key1` property. When using this you will need to cast
 *       the return type manually (in order to keep the TS implementation in here simple I didn't
 *       built a complex auto resolved type for those few cases people want to use this option)
 *   - `{ nonenumerable: true }` will copy all non-enumerable properties. Default is `{}`
 *
 * @returns The target with replaced values
 */
function copy(target, options = {}) {
    if (isArray(target)) {
        return target.map((item) => copy(item, options));
    }
    if (!isPlainObject(target)) {
        return target;
    }
    const props = Object.getOwnPropertyNames(target);
    const symbols = Object.getOwnPropertySymbols(target);
    return [...props, ...symbols].reduce((carry, key) => {
        // Skip __proto__ properties to prevent prototype pollution
        if (key === '__proto__')
            return carry;
        if (isArray(options.props) && !options.props.includes(key)) {
            return carry;
        }
        const val = target[key];
        const newVal = copy(val, options);
        assignProp(carry, key, newVal, target, options.nonenumerable);
        return carry;
    }, {});
}

export { copy as c };
//# sourceMappingURL=index-58d55e2c.js.map
