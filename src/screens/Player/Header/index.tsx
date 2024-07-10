import React from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { Dimensions } from 'src/constants';
import { Text } from 'src/components';
import { Back, Search, Options } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {
  onBack: () => void;
}

export const Header: React.FC<Props> = ({ onBack }) => {
  const { range } = useBottomSheet();

  const opacity = range([80, 100], [0, 1]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity },
        {
          zIndex: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 99],
          }),
        },
      ]}>
      <TouchableOpacity
        hitSlop={{ bottom: 100, left: 100, right: 100, top: 100 }}
        onPress={onBack}>
        <Back size={25} />
      </TouchableOpacity>
      <View style={styles.middle}>
        <Text size={18}>NOW PLAYING</Text>
      </View>
      {/* <View style={styles.right}>
        <Search size={25} />
        <Options size={25} />
      </View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: Dimensions.MINI_PLAYER_HEIGHT,
    paddingTop: Dimensions.topInset,
  },

  middle: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
