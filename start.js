const express = require("express");
const app = express();
const bodyparser = require("body-parser");
var cors = require('cors')

const port = process.env.PORT || 3200;


//Middle ware

//app.use(bodyparser.json());
app.use(cors())
app.use(bodyparser.text({limit: '0.1mb'}))
app.use(bodyparser.urlencoded({ extended: false }));
const orders = [];

/**
 * creating a New order
 */
//Access-Control-Allow-Origin insert somewhere
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


 app.post("/post_test", (req, res) => {
   const form = req.body;
   const dirty = req.body;
  // console.log(dirty);



   //Cleaner Code
   function clean() {
       var sanitizeHtml = require('sanitize-html');
       //var decode = require('unescape');
         console.log('dirty html is: ' + dirty);

     var cleanhtml = sanitizeHtml(dirty, {
       allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
         'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'div',
         'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ],
       allowedAttributes: {
         a: [ 'href', 'name', 'target' ],
         // We don't currently allow img itself by default, but this
         // would make sense if we did. You could add srcset here,
         // and if you do the URL is checked for safety
         img: [ 'src' ]
       },
       // Lots of these won't come up by default because we don't allow them
       selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
       // URL schemes we permit
       allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
       allowedSchemesByTag: {},
       allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
       allowProtocolRelative: true
     });

     const Entities = require('html-entities').XmlEntities;
     var entities = new Entities();
     var cleanRemoveEntities = entities.decode(cleanhtml);
     //console.log(cleanRemoveEntities)

    console.log('cleaned HTML is: ' + cleanhtml);

       return cleanhtml;
   }

var send = clean(dirty);

   res.end(send);


 });


/**
 *  Getting All orders
 */



app.listen(port, () => {
  console.log(`running at port ${port}`);
});
