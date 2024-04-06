import React, { useState, useEffect } from 'react';
import { FlatList, Keyboard, StatusBar, TouchableWithoutFeedback, View, Text, StyleSheet ,useContext} from 'react-native';
import { SearchBar } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import RoundIconBtn from '../components/RoundIconBtn';
import NotesInputModal from './NotesInputModal';
import colors from '../misc/colors';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../contexts/NotesProvide';

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NotesScreen = ({ user }) => {
  const navigation = useNavigation();
  const [greet, setGreet] = useState('Evening');
  const [modalVisible, setModalVisible] = useState(false);
  //const [notes, setNotes] = useState([]);
  const { notes, setNotes, findNotes } = useNotes();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreet('Morning');
    else if (hrs < 17) setGreet('Afternoon');
    else setGreet('Evening');
  };

  useEffect(() => {
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    try {
      const note = { id: Date.now(), title, desc, time: Date.now() };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving note to AsyncStorage:', error);
    }
  };

  const openNote = (note) => {
    navigation.navigate('NoteDetail', { note });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          <SearchBar containerStyle={{ marginVertical: 15 }} />
          <FlatList
            data={notes}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 15 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Note onPress={() => openNote(item)} item={item} />}
          />
          {!notes.length ? (
            <View style={styles.emptyHeaderContainer}>
              <Text style={styles.emptyHeader}>ADD Notes </Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        name="arrow"
        color="#fff"
        size={30}
        width={50}
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      />
      <NotesInputModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.PRIMARY,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default NotesScreen;
