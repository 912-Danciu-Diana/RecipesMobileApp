import React, { createContext, useState, useEffect } from 'react';
import databaseManager from '../database/DatabaseManager';

export const RecipesContext = createContext();

const RecipesContextProvider = (props) => {
    const [recipes, SetRecipes] = useState([]);

    useEffect(() => {
        const loadRecipes = async () => {
            const loadedRecipes = await databaseManager.getRecipes();
            SetRecipes(loadedRecipes);
        }
        loadRecipes();
    }, []);

    const addRecipe = async (newRecipe) => {
        await databaseManager.addRecipe(newRecipe);
        const updatedRecipes = await databaseManager.getRecipes();
        SetRecipes(updatedRecipes);
    }

    const updateRecipe = async (updatedRecipe) => {
        await databaseManager.updateRecipe(updatedRecipe);
        const updatedRecipes = await databaseManager.getRecipes();
        SetRecipes(updatedRecipes);
    }

    const deleteRecipe = async (id) => {
        await databaseManager.deleteRecipe(id);
        const updatedRecipes = await databaseManager.getRecipes();
        SetRecipes(updatedRecipes);
    }

    return (
        <RecipesContext.Provider value={{recipes, addRecipe, updateRecipe, deleteRecipe}}> 
            {props.children}
        </RecipesContext.Provider>
    );
}
 
export default RecipesContextProvider;