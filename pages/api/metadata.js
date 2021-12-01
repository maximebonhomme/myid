import axios from 'axios';

export default function handler(req, res) {
  const { body } = req;

  axios
    .get(body.tokenURI)
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
