import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Button } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {
    const [recipes, SetRecipes] = useState([
        {
            name: 'Spaghetti Aglio e Olio',
            ingredients: 'spaghetti, garlic, olive oil, red pepper flakes, parsley, salt',
            preparationTime: '20 minutes',
            difficulty: 'Easy',
            steps: 'Cook spaghetti in salted water until al dente.\nSauté thinly sliced garlic in olive oil, add red pepper flakes.\nToss cooked spaghetti with garlic oil and chopped parsley.',
            key: '1'
        },
        {
            name: 'Classic Caesar Salad',
            ingredients: 'romaine lettuce, croutons, parmesan cheese, Caesar dressing',
            preparationTime: '15 minutes',
            difficulty: 'Easy',
            steps: 'Chop romaine lettuce and place in a large bowl.\nAdd croutons and parmesan cheese.\nToss with Caesar dressing before serving.',
            key: '2'
        },
        {
            name: 'Banana Pancakes',
            ingredients: 'flour, baking powder, milk, egg, ripe bananas, butter, maple syrup',
            preparationTime: '30 minutes',
            difficulty: 'Medium',
            steps: 'Mix flour and baking powder in a bowl.\nIn another bowl, whisk milk and egg, then add mashed bananas.\nCombine wet and dry ingredients, cook on a griddle until golden brown.\nServe with butter and maple syrup.',
            key: '3'
        },
        {
            name: 'Chicken Alfredo Pasta',
            ingredients: 'fettuccine pasta, chicken breast, heavy cream, parmesan cheese, garlic, butter, salt, pepper',
            preparationTime: '35 minutes',
            difficulty: 'Medium',
            steps: 'Cook pasta al dente. Sauté chicken, set aside. Cook garlic in butter, add cream and parmesan. Combine with pasta and chicken.',
            key: '4'
        },
        {
            name: 'Vegetable Stir Fry',
            ingredients: 'assorted vegetables, soy sauce, garlic, ginger, olive oil',
            preparationTime: '20 minutes',
            difficulty: 'Easy',
            steps: 'Stir-fry vegetables in oil with garlic and ginger. Add soy sauce and serve over rice or noodles.',
            key: '5'
        },
        {
            name: 'Caprese Salad',
            ingredients: 'tomatoes, fresh mozzarella, basil leaves, olive oil, balsamic glaze, salt, pepper',
            preparationTime: '10 minutes',
            difficulty: 'Easy',
            steps: 'Slice tomatoes and mozzarella. Layer with basil leaves. Drizzle with olive oil and balsamic glaze. Season with salt and pepper.',
            key: '6'
        },
        {
            name: 'Beef Tacos',
            ingredients: 'ground beef, taco seasoning, tortillas, lettuce, tomato, cheese, sour cream, salsa',
            preparationTime: '30 minutes',
            difficulty: 'Easy',
            steps: 'Cook beef with taco seasoning. Assemble tacos with beef, lettuce, tomato, cheese, sour cream, and salsa.',
            key: '7'
        },
        {
            name: 'Mushroom Risotto',
            ingredients: 'arborio rice, chicken broth, mushrooms, onion, white wine, parmesan cheese, butter, garlic',
            preparationTime: '1 hour',
            difficulty: 'Hard',
            steps: 'Sauté mushrooms, onion, garlic. Add rice and wine. Gradually add broth, stirring. Finish with parmesan and butter.',
            key: '8'
        },
        {
            name: 'Grilled Cheese Sandwich',
            ingredients: 'bread, cheddar cheese, butter',
            preparationTime: '10 minutes',
            difficulty: 'Easy',
            steps: 'Butter bread slices, place cheese between slices. Grill on both sides until cheese melts and bread is golden brown.',
            key: '9'
        },
        {
            name: 'Tomato Soup',
            ingredients: 'tomatoes, onion, garlic, chicken broth, olive oil, salt, pepper, cream',
            preparationTime: '45 minutes',
            difficulty: 'Medium',
            steps: 'Sauté onion, garlic. Add tomatoes and broth, simmer. Blend until smooth, return to heat. Add cream, salt, and pepper.',
            key: '10'
        },
        {
            name: 'Beef Tacos',
            ingredients: 'ground beef, taco seasoning, tortillas, lettuce, tomato, cheese, sour cream, salsa',
            preparationTime: '30 minutes',
            difficulty: 'Easy',
            steps: 'Cook beef with taco seasoning. Assemble tacos with beef, lettuce, tomato, cheese, sour cream, and salsa.',
            key: '11'
        },
        {
            name: 'Mushroom Risotto',
            ingredients: 'arborio rice, chicken broth, mushrooms, onion, white wine, parmesan cheese, butter, garlic',
            preparationTime: '1 hour',
            difficulty: 'Hard',
            steps: 'Sauté mushrooms, onion, garlic. Add rice and wine. Gradually add broth, stirring. Finish with parmesan and butter.',
            key: '12'
        },
        {
            name: 'Grilled Cheese Sandwich',
            ingredients: 'bread, cheddar cheese, butter',
            preparationTime: '10 minutes',
            difficulty: 'Easy',
            steps: 'Butter bread slices, place cheese between slices. Grill on both sides until cheese melts and bread is golden brown.',
            key: '13'
        },
        {
            name: 'Tomato Soup',
            ingredients: 'tomatoes, onion, garlic, chicken broth, olive oil, salt, pepper, cream',
            preparationTime: '45 minutes',
            difficulty: 'Medium',
            steps: 'Sauté onion, garlic. Add tomatoes and broth, simmer. Blend until smooth, return to heat. Add cream, salt, and pepper.',
            key: '14'
        }
    ])

    const deleteRecipe = (key) => {
        Alert.alert(
            'Delete Recipe',
            'Are you sure you want to delete this recipe?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => SetRecipes((currentRecipes) => currentRecipes.filter(recipe => recipe.key !== key)) }
            ],
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Add Recipe', { addRecipe: SetRecipes })}
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
                                <TouchableOpacity onPress={() => navigation.navigate('Edit Recipe', { recipe: item, editRecipe: SetRecipes })}>
                                    <MaterialIcons name="edit" size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteRecipe(item.key)}>
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