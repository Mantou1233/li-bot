Object.defineProperties(Date.prototype, {
    toTSVString: {
        value: function () {
            return this
                .toISOString()
                .replace(/T/g, " ")
                .replace("Z", "");
        },
        enumerable: false
    }
});
//# sourceMappingURL=date.js.map