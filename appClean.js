var dirty = "<p class='sdfdsf'>sdhfdsufhsdiufdsf</p>"
function clean() {
    var sanitizeHtml = require('sanitize-html');
    //var decode = require('unescape');
      console.log('dirty html is: ' + dirty);
    const fs = require('fs');
    const clipboardy = require('clipboardy');
  //var dirty = fs.readFileSync("dirty.html", "utf8");
  //console.log("Paste your HTML now!");

  var clean = sanitizeHtml(dirty, {
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
  var cleanRemoveEntities = entities.decode(clean);
   fs.writeFile("clean.html", cleanRemoveEntities, function(err) {
      if(err) {
          return console.log(err);
      }
  // console.log("The file was saved!");


//console.log(cleanRemoveEntities);
   });
return cleanRemoveEntities;
}
var result = clean(dirty);
console.log('the clean HTML is ' + result);
