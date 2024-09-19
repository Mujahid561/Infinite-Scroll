import "./App.css";
import { useState, useEffect } from "react";
import ImageComp from "./ImageComp";

function App() {
  const [data, setData] = useState();
  const [bottomReached, setBottomReached] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch("https://meme-api.com/gimme/30");
    const jsonData = await data.json();
    if (jsonData) {
      setLoading(false);
    }
    return jsonData;
  };

  const Shimmer = () => {
    let arr = new Array(15).fill(1);

    return (
      <div className=" shimmyUI w-[100%]  h-[200px] flex flex-wrap">
        {arr.map(() => {
          return (
            <div className="w-[18%] bg-slate-400 my-3 mx-[10px]  h-[200px] "></div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    let fetchedData = async () => {
      let fetdata = await fetchData();

      setData(fetdata?.memes || []);
    };
    fetchedData();
  }, []);

  useEffect(() => {
    let fetchedData = async () => {
      let updatedData = await fetchData();

      setData([...data, ...updatedData?.memes] || []);
    };
    if (bottomReached) {
      fetchedData();
    }
  }, [bottomReached]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
        setBottomReached(true);
      } else {
        setBottomReached(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="w-[100%] min-h-screen h-auto bg-black flex">
        <div className="w-[100%] flex flex-wrap ">
          {data?.map((elem, index) => {
            return <ImageComp key={index} data={elem} />;
          })}
        </div>
        {/* {loading && <Shimmer />} */}
      </div>
    </div>
  );
}

export default App;
