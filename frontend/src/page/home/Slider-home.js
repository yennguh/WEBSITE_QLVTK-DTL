// ImageSlider.jsx
// Usage:
// 1) Ensure Tailwind CSS is set up in your React app (Tailwind v3+). If using Create React App, follow Tailwind docs.
// 2) Import and use this component:
//    <ImageSlider images={["/img1.jpg","/img2.jpg","/img3.jpg"]} autoPlayInterval={4000} />
// 3) Provide images as URLs or local imports.

import React, { useEffect, useRef, useState } from 'react';

export default function ImageSlider({ images = [], autoPlayInterval = 5000, className = '' }) {
    const [index, setIndex] = useState(0);
    const length = images.length;
    const intervalRef = useRef(null);
    const containerRef = useRef(null);
    const isHoveredRef = useRef(false);

    // wrap safety
    if (!Array.isArray(images)) images = [];

    useEffect(() => {
        console.log('ImageSlider mounted', images);
        startAutoplay();
        return stopAutoplay;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, autoPlayInterval, length]);

    function startAutoplay() {
        stopAutoplay();
        if (length <= 1) return;
        intervalRef.current = setInterval(() => {
            if (isHoveredRef.current) return; // pause on hover
            setIndex(prev => (prev + 1) % length);
        }, autoPlayInterval);
    }

    function stopAutoplay() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function goTo(i) {
        setIndex(((i % length) + length) % length);
    }

    function next() {
        goTo(index + 1);
    }

    function prev() {
        goTo(index - 1);
    }

    // keyboard navigation
    useEffect(() => {
        function onKey(e) {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, length]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl shadow-md ${className}`}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            aria-roledescription="carousel"
        >
            {/* Slides container */}
            <div className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)`, width: `${Math.max(1, length) * 100}%` }}>
                {images.length === 0 ? (
                    <div className="w-full flex items-center justify-center p-12 bg-gray-100 text-gray-500">No images provided</div>
                ) : images.map((src, i) => (
                    <div key={i} className="w-full flex-shrink-0 relative">
                        <img
                            src={src}
                            alt={`slide-${i + 1}`}
                            className="w-full h-[520px] object-cover"
                            draggable={false}
                        />
                        {/* optional caption area (uncomment to use) */}
                        {/* <div className="absolute bottom-4 left-4 bg-black/40 text-white px-3 py-1 rounded">Caption {i+1}</div> */}
                    </div>
                ))}
            </div>

            {/* Prev / Next buttons */}
            {length > 1 && (
                <>
                    <button
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white"
                        onClick={prev}
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white"
                        onClick={next}
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </>
            )}

            {/* Indicators */}
            {length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`w-3 h-3 rounded-full transition-transform duration-200 ${i === index ? 'scale-125' : 'scale-100'} bg-white/90 ring-1 ring-black/10`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Optional small controls: pause / play */}
            {/* Uncomment to expose play/pause control
      <div className="absolute top-3 right-3 z-10">
        <button onClick={() => { if(intervalRef.current) stopAutoplay(); else startAutoplay(); }} className="px-2 py-1 bg-white/80 rounded">Toggle</button>
      </div>
      */}
        </div>
    );
}
