var s = require('net').Socket();
s.connect(3005,'139.59.239.80');
s.write('Hello How are you');
setTimeout(function(){
	s.write('Hi');
},3000);
setTimeout(function(){
	s.end();
},6000);
// s.end();