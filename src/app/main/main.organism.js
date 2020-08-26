// @flow
// EXTERNAL
import React, { useEffect, Fragment } from 'react'; // eslint-disable-line
import { useMachine } from "@xstate/react";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import BackendService from '../../services/backend.service';
import { MainState, MainStateContext } from './main.state';
import { responsive } from '../../utils/responsive';
import { getChildrenStateName, getIfExistOnStorage } from "../../utils/helpers"
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

function MainOrganism() {
  const [state, send] = useMachine(MainState);
  const backendService = BackendService.getInstance();

  useEffect(() => {
    const persistedState = getIfExistOnStorage("main-state");

    send("RENDER"); 

    if (persistedState && typeof persistedState === 'string') {
      const newThemeEvent = `CHANGE_TO_${persistedState.toUpperCase()}`;
      send(newThemeEvent);
    }

    backendService.getProfile();
  }, [send, backendService])

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
