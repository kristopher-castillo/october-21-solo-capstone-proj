import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import RecipePage from './components/RecipePage';
import NewRecipePage from './components/NewRecipePage';
import HomePage from './components/HomePage';
import NewRecipeIngredientsPage from './components/NewRecipeIngredientsPage';
import NewRecipeInstructionsPage from './components/NewRecipeInstructionsPage';
import EditRecipePage from './components/EditRecipePage';
import EditRecipeIngredientsPage from './components/EditRecipeIngredientsPage';
import EditRecipeInstructionsPage from './components/EditRecipeInstructionsPage';

import { authenticate } from './store/session';
import { getUsers } from './store/user';
import RecipesPage from './components/RecipesPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getUsers()), [dispatch])

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/recipes" exact={true}>
          <RecipesPage />
        </Route>
        <Route path="/recipes/new" exact={true}>
          <NewRecipePage />
        </Route>
        <Route path="/recipes/new/:recipeId/ingredients" exact={true}>
          <NewRecipeIngredientsPage />
        </Route>
        <Route path="/recipes/new/:recipeId/instructions" exact={true}>
          <NewRecipeInstructionsPage />
        </Route>
        <Route path="/recipes/:recipeId" exact={true}>
          <RecipePage />
        </Route>
        <Route path="/recipes/edit/:recipeId" exact={true}>
          <EditRecipePage />
        </Route>
        <Route path="/recipes/edit/:recipeId/ingredients" exact={true}>
          <EditRecipeIngredientsPage />
        </Route>
        <Route path="/recipes/edit/:recipeId/instructions" exact={true}>
          <EditRecipeInstructionsPage />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
