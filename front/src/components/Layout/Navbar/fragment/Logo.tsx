import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";

const Logodiv = styled.div`
  display: flex;
  position: relative;
  width: 6rem;
  height: 1.5rem;
`;

export default function Logo() {
  return (
    <Logodiv>
      <Link href="/" passHref>
        <Image
          src="/logo.png"
          alt="logo icon"
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </Link>
    </Logodiv>
  );
}
