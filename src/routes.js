const fs = require('fs');

const requestHandler = (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/') {
    res.write('<html>');
    res.write('<head>');
    res.write('<title>my server</title>');
    res.write('</head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send<button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    const response = [];

    req.on('data', (chunk) => {
      response.push(chunk);
    });

    return req.on('end', () => {
      const parsedResponse = Buffer.concat(response).toString();
      const message = parsedResponse.split('=')[1];

      fs.writeFile('message.txt', message, (err) => {
        if (!err) {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        }
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head>');
  res.write('<title>my server</title>');
  res.write('</head>');
  res.write('<body><h1>My server</h1></body>');
  res.write('</html>');
  res.end();

  // process.exit();
};

module.exports = requestHandler;
