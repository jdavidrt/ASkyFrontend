import React, { useState } from 'react'
import { Values } from '../data/values';



const CompanyValues = () => {
    const [open, setOpen] = React.useState(false);
const [isFlipped, setFlipped] = useState(false);
const [isFaded, setIsFaded] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(0);
const [mapData, setmapData] = useState({
    ...Values[0],
    array: Values[0].array || [],
  });

// Función corregida con tipos definidos
const myFunction = (data) => {
  setFlipped(false);
  setIsFaded(false);
  setmapData(data);
};

// Función corregida con tipos definidos
const handleCardClick = (data, index) => {
  setFlipped(true);
  setIsFaded(true);
  setSelectedIndex(index);
  setTimeout(() => myFunction(data), 600);
};

// Implementando la navegación entre elementos
const HandleNext = () => {
  if (selectedIndex < Values.length - 1) {
    handleCardClick(Values[selectedIndex + 1], selectedIndex + 1);
  } else {
    handleCardClick(Values[0], 0);
  }
};

const HandlePre = () => {
  if (selectedIndex !== 0) {
    handleCardClick(Values[selectedIndex - 1], selectedIndex - 1);
  } else {
    handleCardClick(Values[Values.length - 1], Values.length - 1);
  }
};
  return (
<div className="bg-[#E0F3FB]  pt-10">    
<h1 className="text-[#223740] text-center font-recoletaBlack text-5xl md:text-5xl lg:text-7xl xl:text-7xl mt-0 md:mt-10">
      Nuestros valores
    </h1>
<section className="container mx-auto flex justify-center items-center min-h-screen sm:flex-row md:px-24 px-5">
  
  <div className="hidden sm:flex w-full sm:w-1/2 lg:w-7/12">
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mr-0 lg:mr-10">
      {Values.map((item, index) => (
        <a
          key={index}
          onClick={() => handleCardClick(item, index)}
          style={{ boxShadow: "#48AFDE -5px 10px 20px 0px" }}
          className={`cursor-pointer transition-all transform ${
            selectedIndex === index
              ? " -translate-y-2 bg-[#47626d]"
              : "hover:bg-blue-500 hover:shadow-xl hover:-translate-y-2 bg-white"
          } duration-300 group rounded-xl center p-6 lg:p-10 flex flex-col justify-center items-center`}
        >
          <div className="w-16 h-16 sm:w-10 sm:h-10 lg:w-16 lg:h-16">
            <img src={item.img} alt="" className="w-20 h-20" />
          </div>
          <h4
            className={`text-center text-sm lg:text-xl font-recoletaBold transition-colors duration-500 ${
              selectedIndex === index ? "text-white" : ""
            } group-hover:text-white text-[#47626D] mt-3`}
          >
            {item?.title}
          </h4>
          <div
            className={`absolute -top-2 -right-2 transform transition-all duration-500 opacity-0 ${
              selectedIndex === index ? "opacity-100 rotate-12" : "group-hover:rotate-12"
            } group-hover:opacity-100 shadow-xl w-12 h-12 rounded-lg bg-green-500 flex justify-center items-center font-bold text-white font-recoletaBold text-xl`}
          >
            *{item?.count}
          </div>
        </a>
      ))}
    </div>
  </div>

  {/* displaying the selected card item */}


  
{/* displaying the selected card item */}
<div className="w-full sm:w-1/2 lg:w-5/12 overflow-visible px-0 sm:pl-6 xl:px-10">
  <div className="bg-white rounded-xl p-10 xl:p-14 shadow-accent-color relative">
    <section className={`fade-left overflow-hidden ${isFaded ? "fade-out" : ""}`}>
      <p className="text-[#47626D] text-lg sm:text-base lg:text-xl transition duration-500 transform opacity-100">
        Nos identifica:
      </p>
      <h2 className="font-recoletaBold text-[#47626D] text-3xl sm:text-2xl md:text-3xl mb-6 w-44 md:w-56 transition duration-500 transform opacity-100">
        {mapData?.title}
      </h2>

      <ul className="font-[300] list-disc text-[#47626D] ml-8 lg:ml-10 text-base lg:text-lg transition duration-500 transform opacity-100">
        {mapData?.desc}
        <div className='mt-8 md:mt-5 xl:mt-10 flex md:flex-row flex-col md:justify-start justify-center gap-4'>

      </div>
      </ul>
    </section>

    {/* Moved the Counter to Top-Right */}
    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10">
      <div className="rounded-2xl cursor-pointer text-7xl xl:text-9xl font-recoletaBlack text-white bg-[#47626D] p-5 xl:p-8 w-28 h-28 xl:w-48 xl:h-48 transform transition duration-500 transform-preserve -rotate-6 transform-preserve">
        <span className="text-2xl xl:text-6xl mr-2 sm:mr-3">*</span>
        {mapData?.count}
      </div>
    </div>

    <div className="absolute right-10 -bottom-5 flex">
      <a
        onClick={HandlePre}
        className="w-12 h-12 rounded-xl transform mr-1 transition duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg -rotate-6 flex justify-center items-center bg-[#47626D]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
      </a>
      <a
        onClick={HandleNext}
        className="w-12 h-12 rounded-xl transform mr-1 transition duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg -rotate-6 flex justify-center items-center bg-[#EDF7FB]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-accent-color">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>
  </div>
</div>

</section>

</div>
  )
}

export default CompanyValues