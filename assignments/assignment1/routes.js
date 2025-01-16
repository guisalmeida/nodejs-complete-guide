const requestHandle = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html>');
    res.write('<body>');
    res.write(
      '<form action="/create-user" method="POST"><label>Username</label><input type="text" name="username"><button type="submit">send</button></form>'
    );

    res.write('</body>');
    res.write('</html>');
    res.end();
  }

  if (url === '/users') {
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>user 1</li>');
    res.write('<li>user 2</li>');
    res.write('<li>user 3</li>');
    res.write('<li>user 4</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const username = parsedBody.split('=')[1];

      res.write('<html>')
      res.write('<body>')
      res.write('<h1>' + username + '</h1>')
      res.write('</body>')
      res.write('</html>')
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
};

module.exports = requestHandle;
