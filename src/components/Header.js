import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const cld = new Cloudinary({
        cloud: {
          cloudName: "ao73ir9fa",
        },
    });

    gsap.registerPlugin(ScrollTrigger);
    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const leftSectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Grid Scroll Effect
            gsap.to(gridRef.current, {
                yPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 5, // Hacer la animación más lenta
                    pin: true,
                },
            });

            // Left Section Pinned Until Grid Scroll Finishes
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                pin: leftSectionRef.current,
                pinSpacing: false,
            });

            // Unified Scroll Effect for Small Screens
            if (window.innerWidth < 768) {
                gsap.to([textRef.current, gridRef.current], {
                    yPercent: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 5,
                    },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <React.Fragment>
            <div
                id="home"
                className="relative w-full"
                style={{ backgroundImage: "linear-gradient(55deg, #EEF7FB 0 50%,rgb(193, 227, 243) 0% 100%)" }}
            >
                <div className="relative flex flex-col md:flex-row w-full">
                    {/* Left Section - Stays Fixed Until Grid Scroll Ends */}
                    <div ref={leftSectionRef} className="w-full md:w-1/3 h-screen flex items-center justify-center bg-transparent">
                        <div className="p-10 text-center md:text-left" ref={textRef}>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#223740]">
                                La plataforma para hacer el aprendizaje {" "}
                                <span className="text-[#48AFDE]">fácil.</span>
                            </h1>
                            <p className="text-gray-600 mt-4">
                                Todo el conocimiento que necesitas, en un solo lugar.
                            </p>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start mt-6">
                                <div className="flex justify-center md:justify-start -space-x-4 rtl:space-x-reverse mr-6">
                                    <img className="w-12 h-12 md:w-[4rem] md:h-[4rem] rounded-full dark:border-gray-800" src="https://i1.pickpik.com/photos/781/224/981/596898a313784-preview.jpg" alt=""/>
                                    <img className="w-12 h-12 md:w-[4rem] md:h-[4rem] rounded-full dark:border-gray-800" src="https://i1.pickpik.com/photos/421/545/252/caucasian-interior-coffee-man-preview.jpg" alt=""/>
                                    <img className="w-12 h-12 md:w-[4rem] md:h-[4rem] rounded-full dark:border-gray-800" src="https://i1.pickpik.com/photos/286/766/546/beard-close-up-face-facial-expression-preview.jpg" alt=""/>
                                    <img className="w-12 h-12 md:w-[4rem] md:h-[4rem] rounded-full dark:border-gray-800" src="https://i1.pickpik.com/photos/619/674/331/male-model-actor-man-preview.jpg" alt=""/>
                                    <img className="w-12 h-12 md:w-[4rem] md:h-[4rem] rounded-full dark:border-gray-800" src="https://i1.pickpik.com/photos/973/153/71/woman-freckle-caucasian-blonde-preview.jpg" alt=""/>
                                </div>
                                <div>
                                    <h5 className="text-[1.5rem] font-semibold text-gray-900">30 Millionones +</h5>
                                    <p className="text-sm text-gray-600"> Estudiantes confían en Asky.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => loginWithRedirect()}
                                className="mt-6 bg-black text-white px-5 py-2 rounded-lg ">
                                Empieza ahora
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Scrollable Grid */}
                    <div className="w-full md:w-2/3 ml-auto relative overflow-hidden">
                        <div ref={containerRef} className="relative h-[124vh] w-full flex items-center">
                            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 auto-rows-[minmax(200px,_auto)]">
                                <div className="bg-blue-500 text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between md:col-span-2">
                                    <div className="text-center md:text-left">
                                        <h4 className="text-xl font-bold mb-4">Un espacio diseñado para mantener tu aprendizaje en constante crecimiento y motivarte</h4>
                                    </div>
                                    <img src="https://website-cdn.studysmarter.de/sites/14/2023/12/smartmockups_loo5ljiu-1.png" alt="Study app" className="mt-4 w-full max-w-xs mx-auto"/>
                                </div>
                                <div className="bg-[#93bfcf] text-white p-6 rounded-lg flex flex-col justify-between">
                                    <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740842521/screens/AskyApp5_qpsoqs.png" alt="Flashcards" className="mb-4 w-full max-w-xs mx-auto"/>
                                    <h4 className="text-lg font-semibold">Crea oportunidades de enseñanza apoyando como experto.</h4>
                                </div>
                                <div className="bg-cyan-500 text-white p-6 rounded-lg flex flex-col justify-between">
                                    <h4 className="text-lg font-semibold">Pon a prueba tu conocimiento y recibe retroalimentación inmediata.</h4>
                                    <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740842309/screens/AskyApp3_pyyrxn.png" alt="Instant feedback" className="mt-4 w-full max-w-xs mx-auto"/>
                                </div>
                                <div className="bg-[#9bbfdd] text-white p-6 rounded-lg text-center">
                                    <h4 className="text-lg font-semibold mb-4">Nuestros usuarios mejoran su comprensión con nuestra plataforma</h4>
                                    <a href="#" className="bg-white text-[#9bbfdd] px-4 py-2 rounded-lg">Empieza ahora</a>
                                </div>
                                <div className="bg-[#9bbfdd] text-white p-6 rounded-lg text-center">
                                    <h4 className="text-lg font-semibold">Obtén respuestas precisas con una inversión intelgente.</h4>
                                </div>
                                <div className="rounded-lg overflow-hidden md:row-span-2">
                                    <AdvancedVideo 
                                        cldVid={cld.video("kbgpauin53c1roj1mbyg")}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls={false} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="bg-[#93bfcf] text-white p-6 rounded-lg text-center">
                                    <h4 className="text-lg font-semibold">Aprende contestando inquietudes a otros.</h4>
                                </div>
                                <div className="bg-black text-white p-6 rounded-lg text-center">
                                    <h4 className="text-lg font-semibold">Confia en Asky para cualquier cualquier tema de consulta.</h4>
                                    <div className="flex justify-center space-x-2 mt-4">
                                        <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740843987/icons/expertIcon_dpx0hb.png" className="w-32"/>
                                        <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740843987/icons/clientIcon_hjx54q.png" className="w-32"/>
                                    </div>
                                </div>
                                <div className="bg-[#9bbfdd] text-white p-6 rounded-lg flex flex-col justify-between">
                                    <h4 className="text-lg font-semibold">Genera explicaciones sobre cualquier tema como experto.</h4>
                                    <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740842309/screens/AskyApp4_k0gvpx.png" alt="AI explanations" className="mt-4 w-full max-w-xs mx-auto"/>
                                </div>
                                <div className="bg-cyan-500 text-white p-6 rounded-lg flex flex-col justify-between">
                                    <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740842309/screens/AskyApp2_jayhfi.png" alt="Spaced Repetition" className="mb-4 w-full max-w-xs mx-auto"/>
                                    <h4 className="text-lg font-semibold">Aprendizaje basado en consultas espeficas, probado científicamente.</h4>
                                </div>
                                <div className="bg-black text-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-center md:col-span-2">
                                    <div className="text-center md:text-left">
                                        <h4 className="text-lg font-semibold mb-4">Aprende en tu teléfono, tablet y laptop.</h4>
                                        <a href="#" className="bg-white text-black px-4 py-2 rounded-lg">Empieza ahora</a>
                                    </div>
                                    <div className="md:flex-1 flex justify-end">
                                        <img src="https://res.cloudinary.com/ao73ir9fa/image/upload/v1740930312/screens/Responsive_-_Asky_tcb4a9.png" 
                                            alt="Devices" 
                                            className="w-full max-w-lg md:max-w-md lg:max-w-lg border border-[#B0BEC5] rounded-lg shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </React.Fragment>
    )
}

export default Header