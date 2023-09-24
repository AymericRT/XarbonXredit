import Link from "next/link";
import Image from "next/image";
import FormElements from "./whitelist";
export default function Hero() {
  return (
    <div className="lg:max-w-[1135px] mx-auto mt-20 mb-5">
      <div className="flex flex-col min-[700px]:flex-row  bg-[#006097] rounded-3xl ">
        <div className="flex flex-col justify-between p-5 md:py-14 py-5  min-[700px]:w-1/2 space-y-2">
          <h1 className="flex flex-wrap font-medium  text-left md:text[40px] text-3xl md:text-6xl text-white">
            Xarbon&nbsp; <span> Xredit </span>
          </h1>

          <p className="text-xl font-extralight text-[#BBB7B7] text-left min-[1150px]:max-w-[700px] flex   md:font-light md:text-2xl">
            A community-driven carbon score and rating system developed on the
            XRPL blockchain where individuals can rate companies based on their
            environmental activities.
          </p>
          <div className="flex "></div>
          {/* Hero Button */}
          <div className="flex min-[990px]:flex-row flex-col justify-start  min-[990px]:space-x-3 min-[990px]:space-y-0 space-y-3">
            <FormElements />
          </div>
        </div>
        {/* className="overflow-hidden bg-gray600 bg-bgtable rounded-[1.25rem]
    border border-[#898585] mx-auto mt-20 sm:max-w-[38rem] sm:min-w/[24rem]
    md:ml-28 w-full" */}
        <div className=" m-2 rounded-xl md:w-1/2 bg-[#00aae4] hidden min-[700px]:flex items-center">
          <Image
            src="/xx.svg"
            width={500}
            height={500}
            alt="RareSkills Logo"
            className="mx-auto p-5"
          />
        </div>
      </div>
    </div>
  );
}
