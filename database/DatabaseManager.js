import * as SQLite from 'expo-sqlite';

class DatabaseManager {
    constructor() {
        this.db = SQLite.openDatabase("RecipesDB.db");
        this.initDb();
    }

    initDb() {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Recipes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        ingredients TEXT,
                        preparationTime TEXT,
                        difficulty TEXT,
                        steps TEXT
                    );`,
                    [],
                    () => {
                        console.log("Table created");
                        resolve();
                    },
                    (_, error) => {
                        console.log("Error creating table: ", error);
                        reject(error);
                    }
                );
            });
        });
    }

    addRecipe(recipe) {
        return new Promise((resolve, reject) => {
            const { name, ingredients, preparationTime, difficulty, steps } = recipe;
            this.db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO Recipes (name, ingredients, preparationTime, difficulty, steps) VALUES (?, ?, ?, ?, ?);',
                    [name, ingredients, preparationTime, difficulty, steps],
                    () => {
                        console.log("Recipe added");
                        resolve();
                    },
                    (_, error) => {
                        console.log("Error adding recipe: ", error);
                        reject(error);
                    }
                );
            });
        });
    }
    
    getRecipes() {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Recipes;',
                    [],
                    (_, results) => {
                        let recipes = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            recipes.push(results.rows.item(i));
                        }
                        resolve(recipes);
                    },
                    (_, error) => {
                        console.log("Error getting recipes: ", error);
                        reject(error);
                    }
                );
            });
        });
    }

    updateRecipe(recipe) {
        return new Promise((resolve, reject) => {
            const { id, name, ingredients, preparationTime, difficulty, steps } = recipe;
            this.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE Recipes SET name = ?, ingredients = ?, preparationTime = ?, difficulty = ?, steps = ? WHERE id = ?;', 
                    [name, ingredients, preparationTime, difficulty, steps, id],
                    () => {
                        console.log("Recipe updated");
                        resolve();
                    },
                    (_, error) => {
                        console.log("Error updating recipe: ", error);
                        reject(error);
                    }
                );
            });
        });
    }    

    deleteRecipe(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM Recipes WHERE id = ?;', 
                    [id],
                    () => {
                        console.log("Recipe deleted");
                        resolve();
                    },
                    (_, error) => {
                        console.log("Error deleting recipe: ", error);
                        reject(error);
                    }
                );
            });
        });
    }    
}

const databaseManager = new DatabaseManager();
export default databaseManager;
