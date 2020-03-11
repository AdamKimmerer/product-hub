var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const convert = require('xml-js');
let dataAsJson = {};

router.get('/', function(req, res, next) {

	var email = req.query.email;
	var password = req.query.password;

	const options = {
		method: 'POST',
    	credentials: 'include',
	    headers: {
	      'Content-Type': 'text/xml'
	    },
	    body: `<tsRequest>\n \t<credentials name=\"${email}\" password=\"${password}\">\n \t\t<site contentUrl=\"producthubdev142028\" />\n \t</credentials>\n</tsRequest>`
	}

	fetch("https://10ax.online.tableau.com/api/3.4/auth/signin", options)
		.then(response => response.text()).then(str => {
		    dataAsJson = JSON.parse(convert.xml2json(str));
		})
		.then(() => {
			let credentials = {
				token: dataAsJson.elements[0].elements[0].attributes.token,
				site: dataAsJson.elements[0].elements[0].elements[0].attributes.id,
				user: dataAsJson.elements[0].elements[0].elements[1].attributes.id
			};
		    res.send(credentials);
		})
		.catch(function(err) {
		  console.log('Fetch Error :-S', err);
		  res.send(err)
		});
});

module.exports = router;