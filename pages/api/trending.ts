import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function trending(req: NextApiRequest, res: NextApiResponse)  {
    await axios.all([
      axios.get(`${process.env.API_BASE}/trending/movie/week?api_key=${process.env.API_KEY}&language=pt-BR`),
      axios.get(`${process.env.API_BASE}/movie/popular?api_key=${process.env.API_KEY}&language=pt-BR`),
    ]).then(axios.spread((response1, response2) => {
      res.status(200).json({listTrending : response1.data.results, listPopular: response2.data.results})
    }), error => {
      console.log(error);
    });
  }