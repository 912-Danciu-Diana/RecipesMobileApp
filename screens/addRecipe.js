import { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RecipesContext } from "../contexts/RecipesContext";

export default function AddRecipe({ navigation }) {
    const { addRecipe } = useContext(RecipesContext);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [steps, setSteps] = useState('');

    const submitRecipe = () => {
        const newRecipe = {
            name,
            ingredients,
            preparationTime,
            difficulty,
            steps,
            key: Math.random().toString()
        }
        if (name.length > 3 && ingredients.length > 3 && difficulty.length > 3 && steps.length > 3) {
            addRecipe(newRecipe);
            navigation.goBack();
        }
        else {
            Alert.alert('Warning', 'The inputs must be over 3 characters long!', [{ text: 'Cancel', style: 'cancel' },]);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} placeholder='recipe name' onChangeText={setName} />

                <Text style={styles.label}>Ingredients:</Text>
                <TextInput style={styles.input} placeholder="Ingredients" onChangeText={setIngredients} />

                <Text style={styles.label}>Preparation time:</Text>
                <TextInput style={styles.input} placeholder="Preparation Time" onChangeText={setPreparationTime} />

                <Text style={styles.label}>Difficulty:</Text>
                <TextInput style={styles.input} placeholder="Difficulty" onChangeText={setDifficulty} />

                <Text style={styles.label}>Steps:</Text>
                <TextInput style={styles.input} placeholder="Steps" onChangeText={setSteps} />

                <TouchableOpacity style={styles.button} onPress={submitRecipe}>
                    <Text style={styles.buttonText}>Add Recipe</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,

    },
    buttonText: {
        fontSize: 16,
    },
});