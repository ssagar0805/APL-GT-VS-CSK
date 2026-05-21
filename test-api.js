const https = require('https');
const paths = [
    '/matches',
    '/live-matches',
    '/cricket/live',
    '/cricket/live-matches',
    '/get-live',
    '/v1/cricket/live',
    '/matches/list'
];

async function testPath(path) {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      hostname: 'free-cricbuzz-cricket-api.p.rapidapi.com',
      port: null,
      path: path,
      headers: {
        'X-RapidAPI-Key': '8c33d11f34msh0751cd2cb8ccf11p14d9e7jsnafcc80a6bf46',
        'X-RapidAPI-Host': 'free-cricbuzz-cricket-api.p.rapidapi.com'
      }
    };
    const req = https.request(options, function (res) {
      const chunks = [];
      res.on('data', function (chunk) { chunks.push(chunk); });
      res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(`Path: ${path} => Status: ${res.statusCode}, len: ${body.length}`);
        resolve();
      });
    });
    req.end();
  });
}

(async () => {
    for (const p of paths) {
        await testPath(p);
    }
})();
