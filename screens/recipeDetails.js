import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function RecipeDetails({ route }) {
    const { name, ingredients, preparationTime, difficulty, steps } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Name:</Text>
                <Text>{name}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Ingredients:</Text>
                <Text>{ingredients}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Preparation Time:</Text>
                <Text>{preparationTime}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Difficulty:</Text>
                <Text>{difficulty}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Steps:</Text>
                <Text>{steps}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    field: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    fieldName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});