let user = {
  name: 'John',
  surname: 'Smith'
};

let response = await fetch('http://localhost:3200/post_test', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: "<p class='sdfsdf'sdfsiudfdf></p><p class='sdfsdf'sdfsiudfdf>this should return</p>"
});

let result = await response.json();
alert(result.message);
