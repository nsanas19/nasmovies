import Image from "next/image";
import React from "react";



const Logo = ({ style }) => {
  return (
   <div  >
      <Image
        src="/img/logosm.png"
        className={style}
        width={400}
        height={200}
      />
      
    </div>

    
  );
};

export default Logo;