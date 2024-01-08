import React, { createContext, useState, useEffect } from 'react';
import databaseManager from '../database/DatabaseManager';
import * as Network from 'expo-network';
import {
    fetchRecipesFromServer,
    addRecipeToServer,
    updateRecipeOnServer,
    deleteRecipeFromServer,
    deleteAllRecipesFromServer,
    checkServerAvailability
} from '../services/apiService';

export const RecipesContext = createContext();

const RecipesContextProvider = (props) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        loadRecipes();
    }, []);

    const checkConnectivity = async () => {
        const networkState = await Network.getNetworkStateAsync();
        return networkState.isConnected && await checkServerAvailability();
    };

    const synchronizeRecipes = async () => {
        if (await checkConnectivity()) {
            await deleteAllRecipesFromServer();
            const localRecipes = await databaseManager.getRecipes();
            for (const recipe of localRecipes) {
                await addRecipeToServer(recipe);
            }
            console.log("connected to server");
        } else {
            const loadedRecipes = await databaseManager.getRecipes();
            setRecipes(loadedRecipes);
            console.log("connected to localDb");
        }
    };

    const loadRecipes = async () => {
        await synchronizeRecipes();
        setRecipes(await databaseManager.getRecipes());
    };

    const addRecipe = async (newRecipe) => {
        if (await checkConnectivity()) {
            await addRecipeToServer(newRecipe);
            await databaseManager.addRecipe(newRecipe);
        } else {
            await databaseManager.addRecipe(newRecipe);
        }
        await loadRecipes();
    };

    const updateRecipe = async (updatedRecipe) => {
        if (await checkConnectivity()) {
            await updateRecipeOnServer(updatedRecipe.id, updatedRecipe);
            await databaseManager.updateRecipe(updatedRecipe);
        } else {
            await databaseManager.updateRecipe(updatedRecipe);
        }
        await loadRecipes();
    };

    const deleteRecipe = async (id) => {
        if (await checkConnectivity()) {
            await deleteRecipeFromServer(id);
            await databaseManager.deleteRecipe(id);
        } else {
            await databaseManager.deleteRecipe(id);
        }
        await loadRecipes();
    };

    return (
        <RecipesContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe }}>
            {props.children}
        </RecipesContext.Provider>
    );
};

export default RecipesContextProvider;
