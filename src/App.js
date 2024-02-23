import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Simpsons from "./components/Simpsons";
import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const getApiData = async () => {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );
    setSimpsons(data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  console.log(simpsons);

  const onInput = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!simpsons) return <p>Loading...</p>;

  let filtered = [...simpsons];
  filtered = filtered.filter((item) => {
    return item.character.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const onLikeToggle = (quote) => {
    const likedSimpsons = simpsons.map((item) =>
      item.quote === quote ? { ...item, liked: !item.liked } : item
    );
    setSimpsons(likedSimpsons);
  };

  let count = simpsons.filter((item) => item.liked).length;

  const deleteCharacter = (quote) => {
    const deletedSimpsons = simpsons.map((item) =>
      item.quote === quote ? { ...item, deleted: true } : item
    );
    setSimpsons(deletedSimpsons.filter((item) => !item.deleted));
  };

  return (
    <>
      <header>
        <h1>The Simpsons</h1>
      </header>
      <main>
        <div className="search-container">
          <div>
            <Search onInput={onInput} />
          </div>
          <div>
            <p>Likes: {count}</p>
          </div>
        </div>
        <Simpsons
          simpsons={filtered}
          onLikeToggle={onLikeToggle}
          deleteCharacter={deleteCharacter}
        />
      </main>
      <footer></footer>
    </>
  );
};

export default App;
