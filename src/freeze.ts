export const deepFreeze = <T>(input: T) => {
    Object.freeze(input);

    Object
        .getOwnPropertyNames(input)
        .forEach((prop) => {
            if (
                input.hasOwnProperty(prop)
                && input[prop] !== null
                && (typeof input[prop] === "object" || typeof input[prop] === "function")
                && !Object.isFrozen(input[prop])
            ) {
                deepFreeze(input[prop]);
            }
        });

    return input as T;
};

export const unfreeze = <T>(input: T) => {
    let output;
    if (Array.isArray(input)) {
        output = input.map(item => {
            return item;
        });
    } else {
        output = {};
        for (const property in input) {
            if (input.hasOwnProperty(property)) {
                output[property] = input[property];
            }
        }
    }

    Object.setPrototypeOf(output, Object.getPrototypeOf(input));

    return output as T;
};

export const deepUnfreeze = <T>(input: T) => {
    const unfrozenInput = unfreeze(input);
    Object
        .getOwnPropertyNames(unfrozenInput)
        .forEach(function (prop) {
            if (
                unfrozenInput.hasOwnProperty(prop)
                && unfrozenInput[prop] !== null
                && (typeof unfrozenInput[prop] === "object" || typeof unfrozenInput[prop] === "function")
                && Object.isFrozen(unfrozenInput[prop])
            ) {
                deepUnfreeze(unfrozenInput[prop]);
            }
        });

    return unfrozenInput;
};