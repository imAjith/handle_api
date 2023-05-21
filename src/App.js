import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/header";
import { Fragment, useEffect, useState } from "react";

function App() {
  const [post, setPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [max, setMax] = useState(false);
  const [len, setLen] = useState()
  const itemPerPage = 4;

  const findLastIndex = currentPage * itemPerPage;
  const findFirstIndex = findLastIndex - itemPerPage;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => {
        setPost(data);
        setLen(data.length);
      });
  }, []);

  const displayedItems = post && post.slice(findFirstIndex, findLastIndex);

  const goToPreviousPage = () => {
    setMax(false);
    console.log('clicked goToPreviousPage')
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    console.log('clicked count crr',currentPage)
  };

  const goToNextPage = () => {
    console.log('clicked goToNextPage')
    const totalPages = Math.ceil(len / itemPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }else{
      return setMax(true)
    }
    console.log('clicked totalPages crr',totalPages)
    console.log('currentPage totalPages crr',currentPage)
  };



  return (
    <div className="Ap">
      <Header />
      <div className="contianer">
        {displayedItems ? (
          <ul>
            {displayedItems.map((data) => {
              let captilize = data.title;
              let uppCase = captilize.charAt(0).toUpperCase() + captilize.slice(1);
              return (
                <li style={{ listStyleType: 'none'}} key={data.id}>
                  <div className="card" style={{ margin: '10px' }}>
                    <div className="card-body">
                      <h5 className="card-title">{data.id}.         {uppCase}</h5>
                      <p className="card-text">{data.body}</p>
                      <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      {displayedItems && <div className="d-grid d-md-block gap-2 col-2 mx-auto">
  <button onClick={goToPreviousPage} className="btn btn-primary me-md-2" type="button">Previous</button>
  <button onClick={goToNextPage} className="btn btn-primary" disabled={max} type="button">Next</button>
</div>}
    </div>
  );
}

export default App;
