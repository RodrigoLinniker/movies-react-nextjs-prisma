import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import { BlackDrop } from "../../components/BlackDrop";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const res = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/movie/${context.params.id}`
  );

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
      info: json.info,
      video: json.video,
    },
  };
};

export default function MovieItem({ info, video }) {
  const { data: session } = useSession();
  const idVideo = video[0]?.key;

  return (
    <div className="min-h-screen">
      <Header page={true} session={session} />

      {idVideo === undefined || idVideo === null ? (
        <BlackDrop info={info} />
      ) : (
        <BlackDrop info={info} idVideo={idVideo} />
      )}

      <div className="w-full flex flex-col mx-auto items-center max-w-[1100px] gap-4 mt-5 px-2">
        <strong className="font-medium max-sm:text-4xl text-5xl">
          {info.title}
        </strong>

        <h1 className="text-justify">{info.overview}</h1>
      </div>
    </div>
  );
}
