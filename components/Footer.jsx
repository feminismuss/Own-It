import styled from "styled-components"

export default function Footer(){
    return (
        <StyledFooter>
            <p>© 2024 Own It – Built by Hannah Capell</p>
        </StyledFooter>
    )
}
const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1.5px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: 100;
  text-align: center;
    p {
    color: ${({ theme }) => theme.colors.muted};
  }`