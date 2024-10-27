import { Image, Link } from "@chakra-ui/react";

export default function Header() {
  return (
    <header>
      <div className="NavBar flex">
        <div className="logo flex-row">
          <Link href="#">
            <Image
              src="/FinditFasterLOGObigger.png"
              alt="Find if Faster Logo"
              className="logo pl-10"
            />
          </Link>
        </div>
        <div className="p-8">
          <ul className="flex justify-between">
            <li className="about pr-10 justify-between">
              <Link href="about" className=" justify-between">
                About
              </Link>
            </li>
            <li className="locations pr-10">
              <Link href="/business">Businesses</Link>
            </li>
            <li className="categories pr-10">
              <Link href="/categories">Categories</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
