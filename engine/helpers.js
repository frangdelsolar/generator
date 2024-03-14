function camelCase(str) {
    if (typeof str !== "string") {
        return str; // Return the input as is if not a string
    }
    return str.replace(/^\w|[A-Z]/g, function (word) {
        return word.toUpperCase();
    });
}

function pluralize(str) {
    if (typeof str !== "string") {
        return str; // Return the input as is if not a string
    }
    const irregularCases = {
        person: "people",
        mouse: "mice",
    };

    if (irregularCases.hasOwnProperty(str)) {
        return irregularCases[str];
    }

    const lastLetter = str.charAt(str.length - 1);
    const exceptions = ["o", "s", "sh", "x", "ch"];

    if (exceptions.includes(lastLetter)) {
        return str + "es";
    } else if (lastLetter === "y" && str.slice(-2) !== "ay") {
        return str.slice(0, -1) + "ies";
    } else {
        return str + "s";
    }
}

module.exports = {
    camelCase,
    pluralize,
};
