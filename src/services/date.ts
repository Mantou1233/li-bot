
Object.defineProperties(Date.prototype, {
	toTSVString: {
		value: function () {
			return (this as Date)
				.toISOString()
				.replace(/T/g, " ")
				.replace("Z", "");
		},
		enumerable: false
	}
});
