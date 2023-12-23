import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RecipesContext } from "../contexts/RecipesContext";

export default function EditRecipe({ navigation, route }) {
    const { updateRecipe } = useContext(RecipesContext);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [steps, setSteps] = useState('');

    useEffect(() => {
        const { recipe } = route.params;
        setName(recipe.name);
        setIngredients(recipe.ingredients);
        setPreparationTime(recipe.preparationTime);
        setDifficulty(recipe.difficulty);
        setSteps(recipe.steps);
    }, [route.params]);


    const submitRecipe = () => {
        const newRecipe = {
            name,
            ingredients,
            preparationTime,
            difficulty,
            steps,
            key: route.params.recipe.key
        }
        if (name.length > 3 && ingredients.length > 3 && difficulty.length > 3 && steps.length > 3) {
            updateRecipe(newRecipe);
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
                <TextInput style={styles.input} placeholder='recipe name' onChangeText={setName} value={name} />

                <Text style={styles.label}>Ingredients:</Text>
                <TextInput style={styles.input} placeholder="Ingredients" onChangeText={setIngredients} value={ingredients} />

                <Text style={styles.label}>Preparation time:</Text>
                <TextInput style={styles.input} placeholder="Preparation Time" onChangeText={setPreparationTime} value={preparationTime} />

                <Text style={styles.label}>Difficulty:</Text>
                <TextInput style={styles.input} placeholder="Difficulty" onChangeText={setDifficulty} value={difficulty} />

                <Text style={styles.label}>Steps:</Text>
                <TextInput style={styles.input} placeholder="Steps" onChangeText={setSteps} value={steps} />

                <TouchableOpacity style={styles.button} onPress={submitRecipe}>
                    <Text style={styles.buttonText}>Update Recipe</Text>
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