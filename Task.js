import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebase';
import { AntDesign } from '@expo/vector-icons';
const Task = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fireStore = () => {
            const dbRT = getDatabase(app);
            const dealsRef = ref(dbRT);
            onValue(dealsRef, (snapshot) => {
                const responseData = snapshot.val();
                if (responseData) {
                    // Convert the response object into an array of items
                    const dataArray = Object.keys(responseData).map((key) => ({
                        key,
                        ...responseData[key],
                    }));
                    setData(dataArray);
                }
            });
        };

        fireStore();
    }, []);

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => {
        // Filter the item based on the search text
        if (searchText && !item.Answer.toLowerCase().includes(searchText.toLowerCase())) {
            return null;
        }

        return (
            <View style={styles.item}>
                <Text>{item.Answer}</Text>
                <Text>{item.Count}</Text>
                <Text>{item.Percentage}</Text>
            </View>
        );
    };
    const handlePressFilter = () => {
        setModalVisible(true);
      };

      const handleSortOption = (option) => {
        setSortOption(option);
        setModalVisible(false);
        // Perform sorting based on the selected option
        // Update the logic accordingly
      };

      
    
    // Organize data into sections based on 'Segment Type'
    const organizedData = data.reduce((sections, item) => {
        const sectionKey = item['Segment Type'];
        if (!sections[sectionKey]) {
            sections[sectionKey] = { title: sectionKey, data: [] };
        }
        sections[sectionKey].data.push(item);
        return sections;
    }, {});

    const sortByName = () => {
        // Sort data by answer (in alphabetical order)
        setData([...data].sort((a, b) => a.Answer.localeCompare(b.Answer)));
        setModalVisible(false);
      };
    
      const sortByCount = () => {
        // Sort data by count (in high to low order)
        setData([...data].sort((a, b) => b.Count - a.Count));
        setModalVisible(false);
      };
    
      const sortByPercentage = () => {
        // Sort data by percentage (in high to low order)
        setData([...data].sort((a, b) => b.Percentage - a.Percentage));
        setModalVisible(false);
      };
      const sortByLowCount = () => {
        // Sort data by count (in high to low order)
        const sortedData = [...data].sort((a, b) => a.Count - b.Count);

        // Update the sorted data in the state
        setData(sortedData);
    
        // Close the modal
        setModalVisible(false);
      };
    
      const sortByLowPercentage = () => {
        // Sort data by percentage (in high to low order)
        setData([...data].sort((a, b) => a.Percentage - b.Percentage));
        setModalVisible(false);
      };

    // Convert sections object to an array
    const sections = Object.values(organizedData);

    // FILEPATH: /F:/react native/finalExam/Task.js
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
            />
                  <TouchableOpacity onPress={handlePressFilter}>
        <AntDesign name="filter" size={24} color="black" />
      </TouchableOpacity>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={sortByName}>
            <Text>Sort by Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sortByCount}>
            <Text>Sort by High Count to Low Count</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sortByPercentage}>
            <Text>Sort by High Percentage to Low Percentage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sortByLowCount}>
            <Text>Sort by Low Count to High Count</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sortByLowPercentage}>
            <Text>Sort by Low Percentage to High Percentage</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalContainer: {
        marginTop: 100,
        backgroundColor: 'white',
        padding: 20,
      },
});


export default Task;
//   container: {
//     flex: 1
//   },
//   sectionHeader: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   sectionHeaderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   item: {
//     padding: 10,
//   },
// });

// export default Task;
