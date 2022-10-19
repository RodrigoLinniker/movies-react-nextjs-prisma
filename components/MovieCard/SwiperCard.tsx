import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from ".";

interface ListProps {
  list: Array<ListMovie>;
  width: number;
  height: number;
  slidesPerView: number;
  slidesPerGroup: number;
  swiperButtonPrev: string;
  swiperButtonNext: string;
}

type ListMovie = {
  id: number;
  title: string;
  poster_path: string;
};

export function SwiperCard({
  list,
  width,
  height,
  slidesPerView,
  slidesPerGroup,
  swiperButtonPrev,
  swiperButtonNext,
}: ListProps) {
  return (
    <div className="w-full max-w-[1644px] mx-auto">
      <div className="w-full flex max-w-[1643px] mx-auto items-center justify-center">
        <div className={`${swiperButtonPrev} cursor-pointer`}>
          <BsChevronLeft size={40} className="text-white" />
        </div>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          loopFillGroupWithBlank={true}
          navigation={{
            nextEl: `.${swiperButtonNext}`,
            prevEl: `.${swiperButtonPrev}`,
          }}
          breakpoints={{
            768: {
              slidesPerView: slidesPerView,
              slidesPerGroup: slidesPerGroup,
            },
          }}
          mousewheel={true}
          modules={[Pagination, Navigation]}
          className="w-full"
        >
          {list.map((item: ListMovie) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard
                  width={width}
                  height={height}
                  movieId={item.id}
                  poster_path={item.poster_path}
                  title={item.title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={`${swiperButtonNext} cursor-pointer`}>
          {" "}
          <BsChevronRight size={40} className="text-white" />
        </div>
      </div>
    </div>
  );
}
