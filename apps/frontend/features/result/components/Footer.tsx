import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <>
      <section className="bg-[#F8D6C1] py-10">
        <div className="container mx-auto flex items-center justify-center gap-10">
          <Image
            src="/images/camera.png"
            alt="footer"
            width={150}
            height={150}
          />
          <div className="font-kiwimaru flex flex-col gap-4 tracking-wider">
            <h2 className="text-4xl">對賽果感到不公？</h2>
            <p>如果你對賽果有不同的意見，唯有學會去接受吧 :)</p>
          </div>
        </div>
      </section>
      <footer className="bg-main py-10 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Image
            src="/images/logo-footer.png"
            alt="footer"
            width={200}
            height={150}
          />
          <p className="font-kiwimaru w-[250px] text-right">
            此網站純粹為私人娛樂用途，並非為專業評審網站
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
