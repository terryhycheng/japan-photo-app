import CustomButton from "@/components/CustomButton";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-photo relative flex-1">
      {/* Mobile */}
      <div className="absolute bottom-0 z-20 flex max-h-[80vh] flex-col justify-end gap-2 px-4 sm:right-[5vw] lg:hidden">
        <div className="relative">
          <Image
            src="/images/talk-bubble.png"
            alt="person"
            className="mr-10 h-full max-h-[23vh] w-full object-contain"
            width={1000}
            height={1000}
          />
          <div className="absolute top-1/2 left-1/2 z-10 w-[20rem] -translate-x-1/2 -translate-y-1/2 md:w-[25rem]">
            <p className="font-dale text-center text-4xl sm:text-5xl">
              写真が一所懸命に撮りました!
            </p>
          </div>
        </div>
        <Image
          src="/images/bg-person.png"
          alt="talk-bubble"
          className="ml-20 h-full max-h-[60vh] w-full object-contain"
          width={1000}
          height={1000}
        />
      </div>
      {/* Desktop */}
      <div className="absolute right-[10vw] bottom-0 z-20 hidden h-[50vh] w-[800px] lg:block lg:h-[60vh]">
        <Image
          src="/images/bg-person.png"
          alt="talk-bubble"
          className="absolute right-0 bottom-0 h-full w-fit max-w-none object-contain object-bottom"
          width={1000}
          height={1000}
        />
        <Image
          src="/images/talk-bubble.png"
          alt="person"
          className="absolute -top-70 left-50 -z-10 h-fit w-[35rem] object-contain object-top lg:-top-30 lg:-left-70"
          width={1000}
          height={1000}
        />
        <div className="absolute -top-50 left-50 z-10 flex h-[10rem] w-[25rem] items-center justify-center lg:-top-16 lg:-left-50">
          <p className="font-dale text-center text-5xl">
            写真が一所懸命に撮りました!
          </p>
        </div>
      </div>
      <div className="absolute bottom-[2vh] left-1/2 z-20 flex -translate-x-1/2 flex-col gap-4">
        <CustomButton
          href="/results"
          className="relative z-20 flex w-[90vw] justify-center text-2xl lg:hidden"
          isDarkenText
          text="結果発表"
          colour="#86CBC4"
          icons={{ IconRight: ArrowRightIcon }}
        />
        <Link
          href="/login"
          className="font-kiwimaru relative z-20 flex w-[90vw] justify-center text-xl font-light tracking-[0.2rem] text-white underline lg:hidden"
        >
          評審登入
        </Link>
      </div>
    </main>
  );
}
