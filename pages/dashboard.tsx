import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsSearch } from "react-icons/bs";
import { SwiperCard } from "../components/MovieCard/SwiperCard";
import { GetServerSideProps } from "next";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { Heading } from "../components/Heading";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/trending`);
  const json = await res.data;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      listTrending: json.listTrending,
      listPopular: json.listPopular,
    },
  };
};

export default function Dashboard({ listTrending, listPopular }) {
  const { data: session } = useSession();
  const [busca, setBusca] = useState("");
  const [movie, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (busca !== "") {
        const searchList = await axios.get(`/api/search?q=${busca}`);
        const jsonSearch = await searchList.data;
        setMovie(jsonSearch.list);
      }
    };
    handleSearch();
  }, [busca]);

  return (
    <div>
      <Head>
        <title>DashBoard</title>
      </Head>

      <Header session={session}>
        <label className="flex py-3 px-8 max-sm:px-4 ml-6 max-sm:ml-3 max-w-[400px] self-center gap-2 items-center bg-neutral-800 relative rounded-full max-sm:max-w-[225px] max-sm:mr-1 ">
          <input
            type="text"
            className=" bg-neutral-800 px-4 mr-4 outline-0 max-sm:max-w-[130px]"
            placeholder="Buscar filme..."
            value={busca}
            onChange={(event) => {
              setBusca(event.target.value);
            }}
          />

          <BsSearch size={20} />
        </label>
      </Header>
      {busca === "" ? (
        <>
          <Heading>Tendência Semanal</Heading>
          <SwiperCard
            swiperButtonPrev={"butotn-1-prev"}
            swiperButtonNext={"button-1-next"}
            list={listTrending}
            width={292}
            height={440}
            slidesPerView={5.5}
            slidesPerGroup={5}
          />

          <Heading>Mais Populares</Heading>

          <SwiperCard
            swiperButtonPrev={"butotn-2-prev"}
            swiperButtonNext={"button-2-next"}
            list={listPopular}
            width={504}
            height={736}
            slidesPerView={3.5}
            slidesPerGroup={3}
          />
        </>
      ) : (
        <div className="w-full flex gap-2 max-w-[1644px] m-auto py-6 items-center max-md:justify-center ">
          <div className="grid gap-5 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-3 mx-auto items-center">
            {movie.map((item: Movie) => (
              <MovieCard
                key={item.id}
                width={292}
                height={440}
                movieId={item.id}
                poster_path={item.poster_path}
                title={item.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
