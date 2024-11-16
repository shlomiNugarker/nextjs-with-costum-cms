export const HeroImg = ({ href = "" }) => {
  return (
    <svg
      className="h-full w-full animate-fade-in-up min-h-[450px]"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="img1" x="0" y="0" width="1" height="1">
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMaxYMax slice"
            href={href}
          />
        </pattern>
      </defs>
      <path
        fill="url(#img1)"
        d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
};
