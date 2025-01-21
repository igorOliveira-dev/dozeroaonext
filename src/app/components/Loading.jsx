import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="p-4">
      <Image src="/logoPNG.png" height={50} width={50} alt="Logo" className="animate-spin" />
    </div>
  );
};

export default Loading;
