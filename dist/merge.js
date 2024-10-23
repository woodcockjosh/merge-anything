"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = merge;
exports.mergeAndCompare = mergeAndCompare;
exports.mergeAndConcat = mergeAndConcat;
const is_what_1 = require("@cryptexlabs/is-what");
const extensions_js_1 = require("./extensions.js");
function assignProp(carry, key, newVal, originalObject) {
    const propType = {}.propertyIsEnumerable.call(originalObject, key)
        ? 'enumerable'
        : 'nonenumerable';
    if (propType === 'enumerable')
        carry[key] = newVal;
    if (propType === 'nonenumerable') {
        Object.defineProperty(carry, key, {
            value: newVal,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }
}
function mergeRecursively(origin, newComer, compareFn) {
    if (!(0, is_what_1.isPlainObject)(newComer))
        return newComer;
    let newObject = {};
    if ((0, is_what_1.isPlainObject)(origin)) {
        const props = Object.getOwnPropertyNames(origin);
        const symbols = Object.getOwnPropertySymbols(origin);
        newObject = [...props, ...symbols].reduce((carry, key) => {
            const targetVal = origin[key];
            if ((!(0, is_what_1.isSymbol)(key) && !Object.getOwnPropertyNames(newComer).includes(key)) ||
                ((0, is_what_1.isSymbol)(key) && !Object.getOwnPropertySymbols(newComer).includes(key))) {
                assignProp(carry, key, targetVal, origin);
            }
            return carry;
        }, {});
    }
    const props = Object.getOwnPropertyNames(newComer);
    const symbols = Object.getOwnPropertySymbols(newComer);
    const result = [...props, ...symbols].reduce((carry, key) => {
        let newVal = newComer[key];
        const targetVal = (0, is_what_1.isPlainObject)(origin) ? origin[key] : undefined;
        if (targetVal !== undefined && (0, is_what_1.isPlainObject)(newVal)) {
            newVal = mergeRecursively(targetVal, newVal, compareFn);
        }
        const propToAssign = compareFn ? compareFn(targetVal, newVal, key) : newVal;
        assignProp(carry, key, propToAssign, newComer);
        return carry;
    }, newObject);
    return result;
}
function merge(object, ...otherObjects) {
    return otherObjects.reduce((result, newComer) => {
        return mergeRecursively(result, newComer);
    }, object);
}
function mergeAndCompare(compareFn, object, ...otherObjects) {
    return otherObjects.reduce((result, newComer) => {
        return mergeRecursively(result, newComer, compareFn);
    }, object);
}
function mergeAndConcat(object, ...otherObjects) {
    return otherObjects.reduce((result, newComer) => {
        return mergeRecursively(result, newComer, extensions_js_1.concatArrays);
    }, object);
}
//# sourceMappingURL=merge.js.map