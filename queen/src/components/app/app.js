import { AuthProvider } from 'components/auth';
import Rooter from 'components/router';
import { ErrorFallback } from 'components/shared/Error/ErrorFallback';
import Preloader from 'components/shared/preloader';
import ServiceWorkerNotification from 'components/shared/serviceWorkerNotification';
import { StyleProvider } from 'components/style';
import D from 'i18n';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import root from 'react-shadow/material-ui';
import { addOnlineStatusObserver } from 'utils';
import { useConfiguration } from 'utils/hook';
import customStyle from './app.style';

export const AppContext = React.createContext();

const App = () => {
  const { configuration } = useConfiguration();
  const [init, setInit] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    if (!init) {
      addOnlineStatusObserver(s => {
        setOnline(s);
      });
      setInit(true);
    }
  }, [init]);

  return (
    <root.div id="queen-container" style={customStyle}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {configuration && (
          <AppContext.Provider value={{ ...configuration, online: online }}>
            <StyleProvider>
              <ServiceWorkerNotification standaloneSW={configuration.standaloneSW} />
              <AuthProvider authType={configuration.authenticationType}>
                <BrowserRouter>
                  <Rooter />
                </BrowserRouter>
              </AuthProvider>
            </StyleProvider>
          </AppContext.Provider>
        )}
      </ErrorBoundary>
      {!configuration && <Preloader message={D.waitingConfiguration} />}
    </root.div>
  );
};

export default App;
