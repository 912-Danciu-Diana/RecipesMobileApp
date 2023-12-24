import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './routes/homeStack';
import RecipesContextProvider from './contexts/RecipesContext';
import databaseManager from './database/DatabaseManager';

export default function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    try {
      await databaseManager.initDb();
    } catch(error) {
      console.error("Database initilization failed: ", error);
    }
  }

  return (
    <RecipesContextProvider>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </RecipesContextProvider>
  );
}


