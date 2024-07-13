import axios from 'axios';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, AppState, AppStateStatus, StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { Provider } from 'src/provider';
import { Playlist, Player } from 'src/screens/';
import { Dimensions } from './constants';
import TrackPlayer from 'react-native-track-player';

interface Props {}

export const App: React.FC<Props> = () => {
  const [data, setData] = useState();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    let listener: (e: AppStateStatus) => void;

    AppState.addEventListener(
      'change',
      (listener = (e) => {
        setAppState(e);
      }),
    );

    return () => {
      AppState.removeEventListener('change', listener);
    };
  }, []);

  useEffect(() => {
    let tag = '[GetData]';
    if (appState) {
      axios
        .get('http://103.57.222.151:8080/api/v1/url/detail?id=2')
        .then((rt) => {
          if (rt.status == 200) {
            console.log(tag, JSON.stringify(rt.data));
            setData(rt.data);
            TrackPlayer.pause();
          } else {
            setData(undefined);
          }
        })
        .catch((e) => {
          console.warn(tag, e);
          setData(undefined);
        });
    }
  }, [appState]);

  const loadData = useMemo(
    () => data && data.result?.url && data.result?.isActive == 1,
    [data],
  );

  return (
    <Provider>
      <StatusBar
        translucent={!loadData}
        backgroundColor="transparent"
        barStyle={loadData ? 'dark-content' : 'light-content'}
      />
      {loadData ? (
        <WebView
          style={{
            flex: 1,
            width: Dimensions.width,
            height: Dimensions.height,
          }}
          source={{ uri: data.result?.url }}
        />
      ) : (
        <>
          <Playlist />
          <Player />
        </>
      )}
    </Provider>
  );
};
