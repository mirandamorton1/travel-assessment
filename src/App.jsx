import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="pt-4">
        <SearchBar />
      </div>
    </>
  );
}

export default App;
