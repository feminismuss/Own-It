import { useState } from "react";
import { Menu } from "lucide-react";
import { StyledLink } from "@/styles/sharedStyles";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <StyledLink href="/" onClick={() => setIsOpen(false)}>
                Home
              </StyledLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
