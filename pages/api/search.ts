import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function search(req: NextApiRequest, res: NextApiResponse)  {
    await axios.get(`${process.env.API_BASE}/search/movie?api_key=${process.env.API_KEY}&language=pt-BR&query=${req.query.q}`).then(response => {
      res.status(200).json({list : response.data.results})
    }, error => {
      console.log(error);
    });
  }