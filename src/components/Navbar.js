import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { GithubContext } from "../context/context";
import DarkModeToggle from "react-dark-mode-toggle";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = React.useContext(GithubContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Wrapper className={isDarkMode ? "dark-theme-compo" : null}>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {isUser ? (
        <button
          className={isDarkMode ? "btn dark-theme" : "btn light-theme"}
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
      <DarkModeToggle
        size={80}
        className="toggler"
        onChange={toggleTheme}
        checked={isDarkMode}
      />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: white;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-white);
    cursor: pointer;
  }
  .btn {
    background-color: var(--clr-primary-10);
  }
  .btn.dark-theme {
    color: var(--clr-grey-1);
    transition: all 0.3s ease-in-out;
  }
  .btn.light-theme {
    color: var(--clr-white);
    transition: all 0.3s ease-in-out;
  }
  @media (max-width: 800px) {
    grid-template-columns: auto auto 100px;
  }
`;

export default Navbar;
