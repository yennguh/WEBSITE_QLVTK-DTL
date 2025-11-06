import React from 'react';
import ImageSlider from './Slider-home';
import slider1 from '../../public/assets/slider-1.jpg';
import slider2 from '../../public/assets/slider-2.jpg';
import slider3 from '../../public/assets/slider-3.jpg';
export default function Home() {
  return (
    <main className="site-content">
      <div className="content-inner">
        <ImageSlider images={[slider1, slider2, slider3]} autoPlayInterval={7000} />

      </div>
    </main>
  );
}
