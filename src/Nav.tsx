import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

type NavProps = {
  setModalDisplay: (modalDisplay: boolean) => void;
};
const Nav: React.FC<NavProps> = ({ setModalDisplay }: NavProps) => {
  return (
    <div className="nav">
      <p>Today</p>
      <IoAddCircleOutline onClick={() => setModalDisplay(true)} />
    </div>
  );
};

export default Nav;
