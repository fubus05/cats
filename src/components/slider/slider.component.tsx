import { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getCat } from '../../store/cat/cat.slice'
import { AppDispatch } from '../../store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './style.css';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);


export const Slider = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [cat, selectorID] = useSelector((state: any) => [
    state.cat,
    state.dropdown
  ], shallowEqual)

  useEffect(() => {
    dispatch(getCat(selectorID.selectedID))
  }, [dispatch, selectorID.selectedID])

  return (
    <div className='card-cat-wrapper'>
        <Swiper
        tag="section"
        wrapperTag="ul"
        navigation
        pagination
        slidesPerView={1}
        >
        {
            cat.loading === 'idle' && cat.data[0]?.map((el: any) => ( 
                <SwiperSlide key={el.id}>
                    <img src={el.url} className='cat-image' alt={el.id}/>
                </SwiperSlide>
            ))
        }
        </Swiper>
        <div className='card-cat-info'>
            <h2>{cat.data[1]?.name}</h2>
            <p>{cat.data[1]?.description}</p>
        </div>
    </div>
  );
}

export default Slider;
