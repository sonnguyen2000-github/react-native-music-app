import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Button,
  TextInput,
  CheckBox,
  Image,
} from 'react-native';

import { tracks as rawTracks, playlists as rawPlaylists } from '../../../data';

import { Colors, Dimensions } from 'src/constants';
import { usePlaylist } from 'src/provider';

import { Header } from './Header';
import { Title } from './Title';
import { Tabbar } from './Tabbar';
import { Tracks } from './Tracks';

import { useAnimation } from './Animation';
import { Text, TextType } from 'src/components';
import { setVolume } from 'react-native-track-player';
import { ITrack } from 'src/interfaces';

interface Props {}

export const Playlist: React.FC<Props> = () => {
  const { setLists: setAllLists, setTracks: setAllTracks } = usePlaylist(
    rawTracks,
  );
  const [lists, setLists] = useState(rawPlaylists);
  const [tracks, setTracks] = useState(rawTracks);

  const { translateX, panResponder, index } = useAnimation(lists.length);

  const [str, setStr] = useState('');
  const [searchShow, setSearchShow] = useState(false);
  const [settingShow, setSettingShow] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [info, setInfo] = useState<ITrack>();

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
          setSearchShow(true);
        }}
        onSettingPress={() => {
          setSettingShow(true);
        }}
      />
      <Title swipeIndex={index} />
      <Tabbar swipeIndex={index} />
      {/* <Image
        resizeMode="contain"
        style={{ width: Dimensions.width, height: 300 }}
        source={require('../../../data/artworks/illustration-buddha-meditating-under-bodhi-600nw-2447268797.jpg')}
      /> */}
      <Tracks
        {...{ translateX, panResponder }}
        tracks={tracks}
        lists={lists}
        onOptionPress={(item) => {
          console.log({ item });
          setInfoShow(true);
          setInfo(item);
        }}
      />

      {/* search */}
      <Modal
        transparent
        statusBarTranslucent
        animationType="slide"
        visible={searchShow}>
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
                  setSearchShow(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* settings */}
      <Modal
        transparent
        statusBarTranslucent
        animationType="slide"
        visible={settingShow}>
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
              Settings
            </Text>

            <View>
              <CheckBox
                value={isMuted}
                onValueChange={(value) => {
                  setIsMuted(value);

                  if (value) {
                    setVolume(0);
                  } else {
                    setVolume(1);
                  }
                }}
              />
              <Text type={TextType.REGULAR} color={Colors.black}>
                Mute
              </Text>
            </View>

            <View style={{ width: 80, marginTop: 20 }}>
              <Button
                title="OK"
                onPress={() => {
                  setSettingShow(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* info */}
      <Modal
        transparent
        statusBarTranslucent
        animationType="slide"
        visible={infoShow}>
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
            <View style={{ alignItems: 'center' }}>
              <Text
                type={TextType.SEMIBOLD}
                color={Colors.black}
                style={{ textAlign: 'center' }}>
                {info?.title ?? ''}
              </Text>

              <Text
                type={TextType.REGULAR}
                color={Colors.black}
                style={{ textAlign: 'center' }}>
                By: {info?.artist ?? ''}
              </Text>
            </View>

            <View style={{ width: 80, marginTop: 20 }}>
              <Button
                title="OK"
                onPress={() => {
                  setInfoShow(false);
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
