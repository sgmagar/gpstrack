var s = require('net').Socket();
s.connect(3005,'192.168.0.103');
s.write('Hello');
s.end();