import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCatBreeds } from './store/cat-breed/cat-breed.slice'
import { AppDispatch } from './store/store';
import { Dropdown } from './components/dropdown/dropdown.component';
import Slider from './components/slider/slider.component';

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: any) => state.breeds)

  useEffect(() => {
    dispatch(getCatBreeds())
  }, [dispatch])

  return (
    <div className="App">
      <Dropdown options={ data.map((el: any) => {return {id: el.id,label: el.name}} ) }/>
      <Slider/>
    </div>
  );
}

export default App;