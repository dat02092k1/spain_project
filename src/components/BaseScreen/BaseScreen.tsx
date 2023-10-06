import React from 'react'

function BaseScreen() {
  return (
    <>
    <div className="bg-gradient-to-b from-[#000] to-[#250631] h-full relative w-full font-[Roboto] scrollbar">
        <div className="absolute top-0 left-0 right-0 z-0 h-full w-full">
          <picture>
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20190222/ourmid/pngtree-hand-painted-forest-trees-mountain-peak-image_48348.jpg"
              alt=""
            />
          </picture>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0 h-screen w-full">
        <picture className='h-screen'>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20190222/ourmid/pngtree-hand-painted-forest-trees-mountain-peak-image_48348.jpg"
            alt=""
            className='h-screen'
          />
        </picture>
      </div>
      </>
  )
}

export default BaseScreen