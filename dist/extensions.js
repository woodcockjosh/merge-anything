"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatArrays = concatArrays;
const is_what_1 = require("@cryptexlabs/is-what");
function concatArrays(originVal, newVal) {
    if ((0, is_what_1.isArray)(originVal) && (0, is_what_1.isArray)(newVal)) {
        return originVal.concat(newVal);
    }
    return newVal;
}
//# sourceMappingURL=extensions.js.map