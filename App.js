import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './routes/homeStack';
import RecipesContextProvider from './contexts/RecipesContext';

export default function App() {
  return (
    <RecipesContextProvider>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </RecipesContextProvider>
  );
}


