import React, { useReducer, useEffect } from "react";
import {Route, Switch} from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import Landing from "./Landing";
import { API_KEY } from "./Key";

const key = API_KEY;

const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${key}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
    
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
      });
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${key}`)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
      } else {
        dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
        });
      }
    });
  };

  const { movies, errorMessage, loading } = state;

  return (
    
    <div className="App">
      <div className="Nav">
        <Header text="MOVIES" />
        <Search search={search} />
      </div>
     

      <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path='/movies'
          component={() =>
            <div>
               <p className="App-intro">Welcome to Movies React App</p>
            <div className="movies">
            {loading && !errorMessage ? (
              <span className="loader"></span>
            ) : errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
            ) : (
              movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} /> 
              ))
            )}
          </div></div>
         }/>
        </Switch>
       
    </div>
  );
};

export default App;