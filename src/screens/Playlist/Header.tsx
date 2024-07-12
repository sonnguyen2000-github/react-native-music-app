import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from 'src/constants';
import { Search, Gear, DoubleQuaver } from 'src/icons';

interface Props {
  searchValue: string;
  onSearchPress: () => void;
  onSettingPress: () => void;
}

export const Header: React.FC<Props> = ({
  onSearchPress,
  searchValue,
  onSettingPress,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { top: insets.top }]}>
      <TouchableOpacity onPress={onSearchPress}>
        <Search size={28} fill={searchValue ? Colors.primary : undefined} />
      </TouchableOpacity>
      <DoubleQuaver size={35} />
      <TouchableOpacity onPress={onSettingPress}>
        <Gear size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
