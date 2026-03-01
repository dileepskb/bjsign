import Image from "next/image";
export default function LoginImage() {
  return (
    <>
      <h2 className="text-2xl text-black font-bold">
        Looks like you're new here!
      </h2>
      <p className=" text-black">
        Sign up with your mobile number to get started
      </p>
      <div className="mt-10">
        <Image src="/login.png" alt="" width="740" height="80" />
      </div>
    </>
  );
}
