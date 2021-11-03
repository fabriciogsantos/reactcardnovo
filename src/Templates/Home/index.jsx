import "./styles.css";

import React, { useEffect, useState, useCallback } from "react";
import { loadPosts } from "../../Ultis/load-posts";
import { Posts } from "../../components/posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const noMorePosts = posts.length >= allPosts.length;

  const hanldeLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    hanldeLoadPosts(0, postsPerPage);
  }, [hanldeLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <h1>BUSCA NÃO ENCONTRADA</h1>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load More Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// //--------------------------------- classes-------------------
// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   }

//   async componentDidMount() {
//     await this.loadPosts();

//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos
//     })
//   }

//   componentDidUpdate() {
//   }

//   componentWillUnmount() {
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage })

//   }

//   handleChange = (event) => {
//     const { value } = event.target;
//     this.setState({ searchValue: value })
//   }

//   render() {
//     const {
//       posts,
//       allPosts,
//       searchValue
//     } = this.state;

//     const noMorePosts = posts.length >= allPosts.length;

//     const filteredPosts = !!searchValue ? allPosts.filter(post => {

//       return post.title.toLowerCase().includes(searchValue.toLowerCase());
//     })
//       : posts;

//     return (
//       <section className='container'>
//         <div className='search-container'>
//         {!!searchValue && (
//             <h1>Search Value: {searchValue}</h1>
//         )}
//         <TextInput searchValue={searchValue} handleChange={this.handleChange} />
//         </div>

//         {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
//         {filteredPosts.length === 0 && (<h1>BUSCA NÃO ENCONTRADA</h1>)}

//         <div className='button-container'>
//           {!searchValue && (<Button
//             text='Load More Posts'
//             onClick={this.loadMorePosts}
//             disabled={noMorePosts} />)}

//         </div>
//       </section>
//     );
//   }
// }

// ----------------------------inicial
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
