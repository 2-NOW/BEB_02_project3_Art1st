import styled from "@emotion/styled";

import Logo from "../Navbar/fragment/Logo";
import Menu from "../Navbar/fragment/Menu";
import Searchbar from "./fragment/Searchbar";
import Signinbtn from "./fragment/Signinbtn";

const Nav = styled.div`
  position: sticky;
  top: 0;
  height: 7vh;
  z-index: 10;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  width: 100vw;

  .logo {
    margin: 1.2rem 0 1.2rem 4rem;
  }
`;

const Logindiv = styled.div`
  position: fixed;
  right: 4rem;
  display: flex;
`;

export default function Navbar() {
  return (
    <Nav>
      <div className="logo">
        <Logo />
      </div>
      <Menu />
      <Logindiv>
        <Searchbar />
        <Signinbtn />
      </Logindiv>
    </Nav>
  );
}
