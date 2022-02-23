import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Card from '../components/Card'
import Calculator from '../components/Calculator'
import * as SQLite from 'expo-sqlite'
import FlatButton from '../shared/Button';

export default function ScreenB({ route }) {
    const { Semester, Branch, lookUp } = route.params
    const [cardItem, setCardItem] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [marks, setMarks] = useState()
    const [subjectCode, setSubjectCode] = useState()

    useEffect(() => {
        alert("Click on '+' button to begin!")
    }, []) 

    const db = SQLite.openDatabase("project.db")

    db.transaction((tx) => {
        tx.executeSql(
            "select s.code, s.credit from subjects s, lookup l where s.code=l.subjectCode and l.branchCode=? and l.semester = ?;",
            [Branch, parseInt(Semester)],
            (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        lookUp[results.rows.item(i).code] = results.rows.item(i).credit;
                    }
                }
                else {
                    alert("Error in sql QUERY")
                }
            }
        );
    })

    function pressHandler() {

        if ((parseInt(marks) >= 0 && parseInt(marks) <= 100)) {
            if (String(subjectCode) == "undefined" || String(subjectCode) == "") {
                alert("Subject Code field cannot be empty")
                return
            }
            for (var i = 0; i < cardItem.length; i++) {
                if (subjectCode == cardItem[i].key) {
                    alert("Redundant Subject selected, Either select a new Subject or delete the current one and try again!")
                    return
                }
            }

            setModalVisible(!modalVisible)

            setCardItem((prevItem) => {
                return [
                    { key: String(subjectCode), marks: parseInt(marks) },
                    ...prevItem
                ]
            })
        }
        else {
            alert("Marks field must lie between 0 to 100 inclusive")
            return;
        }


        // Displays alert after first value is inserted
        if(cardItem.length == 0) {
            alert("Click on the card to delete it!")
        }

    }


    function deleteHandler(key) {
        Alert.alert(
            "Confimation",
            "Are you sure about deleting this item?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Spared!"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => setCardItem((prevItem) => {
                        return prevItem.filter(item => item.key != key)
                    })
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ alignSelf: "center", marginTop: "50%", backgroundColor: "#dddddf", padding: 50 }}>
                    <TouchableOpacity style={{ alignSelf: "flex-end", backgroundColor: "#1b5c62", borderRadius: 50, padding: 5 }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ fontWeight: "bold", color: "white", fontFamily: "Roboto" }}>X</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, marginBottom: 10, fontFamily: "monospace", fontWeight: "bold" }}>
                        Pick a subject and Enter the marks
                    </Text>
                    <Picker
                        selectedValue={subjectCode}
                        onValueChange={(itemValue, itemIndex) => setSubjectCode(itemValue)}
                    >
                        <Picker.Item label="Subject Code" value="" style={{ fontFamily: "monospace" }} />
                        {Object.keys(lookUp).map((key) => {
                            return (<Picker.Item label={key} value={key} key={key} />) //if you have a bunch of keys value pair
                        })}
                    </Picker>
                    <TextInput onChangeText={setMarks} value={marks} placeholder="Enter Marks" keyboardType="numeric"
                        style={{ marginTop: 10, marginLeft: 20, marginBottom: 10, fontFamily: "monospace", fontSize: 15 }} />
                    <FlatButton text="submit" onPress={pressHandler} />
                </View>
            </Modal>
            <View style={{ width: "auto", height: "50%" }}>
                {(cardItem.length != 0) && (!modalVisible) && (lookUp.length != 0) ? <Card cardItem={cardItem} onpressHandler={deleteHandler} /> : null}
            </View>
            <View style={{ marginTop: "auto" }}>
                {(cardItem != undefined) ? <Calculator cardItem={cardItem} lookUp={lookUp} /> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bfbfbf",
        justifyContent: "space-around",
    },
    button: {
        marginTop: 35,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: "black",
        width: 50,
        height: 50,
        borderRadius: 50
    },
    buttonText: {
        color: "white",
        alignSelf: "center",
        fontSize: 50,
        fontWeight: "bold"
    },
});


