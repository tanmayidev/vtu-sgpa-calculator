import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function fetchGrade(marks) {
    if (marks >= 90) {
        return (10)
    }
    else if (marks >= 80) {
        return (9)
    }
    else if (marks >= 70) {
        return (8)
    }
    else if (marks >= 60) {
        return (7)
    }
    else if (marks >= 45) {
        return (6)          // 6
    }
    else if (marks >= 40) {
        return (4)
    }
    else {
        return (0)
    }
}

/**
 * S - 10 - (90 - 100)
 * A - 9 - (80 - 89)
 * B - 8 - (70 - 79)
 * C - 7 - (60  69)
 * D - 6 - (45 - 59)
 * E - 4 - (40 - 44)
 */

export default function Calculator({ cardItem, lookUp }) {
    const [sgpa, setSgpa] = useState(0)
    const [percentage, setPercentage] = useState(0)
    var len, total, gradeTotal, creditTotal

    useEffect(() => {
        //Percentage Calculator
        len = Object.keys(cardItem).length
        total = 0
        Object.keys(cardItem).map((key) => {
            total += cardItem[key].marks
        })
        setPercentage(() => {
            return (total / len).toFixed(2)
        })

        //SGPA Calculator
        creditTotal = 0
        gradeTotal = 0
        Object.keys(cardItem).map((key) => {
            creditTotal += lookUp[cardItem[key].key]
            gradeTotal += fetchGrade(cardItem[key].marks) * lookUp[cardItem[key].key]
        })
        setSgpa(() => {
            return (gradeTotal / creditTotal).toFixed(2)
        })
    })

    return (
        <View style={styles.container}>
            <View >
                <Text style={{textAlign:"center", fontWeight:"bold", fontFamily:"monospace"}}>PERCENTAGE</Text>
                <Text style={{textAlign:"center", fontSize:40}}>{percentage}%</Text>
            </View>
            <View >
                <Text style={{textAlign:"center", fontWeight:"bold", fontFamily:"monospace"}}>SGPA</Text>
                <Text style={{textAlign:"center", fontSize:40}}>{sgpa}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "auto",
        height: "auto",
        padding: 25,
        justifyContent: "space-between",
        flexDirection: "row",
    },
})