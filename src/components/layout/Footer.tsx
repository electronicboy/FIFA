import Image from "next/image";

export default function Footer() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6 text-center items-center ">
      <div>
        <Image
          src="/LogoTrans.png"
          width={100}
          height={40}
          alt="Find if Faster Logo"
          className="justify-items-center"
        />
        <br />
      </div>

      <div>
        <h2 className="text-fuchsia-400">Categories:</h2>
        <p>Category 1</p>
        <p>Category 2</p>
        <p>Category 3</p>
        <p>Category 4</p>
        <br />
      </div>
      <div>
        <h2 className="text-fuchsia-400">Location:</h2>
        <p>Location 1</p>
        <p>Location 2</p>
        <p>Location 3</p>
        <p>Location 4</p>
        <br />
      </div>
      <div>
        <h2 className="text-fuchsia-400">Resources:</h2>
        <p>About Us</p>
        <p>Write a Review</p>
        <p>Add a Business</p>
        <p>Search for a company</p>
        <br />
      </div>
    </div>
  );
}
