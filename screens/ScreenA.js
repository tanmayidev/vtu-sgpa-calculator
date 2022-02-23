import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import FlatButton from '../shared/Button';

export default function ScreenA({ navigation }) {

    useEffect(() => {
        async function openDatabase() {
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
            }
            const [{ uri }] = await Asset.loadAsync(require("../assets/project.db"));
            await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + "SQLite/project.db");
            alert("Database Downloaded Successfully!")
        }

        openDatabase();

        return () => {
            console.log('This will be logged on unmount');
        };

    }, [])

    const [currentBranch, setBranch] = useState("CS")
    const [currentSem, setSem] = useState("1")

    function pressHandler() {
        navigation.navigate('ScreenB', { Semester: currentSem, Branch: currentBranch, lookUp: {} })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textSize}>Enter your Details</Text>
            <Text style={{fontWeight:"bold"}}>2018 scheme</Text>
            <Picker
                selectedValue={currentBranch}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setBranch(itemValue)}
            >
                <Picker.Item label="Computer Sciences" value="CS" />
                <Picker.Item label="Information Sciences" value="IS" />
                <Picker.Item label="Electronics and Communication" value="EC" />
                <Picker.Item label="Mechanical Engineering" value="ME" />
                <Picker.Item label="Civil Engineering" value="CV" />
                <Picker.Item label="Artificial Intelligence" value="AI" />
                <Picker.Item label="Biotechnology Engineering" value="BT" />
                <Picker.Item label="Electronics and Telecommunication" value="TE" />
            </Picker>
            <Picker
                selectedValue={currentSem}
                style={{ height: 50, width: 150, borderWidth: 5 }}
                onValueChange={(itemValue, itemIndex) => setSem(itemValue)}
            >
                <Picker.Item label="First Semester" value="1" />
                <Picker.Item label="Second Semester" value="2" />
                <Picker.Item label="Third Semester" value="3" />
                <Picker.Item label="Fourth Semester" value="4" />
                <Picker.Item label="Fifth Semester" value="5" />
                <Picker.Item label="Sixth Semester" value="6" />
                <Picker.Item label="Seventh Semester" value="7" />
                <Picker.Item label="Eighth Semester" value="8" />
            </Picker>
            <FlatButton text="submit" onPress={pressHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#bfbfbf"
    },
    textSize: {
        textAlign: "center",
        fontSize: 28,
        fontFamily: "monospace",
        fontWeight: "bold"
    },
});