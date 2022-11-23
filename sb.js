const c = new Date(1669209194198);
c.setMinutes(c.getMinutes() - 52);
console.log(c.getTime());
/*const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);

console.log(yesterday.getTime());
/*
const p = {
	lastSign: new Date(yesterday)
};
const g = {
	lastSign: new Date(yesterday)
};

const dp = new Date(p.lastSign);
const dg = new Date(g.lastSign);

const dn = new Date();

const dt = new Date(dn);

dt.setDate(dt.getDate() + 1);
dt.setHours(0, 0, 0, 0);

const dk = new Date(dp);
dk.setDate(dp.getDate() + 1);
dk.setHours(0, 0, 0, 0);

gd(dp, dg, dn, dt, dk);

if (dp.getDay() == dn.getDay()) {
	console.log("nodate");
}

if (dg.getDay() !== dn.getDay()) {
	console.log("no");
}

if (dn.getDay() == dk.getDay()) {
	console.log("combo!!");
} else {
	console.log("no combo");
}

function gd(...date) {
	for (let dat of date) {
		console.log(dat.getDay());
	}
}

*/
