import React, { useState } from "react";



const ContactUs = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
      sure_name: "",
      email: "",
      title: "",
      message: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
  
    const handleOpen = () => {
      setIsOpen(true);
    };
    const handleOpen1 = () => {
      setIsOpen1(true);
    };
  
    const handleClose = () => {
      setIsOpen(false);
    };
    const handleClose1 = () => {
      setIsOpen1(false);
    };
  
    const [isClosing, setIsClosing] = useState(false);
    const [isClosing1, setIsClosing1] = useState(false);
  
    //  when   typing within  the input field, we wanna grab the data and update the state 
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        data.sure_name === "" ||
        data.title === "" ||
        data.email === "" ||
        data.message === ""
      ) {
        handleOpen();
      } else {
        setLoader(true);

      }
    };
  return (
    <React.Fragment>
      <div className="mt-2 justify-center relative flex content-center pt-[100px]">
        <h1
          class="text-[300px] font-extrabold absolute top-0 text-[#263B44] drop-shadow-7xl max-w-[1200px] w-[100%]  overflow-x-hidden "
          style={{ transform: "translate(0px,-200px)" }}
        >
          
          
        </h1>
      </div>
      
      <div className="z-20 relative">
        <div className=" justify-center flex content-center">
          <p className="text-[#48AFDE] font-bold  text-7xl "> Contactanos</p>
        </div>
        <div className=" text-center  mt-5 justify-center flex ">
          <p className="text-white font-[300] w-[650px]  text-center   text-xl ">
          Estás buscando expertos en diversas áreas para responder tus preguntas con información confiable y especializada? ¡Déjanos un mensaje y cuéntanos cómo podemos ayudarte en Asky! Estamos aquí para conectar a usuarios con profesionales capacitados que pueden brindarte la orientación que necesitas. 
          </p>
        </div>
      </div>


{/* form fields */}
      <div className={`  flex justify-center items-center`}>
        <div className="bg-white rounded-t-xl w-[850px] mt-10 mb-10  lg:p-20 md:p-10 p-5 mx-5">
          <form>
            <div class="grid lg:gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-[#47626D]"
                >
                  Nombre
                </label>
                <input
                  type="text"   
                  id="first_name"
                  value={data.sure_name}
                  name="sure_name"
                  onChange={handleChange}
                  class="bg-[#EEF7FB]  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div>
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-[#47626D]"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  class="bg-[#EEF7FB]  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                  placeholder="Ingrese su correo electrónico"
                />
              </div>
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-[#47626D]"
              >
                Asunto
              </label>
              <input
                type="text"
                id="text"
                value={data.title}
                name="title"
                onChange={handleChange}
                class="bg-[#EEF7FB]  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                placeholder="Ingresa el asunto"
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-[#47626D]"
              >
                Su mensaje
              </label>
              <textarea
                type="text"
                value={data.message}
                name="message"
                onChange={handleChange}
                id="text"
                class="bg-[#EEF7FB]  text-gray-900 h-[250px] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                placeholder="Cuentanos cómo podemos ayudarte"
              />
            </div>
            {/* <img src="/captcha.png" alt="" className="w-[250px] mb-6" /> */}
            <button
              onClick={handleSubmit}
              disabled={loader}
              class="text-white font-[700] bg-[#48AFDE]  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-lg w-full sm:w-auto px-9 p-3.5 text-center "
            >
              {loader ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                 
                </div>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>







 {/*Implementing the modal pop up for empty fields*/}
     
      <div
        className={`fixed inset-0 flex items-center justify-center z-20 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ${
          isClosing ? "ease-in" : "ease-out"
        }`}
      >
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white rounded-lg font-sans p-4 z-50 w-[400px]">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#F0AD02]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>

            <h2 className="text-lg font-semibold mb-4 ml-4">Attention</h2>
          </div>
          <p className="mb-4">
            Please fill the form carefully. A field is empty!
         
          </p>
          <button
            className="bg-[#F0AD02]  text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Okay!
          </button>
        </div>
      </div> 


 {/*Implementing the modal pop if message is sent succesfully */}
    <div
        className={`fixed inset-0 flex items-center justify-center z-20 ${
          isOpen1 ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ${
          isClosing1 ? "ease-in" : "ease-out"
        }`}
      >
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white rounded-lg font-sans p-4 z-50 w-[400px]">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#39f002]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>

            <h2 className="text-lg font-semibold mb-4 ml-4">Attention</h2>
          </div>
          <p className="mb-4">Message has been sent successfully</p>
          <button
            className="bg-[#39f002]  text-white font-bold py-2 px-4 rounded"
            onClick={handleClose1}
          >
            Okay!
          </button>
        </div>
      </div> 
    </React.Fragment>
  )
}

export default ContactUs