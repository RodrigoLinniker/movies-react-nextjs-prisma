import Image from "next/image";
import Link from "next/link";
import LogoPoster from "../../assets/posterNull.svg";

interface MovieCardProps {
  movieId: number;
  poster_path: string;
  title: string;
  width: number;
  height: number;
}

export function MovieCard({
  movieId,
  poster_path,
  title,
  width,
  height,
}: MovieCardProps) {
  return (
    <Link href={`/movie/${movieId}`}>
      <a>
        <div className="w-full relative">
          <div className="text-center">
            {poster_path === null || poster_path === undefined ? (
              <Image
                src={LogoPoster}
                width={width}
                height={height}
                alt="Logo"
              />
            ) : (
              <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                width={width}
                height={height}
                alt="Movie"
              />
            )}
          </div>
          {width === 292 ? (
            <div className="w-full max-sm:max-w-[292px] sm:max-w-[292px] m-auto pt-16 pb-4 px-4 bg-game-gradient absolute bottom-[6px] left-0 right-0">
              <strong className="font-medium lg:text-2xl">{title}</strong>
            </div>
          ) : (
            <div className="w-full max-sm:max-w-[504px] sm:max-w-[504px] m-auto pt-16 pb-4 px-4 bg-game-gradient absolute bottom-[6px] left-0 right-0">
              <strong className="font-medium lg:text-2xl">{title}</strong>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
}
