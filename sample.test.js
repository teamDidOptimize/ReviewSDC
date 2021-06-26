const axios = require('axios');

describe('Tests for Reviews', function () {

  it('Should not error when querying the db', () => {
    axios.get('/fetchReviews', {params: {productId: 13023}})
      .then((res) => {
        console.log(res);
      })
      .catch((err)=> {
        return err;
      });
  });

});