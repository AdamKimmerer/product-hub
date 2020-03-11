const express = require('express');
const app = express();
const port = 5000;
const xmlparser = require('express-xml-bodyparser');



//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use(xmlparser());

//require('./routes')(app);

app.get('/', (req, res) => {
	res.send('PORT 5000');
})

// app.post('/sign-in', (req, res, next) => {
// 	var xmlBodyStr = `<tsRequest>
//           <credentials name="akimmerer@cihi.ca" password="Pogoships34!">
//             <site contentUrl="producthubdev142028" />
//           </credentials>
//         </tsRequest>`;

//     fetch('https://10ax.online.tableau.com/api/3.4/auth/signin', {
//     	method: 'POST',
//     	mode: 'no-cors',
//     	headers: {
// 	      'Content-Type': 'text/xml'
// 	    },
// 	    body: xmlBodyStr})
//     	.then(res => {
//     		console.log(res)
//     	})
//     })

app.get('/sign-in', function(req, res, next) {
 var options = req.body;
 var settings = {
  "rejectUnauthorized": false,
        "url":"https://10ax.online.tableau.com/api/3.4/auth/signin",
        "method": "POST",
        "headers":{},
        "body":"<tsRequest>\n \t<credentials name=\"akimmerer@cihi.ca\" password=\"tabTesterino1!\">\n \t\t<site contentUrl=\"producthubdev142028\" />\n \t</credentials>\n</tsRequest>"
      }
 console.log ('Input for post',settings);
 request(settings, function(e, r, data) {
  if (e){
   console.log ('Error',e);
  } else{
   console.log ('In data');
   res.end(data);
  }
 });
});


app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})