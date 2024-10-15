import { useState, useEffect } from "react";

function App() {
  const [URL, setURL] = useState("");
  const [listOfURL, setListOfURL] = useState([]);

  async function handleGetAnalytics() {
    try {
      const response = await fetch("http://localhost:8000/");
      const data = await response.json();
      setListOfURL(data?.data?.allURL);
    } catch (error) {
      console.log(error);
      setListOfURL([]);
    }
  }

  function handleGenerateURL() {}

  useEffect(() => {
    handleGetAnalytics();
  }, []);

  console.log(URL);

  return (
    <div className="p-7 mx-auto">
      <h1 className="text-3xl">URL Shortener</h1>
      <div className="py-10 flex gap-4 items-center">
        <label htmlFor="url">Enter Your Long URL:</label>
        <input
          type="text"
          name="originalURL"
          id="url"
          onChange={(e) => setURL(e.target.value)}
          placeholder="www.example.com"
          className="border-2 border-gray-700 bg-transparent outline-none py-1 px-2"
        />
        <button
          onClick={handleGenerateURL}
          className="bg-purple-500 outline-none border-none py-1 px-5 text-black"
        >
          Generate URL
        </button>
      </div>
      <div className="w-full">
        <h2 className="text-xl pb-10">URL Analytics</h2>
        <table className="border border-gray-300 w-full border-collapse">
          <thead className="pb-10">
            <tr className="text-center border">
              <td className="border border-gray-300 p-2">S. No.</td>
              <td className="border border-gray-300 p-2">Original URL</td>
              <td className="border border-gray-300 p-2">Generated URL</td>
              <td className="border border-gray-300 p-2">Clicks</td>
              <td className="border border-gray-300 p-2">Delete URL</td>
            </tr>
          </thead>
          <tbody>
            {listOfURL.length > 0 &&
              listOfURL.map((url, index) => {
                return (
                  <tr className="text-center border" key={url._id}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {url.originalURL}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {url.generatedURL}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {url.visitHistory.length}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button className="bg-slate-300 px-7 py-1 text-md text-black">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
