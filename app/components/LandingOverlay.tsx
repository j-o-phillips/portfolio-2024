import Link from "next/link";

const LandingOverlay = () => {
  return (
    <div className="absolute w-full z-[100]">
      <div className="p-4 flex flex-row justify-between ">
        <Link href="/">Jake Phillips | Developer</Link>
        <div className="flex flex-row gap-4">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingOverlay;
