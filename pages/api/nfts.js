import axios from 'axios';

export default function handler(req, res) {
  const { address, limit, offset } = req.query;

  axios
    .get('https://api.opensea.io/api/v1/assets', {
      params: {
        order_direction: 'desc',
        owner: address,
        offset,
        limit
      }
    })
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error
      });
    });
}
