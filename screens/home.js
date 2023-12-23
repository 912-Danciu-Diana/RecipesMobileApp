import { useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Button } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RecipesContext } from "../contexts/RecipesContext";

export default function Home({ navigation }) {
    const {recipes, deleteRecipe} = useContext(RecipesContext);
    const deleteRecipeAlert = (key) => {
        Alert.alert(
            'Delete Recipe',
            'Are you sure you want to delete this recipe?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteRecipe(key) }
            ],
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Add Recipe')}
            >
                <Text style={styles.buttonText}>Add Recipe</Text>
            </TouchableOpacity>
            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Recipe Details', item)}>
                            <Text >{item.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Edit Recipe', { recipe: item })}>
                                    <MaterialIcons name="edit" size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteRecipeAlert(item.key)}>
                                    <MaterialIcons name="delete" size={24} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                }
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    item: {
        padding: 16,
        marginTop: 16,
        backgroundColor: 'pink',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
}
)