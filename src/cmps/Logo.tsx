import React from "react";

export const Logo = ({ siteName }: { siteName: string }) => {
  return (
    <span className="text-3xl font-bold text-customNavy">
      {siteName.split(" ")[0]}
      <span className="text-customGreen">{siteName.split(" ")[1]}</span>.
    </span>
  );
};
