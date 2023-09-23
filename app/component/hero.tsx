import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="lg:max-w-[1135px] mx-auto mt-20 mb-5">
      <div className="flex flex-col min-[700px]:flex-row  bg-[#006097] rounded-3xl ">
        <div className="flex flex-col justify-between md:justify-evenly p-5 px-7  min-[700px]:w-1/2 space-y-4">
          <h1 className="flex flex-wrap font-medium  text-left md:text[40px] text-3xl  md:mt-12 md:mt14 md:text-6xl text-white">
            Xarbon&nbsp; <span> Xredit </span>
          </h1>

          <p className="text-xl font-extralight text-[#BBB7B7] text-left min-[1150px]:max-w-[700px] flex   md:font-light md:text-2xl">
            A community-driven carbon score and rating system developed on the
            XRPL blockchain where individuals can rate companies based on their
            environmental activities.
          </p>
          <div className=" block md:h36 md:h-32"></div>
          {/* Hero Button */}
          <div className="flex min-[990px]:flex-row flex-col justify-start  min-[990px]:space-x-3 min-[990px]:space-y-0 space-y-3">
            <Link href="/compete" className="flex bg-black">
              <button className="w-full min-[990px]:text-lg text-base  flex items-center p-[1px] justify-between bg-gradient-95 from-button-start from-[-20%] via-button-mid via-46% to-button-end to-110% rounded-lg">
                <div className="hover:bg-[#0f0f0f] bg-transparent p-3 flex flex-row rounded-lg w-full justify-between text-white ">
                  <h1 className="flex">Apply</h1>
                  <span className="ml-2 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="26"
                      fill="none"
                      viewBox="0 0 31 26"
                    >
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M2 2l13.428 11.237L2 24.474M16 2l13.428 11.237L16 24.474"
                      ></path>
                    </svg>
                  </span>
                </div>
              </button>
            </Link>
            <Link
              href="http://eepurl.com/ibu1vL"
              target="_blank"
              className="flex "
            >
              <button className="w-full min-[990px]:text-lg text-base  flex items-center p-[1px]  bg-gradient-95 from-button-start from-[-20%] via-button-mid via-46% to-button-end to-110% rounded-lg">
                <div className="bg-[#a29083] hover:bg-transparent flex flex-row rounded-lg p-3 w-full justify-between text-white ">
                  <h1 className="flex">Join Newsletter</h1>
                  <span className="ml-2 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="26"
                      fill="none"
                      viewBox="0 0 31 26"
                    >
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M2 2l13.428 11.237L2 24.474M16 2l13.428 11.237L16 24.474"
                      ></path>
                    </svg>
                  </span>
                </div>
              </button>
            </Link>
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
