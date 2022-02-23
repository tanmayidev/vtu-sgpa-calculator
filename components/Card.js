import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function Card({cardItem, onpressHandler}) {

    return (
        <View style={styles.container}>
            <FlatList data={cardItem}  renderItem={({item}) => 
                <TouchableOpacity style={styles.CardItem} onPress={() => onpressHandler(item.key)}>
                    <Text style={{ color: "white", fontWeight:"bold" }}>"{item.key}", Marks:{item.marks}</Text>
                </TouchableOpacity>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:15,
        padding: 10,
        height: '120%'
    },
    CardItem: {
        margin:5,
        padding:15,
        backgroundColor:'#1b5c62', 
        borderRadius: 50,
        width: "auto",
        height: "auto",
        alignItems: "center"
    },
})