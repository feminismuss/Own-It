import { useState } from "react";
import { Menu } from "lucide-react";
import { StyledLink } from "@/styles/sharedStyles";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </MenuButton>
      {isOpen && (
        <Nav>
          <ul>
            <li>
              <MenuLink href="/" onClick={() => setIsOpen(false)}>
                Home
              </MenuLink>
            </li>
            {session && (
              <li>
                <MenuLink href="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </MenuLink>
              </li>
            )}
            <li>
              {session ? (
                <MenuLink
                  href="/login"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                    setIsOpen(false);
                  }}
                >
                  Logout
                </MenuLink>
              ) : (
                <MenuLink href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </MenuLink>
              )}
            </li>
          </ul>
        </Nav>
      )}
    </div>
  );
}
const MenuButton = styled.button`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing.md};
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;
const Nav = styled.nav`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 200;
  list-style: none;
  min-width: 150px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }
`;
const MenuLink = styled(StyledLink)`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
