// EXTERNAL
import React, { useEffect, Fragment } from 'react'; // eslint-disable-line
import { useMachine } from "@xstate/react";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import AuthService from '../services/auth.service';
import { mainMachine, MainStateContext } from './main.state';
import { responsive } from '../utils/responsive';
import { getChildrenStateName } from "../utils/helpers"
import FooterOrganism from './footer/footer.organism';
import HeaderOrganism from './header/header.organism';
import SliderOrganism from './slider/slider.organism';
import ThemeMolecule from './theme/theme.molecule';

// STYLES
import { main, container, ContainerRow } from './main.styles';

const MediaQueries = {
  [responsive('tablet')]: {
    color: 'blue'
  },
  [responsive('desktop')]: {
    color: 'red'
  },
};

function isUserSpotifyLoggedOut() {
  const authService = new AuthService();
  const searchParams = new URLSearchParams(window.location.search);
  const hasCode = searchParams.has("code");
  
  if (hasCode) {
    const code: string | null = searchParams.get("code");
    authService.setCode(code);

    setTimeout(() => {
      authService.getArtistAlbums();
    }, 0)

    return false;
  } else {
    authService.login();
    return true;
  }
}

function MainOrganism() {
  const [state, send] = useMachine(mainMachine);

  useEffect(() => {
    let persistedStateFormat = null;
    const persistedState = localStorage.getItem("main-state");

    // TODO: Avoid rerender when page has already loaded
    send("RENDER"); 

    if (persistedState !== null) {
      persistedStateFormat = JSON.parse(persistedState);
      const newTheme = `CHANGE_TO_${persistedStateFormat.toUpperCase()}`;
      send(newTheme);
    }
  }, [send])

  if (isUserSpotifyLoggedOut()) return (null);

  return (
    <Fragment>
      {
        state.matches("rendered") ?
          <main css={[main]} className={`${getChildrenStateName(state, "rendered")}-theme`}>
            <div css={[container]}>
              <ContainerRow css={MediaQueries}>
                <HeaderOrganism />
              </ContainerRow>

              <ContainerRow content >
                <SliderOrganism />
              </ContainerRow>

              <ContainerRow>
                <FooterOrganism />
              </ContainerRow>
            </div>


            <MainStateContext.Provider value={state}>
              <ThemeMolecule />
            </MainStateContext.Provider>
          </main>
        : null
      }
    </Fragment>
  );
}

export default MainOrganism;
