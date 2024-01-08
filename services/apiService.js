const baseURL = 'http://192.168.1.101:3000/recipes'; 

const fetchWithTimeout = (url, options, timeout = 1000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
};

export const checkServerAvailability = async () => {
    try {
        const response = await fetchWithTimeout(`http://192.168.1.101:3000/recipes/ping`, {}, 1000); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.message === 'pong';
    } catch (error) {
        console.log("Server check failed:", error);
        return false;
    }
};

export const fetchRecipesFromServer = async () => {
    try {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetching recipes failed:", error);
        throw error;
    }
};

export const addRecipeToServer = async (recipe) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Adding recipe failed:", error);
        throw error;
    }
};

export const updateRecipeOnServer = async (id, recipe) => {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Updating recipe failed:", error);
        throw error;
    }
};

export const deleteRecipeFromServer = async (id) => {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Deleting recipe failed:", error);
        throw error;
    }
};

export const deleteAllRecipesFromServer = async () => {
    try {
        const response = await fetch(`${baseURL}/deleteAll`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Deleting all recipes failed:", error);
        throw error;
    }
};
