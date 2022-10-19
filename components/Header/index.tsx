import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

interface HeaderProps {
  session: Session;
  children?: React.ReactNode;
  page?: boolean;
}

export function Header({ session, children, page }: HeaderProps) {
  const urlImage = session?.user?.image;

  return (
    <div className="w-full bg-[#111111]">
      <div className="max-w-[1644px] m-auto flex items-center justify-between py-3 px-10 max-sm:px-5">
        <Link href="/dashboard">
          <a>
            <h1 className="text-3xl max-sm:text-lg font-bold tracking-tight">
              Movies
              <span className="ml-1 text-blue-500 ">.</span>
            </h1>
          </a>
        </Link>

        {children}

        <div className="flex gap-7 items-center justify-center">
          <div className="flex items-center gap-3 max-sm:gap-1">
            <div
              className={`flex flex-col max-sm:hidden ${
                page ? "" : ` sm:hidden lg:flex`
              } `}
            >
              <h1 className="text-right">{`${session?.user?.name}`}</h1>
              <h1 className="text-xs text-gray-500 text-right">{`${session?.user?.email}`}</h1>
            </div>
            {urlImage && urlImage.length ? (
              <div className={`flex ${page ? "" : "max-sm:hidden"}`}>
                <Image
                  src={urlImage}
                  className=" rounded-full ring-2 ring-[#111111] "
                  width="45px"
                  height="45px"
                  alt="avatar"
                />
              </div>
            ) : (
              <CgProfile className="max-sm:hidden sm:w-8 sm:h-8 lg:w-10 lg:h-10 " />
            )}
          </div>
          <button className="hover:text-gray-500" onClick={() => signOut()}>
            {" "}
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
