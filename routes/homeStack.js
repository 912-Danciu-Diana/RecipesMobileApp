import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import RecipeDetails from '../screens/recipeDetails';
import AddRecipe from '../screens/addRecipe'
import EditRecipe from '../screens/editRecipe'

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: { backgroundColor: 'coral' },
    headerTintColor: '#fff',
  }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Recipe Details" component={RecipeDetails} />
    <Stack.Screen name="Add Recipe" component={AddRecipe} />
    <Stack.Screen name="Edit Recipe" component={EditRecipe} />
  </Stack.Navigator>
);

export default HomeStack;