import "./testimonial.css";
import TestimonialCard from "./TestimonialCard";
import { cardsData } from "./testimonial.data";
import Title from "../Title";

const Testimonial = () => {
  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 max-w-7xl mx-auto text-white">
      <Title
        title="Why Customers Love LuxCar"
        subTitle="From booking to drop-off, see how LuxCar delivers a premium experience every time."
      />

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-12">
        <div
          className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none 
        bg-linear-to-r from-dark to-transparent"
        ></div>

        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>

        <div
          className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none 
        bg-linear-to-l from-dark to-transparent"
        ></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-6">
        <div
          className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none 
        bg-linear-to-r from-dark to-transparent"
        ></div>

        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>

        <div
          className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none 
        bg-linear-to-l from-dark to-transparent"
        ></div>
      </div>
    </div>
  );
};

export default Testimonial;
