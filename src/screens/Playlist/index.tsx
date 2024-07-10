import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Button, TextInput } from 'react-native';

import { tracks as rawTracks, playlists as rawPlaylists } from '../../../data';

import { Colors, Dimensions } from 'src/constants';
import { usePlaylist } from 'src/provider';

import { Header } from './Header';
import { Title } from './Title';
import { Tabbar } from './Tabbar';
import { Tracks } from './Tracks';

import { useAnimation } from './Animation';
import { Text, TextType } from 'src/components';

interface Props {}

export const Playlist: React.FC<Props> = () => {
  const { setLists: setAllLists, setTracks: setAllTracks } = usePlaylist(
    rawTracks,
  );
  const [lists, setLists] = useState(rawPlaylists);
  const [tracks, setTracks] = useState(rawTracks);

  const { translateX, panResponder, index } = useAnimation(lists.length);

  const [str, setStr] = useState('');
  const [dialogShow, setDialogShow] = useState(false);

  useEffect(() => {
    setAllLists(rawPlaylists);
    setAllTracks(
      rawTracks.map((item) => ({
        ...item,
        id: String(item.id),
        url: item.source,
      })),
    );
  }, []);

  useEffect(() => {
    if (str) {
      setTracks(
        rawTracks
          .map((item) => ({
            ...item,
            id: String(item.id),
            url: item.source,
          }))
          .filter((i) => i.title?.includes(str)),
      );
    } else {
      setTracks(
        rawTracks
          .map((item) => ({
            ...item,
            id: String(item.id),
            url: item.source,
          }))
          .filter((i) => i.title?.includes(str)),
      );
    }
  }, [str]);

  return (
    <View style={styles.container}>
      <Header
        searchValue={str}
        onSearchPress={() => {
          setDialogShow(true);
        }}
      />
      <Title swipeIndex={index} />
      <Tabbar swipeIndex={index} />
      <Tracks {...{ translateX, panResponder }} tracks={tracks} lists={lists} />

      <Modal
        transparent
        statusBarTranslucent
        animationType="slide"
        visible={dialogShow}>
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <View
            style={{
              borderRadius: 20,
              width: Dimensions.width - 20 * 2,
              backgroundColor: Colors.white,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Text type={TextType.SEMIBOLD} color={Colors.black}>
              Search
            </Text>

            <View
              style={{
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: Colors.primary,
                flexShrink: 1,
                width: '100%',
                marginTop: 12,
              }}>
              <TextInput
                returnKeyType="search"
                returnKeyLabel="Search"
                selectionColor={Colors.primary}
                style={{
                  fontFamily: TextType.REGULAR,
                  color: Colors.black,
                  flexShrink: 1,
                }}
                autoFocus
                // onChangeText={setStr}
                defaultValue={str}
                placeholder="Type to search a song"
                onSubmitEditing={(e) => {
                  setStr(e.nativeEvent.text);
                }}
              />
            </View>

            <View style={{ width: 80, marginTop: 20 }}>
              <Button
                title="OK"
                onPress={() => {
                  setDialogShow(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimensions.topInset,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  text: {
    fontSize: 22,
    color: 'white',
  },
});
