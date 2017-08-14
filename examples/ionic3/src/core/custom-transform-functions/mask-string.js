"use strict";
exports.__esModule = true;
function maskString(mask, maskPatterns) {
    return function (value) {
        value = (typeof value === 'string' || value instanceof String) ? value : '';
        mask = mask || '';
        maskPatterns = maskPatterns || {};
        var maskedValue = '';
        var valueParts = value.split('');
        var maskParts = mask.split('');
        while (valueParts.length > 0) {
            var unmaskedChar = valueParts.shift();
            while (unmaskedChar !== null) {
                var maskChar = maskParts.shift();
                if (maskChar !== undefined) {
                    var maskPattern = maskPatterns[maskChar.toUpperCase()];
                    if (maskPattern !== undefined) {
                        var check = false;
                        if (typeof maskPattern === 'function') {
                            check = maskPattern(unmaskedChar);
                        }
                        else if (maskPattern instanceof RegExp) {
                            check = maskPattern.test(unmaskedChar);
                        }
                        if (check) {
                            maskedValue += unmaskedChar;
                        }
                        else {
                            maskParts.unshift(maskChar);
                        }
                        unmaskedChar = null;
                    }
                    else {
                        maskedValue += maskChar;
                    }
                }
                else {
                    unmaskedChar = null;
                }
            }
        }
        return {
            name: "maskString",
            result: maskedValue,
            previous: value
        };
    };
}
exports.maskString = maskString;
