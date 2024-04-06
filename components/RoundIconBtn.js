import React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../misc/colors';

const RoundIconBtn = ({ name, size, color, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.icon}>
        <Icon name={name || 'arrow'} size={size || 30} color={color || '#900'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    icon:{
      backgroundColor: colors.PRIMARY,
      padding: 15,
      borderRadius: 50,
      elevation: 5,
    }
})
export default RoundIconBtn;
