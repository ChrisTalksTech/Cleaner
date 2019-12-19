
function getInput() {
  var x = document.getElementById("input").value;
  var dirty = x;
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

      cleanhtml = cleanhtml.replace(/&/g, '&amp;').replace(/&nbsp;/g, ' ').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/&quot;	/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&cent;/g, '¢')
      .replace(/&yen;/g, '¥')
      .replace(/&euro;/g, '€')
      .replace(/&copy;/g, '©')
      document.getElementById("displayClean").innerHTML = cleanhtml;

         return cleanhtml;
     }
     window.getInput = getInput;
