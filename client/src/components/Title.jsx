const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div
      className={`flex flex-col justify-center ${
        align === "left" ? "items-start text-left" : "items-center text-center"
      }`}
    >
      <h1 className="font-nevera text-4xl md:text-[48px] text-primary tracking-wide leading-tight relative inline-block">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-2xl rounded-full"></span>

        {title}
      </h1>

      {subTitle && (
        <p className="mt-3 text-neutral-200 max-w-md md:max-w-lg">{subTitle}</p>
      )}
    </div>
  );
};

export default Title;
