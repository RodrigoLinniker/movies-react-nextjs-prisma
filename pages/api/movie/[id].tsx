import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function movie(req: NextApiRequest, res: NextApiResponse) {
  await axios
    .all([
      axios.get(
        `${process.env.API_BASE}/movie/${req.query.id}?api_key=${process.env.API_KEY}&language=pt-BR`
      ),
      axios.get(
        `${process.env.API_BASE}/movie/${req.query.id}/videos?api_key=${process.env.API_KEY}&language=pt-BR`
      ),
    ])

    .then(
      axios.spread((response1, response2) => {
        res.status(200).json({
          info: response1.data,
          video: response2.data.results,
        });
      }),
      (error) => {
        console.log(error);
      }
    );
}
