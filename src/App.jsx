import React from 'react'
import './styles.css'
import axios from 'axios'
import Collection from './components/Collection/Collection'

function App() {

  const categories = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  // data
  const [collections, setCollections] = React.useState([])
  const [categoryId, setCategoryId] = React.useState(0)
  const [page, setPage] = React.useState(1)

  // loading
  const [isLoading, setIsLoading] = React.useState(true)
  
  // search
  const [searchValue, setSearchValue] = React.useState('')


  React.useEffect(() => {
    const fetchData = async () => {

      const category = categoryId ? `category=${categoryId}` : ''
      try {
        setIsLoading(true)
        const response = await axios.get(`https://63ab0d40cf281dba8c18d8c1.mockapi.io/collections?page=${page}&limit=3&${category}`) 
        setCollections(response.data)
      } catch (error) {
        alert('Не удалось загрузить данные')
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((obj, i) => <li className={categoryId === i ? 'active' : ''} key={obj.name} onClick={() => setCategoryId(i)}>{obj.name}</li>)
          }
        </ul>
        <input className="search-input" placeholder="Поиск по названию" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
      </div>
      <div className="content">
        {
          isLoading 
          ? (
            'Загрузка...'
          ) : (
            collections
            .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) =>
              <Collection
                key={index}
                name={item.name}
                images={item.photos}
              />)
          )
        }
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => 
            <li onClick={() => setPage(i+1)} className={page === (i+1) ? 'active' : ''}>{i +1}</li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
