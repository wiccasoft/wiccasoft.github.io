var http = require('http');

http.createServer(function(request, response) {
  var options = {
    hostname: 'www.youtube.com',
    port: 80,
    path: request.url,
    method: request.method
  }

  // do proxy request
  var proxy = http.request(options, function(res) {

    var data = ''
    // response back from proxy request
    res.setEncoding('utf8');
    res.on('data', function(chunk) {

      data += chunk
      
    });

    res.on('end', function() {
      // end output to browser
      data = data.replace(/youtube.com/g, "proxytube.nodejitsu.com")
      response.write(data, 'binary');
      response.end();
      proxy.end();
    });

    response.writeHead(res.statusCode, res.headers);
  });

  // handle error
  proxy.on('error', function(e) {
    reponse.write("problem with request: " + e.message);
    reponse.end();
  });

  // write data to request body
  request.on('data', function(chunk) {
    proxy.write(chunk, 'binary');
  });

  request.on('end', function() {
    proxy.end();
  });

}).listen(8000);
