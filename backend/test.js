const axios = require('axios');

async function code() {
  const response = await axios.post(
    'https://dreamy-ptolemy-eb4e80.netlify.app',
    {
      code: 'this sucks',
    }
  );

  console.log(response);
}

code();
