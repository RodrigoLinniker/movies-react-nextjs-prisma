import Image from "next/image";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";

interface BlackDropProps {
  idVideo?: number;
  info: any;
}

export function BlackDrop({ info, idVideo }: BlackDropProps) {
  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div>
        {info.backdrop_path === null || info.backdrop_path === undefined ? (
          <div className="w-[1100px] h-[60vh] m-auto bg-black flex items-center justify-center">
            <strong className="font-medium text-3xl text-red-500">
              Não possui capa do Filme
            </strong>
          </div>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`}
            width="1100px"
            height="618px"
            alt="backdrop"
          />
        )}
      </div>
      {idVideo ? (
        <Link href={`https://www.youtube.com/watch?v=${idVideo}`}>
          <a>
            <strong className="flex gap-2 items-center font-medium text-3xl text-red-500 hover:text-red-600 delay-75 ">
              <BsYoutube /> Assistir trailer
            </strong>
          </a>
        </Link>
      ) : (
        <strong className="font-medium text-3xl text-red-500 ">
          Não possui vídeo
        </strong>
      )}
    </div>
  );
}
