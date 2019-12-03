const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;


//Middle ware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


const orders = [];

/**
 * creating a New order
 */

 app.post("/post_test", (req, res) => {
   const form = req.body;
   const dirty = req.body.html;
   //console.log(html);

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

    console.log(cleanhtml);

       return cleanhtml;
   }

var send = clean(dirty);
   res.end(send);
 });


/**
 *  Getting All orders
 */

app.get("/get_orders", (req, res) => {
  res.status(200).send(orders);
});
app.get("/get_test", (req, res) => {
  res.status(200).send("hello");
});

/**
 * Update order
 */
app.patch("/order/:id", (req, res) => {
  const order_id = req.params.id;
  const order_update = req.body;
  for (let order of orders) {
    if (order.id == order_id) {
      if (order_update.food_name != null || undefined)
        order.food_name = order_update.food_name;
      if (order_update.food_qty != null || undefined)
        order.food_qty = order_update.food_qty;
      if (order_update.customer_name != null || undefined)
        order.customer_name = order_update.customer_name;

      return res
        .status(200)
        .json({ message: "Updated Succesfully", data: order });
    }
  }

  res.status(404).json({ message: "Invalid Order Id" });
});

/**
 * Delete Order
 */
app.delete("/order/:id", (req, res) => {
  const order_id = req.params.id;

  for (let order of orders) {
    if (order.id == order_id) {
      orders.splice(orders.indexOf(order), 1);

      return res.status(200).json({
        message: "Deleted Successfully"
      });
    }
  }

  res.status(404).json({ message: "Invalid Order Id" });
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
