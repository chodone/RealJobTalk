"use client";
import React, { useRef }  from "react";
import { getData } from "@/redux/reducer/reducer";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import Company from "@/components/Company";
import Carousel from "better-react-carousel";
import logo2 from '@public/images/logo2.png'
import samsung from '@public/images/company/samsung.png'
import lg from '@public/images/company/lg.png'
import sk from '@public/images/company/sk.png'
import mobis from '@public/images/company/mobis.png'
import kia from '@public/images/company/kia.png'
import hd from '@public/images/company/hd.png'
import hanhwa from '@public/images/company/hanhwa.png'
import hana from '@public/images/company/hana.png'
import gs from '@public/images/company/gs.png'
import Image from "next/image";
import api from "@/redux/api";


export interface dbObject {
  name: string;
  imgUrl: string;
  id:number
}


const HomeCompany = () => {

  const companies = useAppSelector((state) => state.action);
  const datas:Array<dbObject> = companies.data;
  const dispatch = useAppDispatch();
  const parallax = useRef<IParallax>(null!)

  useEffect(() => {

    dispatch(getData());
    
  }, []);


  // console.log(companies)
  // const getAuth = useAppSelector((state) => state.auth)
  // const samsungLogo = samsung 
  // const hd = datas[1].imgUrl
  // const lg = datas[3].imgUrl
  // const kia = datas[4].imgUrl
  // const hanhaw = datas[6].imgUrl
  // const sk = datas[7].imgUrl
  // const hdMobis = datas[9].imgUrl
  return (
    <>
      <div style={{ width: "100%", height: "100%", background: "#87BCDE" }}>
        <Parallax ref={parallax} pages={2}>
          <ParallaxLayer offset={0} speed={1} style={{ backgroundColor: "#c0ffb2" }} />
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: "#fafafa" }} />
          

          

          <ParallaxLayer offset={0} speed={0.8} style={{ opacity: 0.5 }}>
          <Image src={hd} width={238} height={87} style={{ display: "block", width: "10%", marginLeft: "15%" }} alt="" />
            <Image src={samsung} width={238} height={87} style={{ display: "block", width: "15%", marginLeft: "75%" }} alt="" />
            <Image src={lg} width={238} height={87} style={{ display: "block", width: "10%", marginLeft: "40%" }} alt="" />
            <Image src={hana} width={238} height={87} style={{ display: "block", width: "7%", marginLeft: "60%" }} alt="" />
            <Image src={hanhwa} width={238} height={87} style={{ display: "block", width: "13%", marginLeft: "5%" }} alt="" />
            <Image src={sk} width={238} height={87} alt="" style={{ display: "block", width: "8%", marginLeft: "35%" }}/>
            <Image src={kia} width={238} height={87} style={{ display: "block", width: "9%", marginLeft: "80%" }} alt="" />
            <Image src={mobis} width={238} height={87} style={{ display: "block", width: "6%", marginLeft: "15%" }} alt=""/>

          </ParallaxLayer>

          
            

          
  

          
  

          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
            }}
          >
            {/* <img src={url('server')} style={{ width: '20%' }} /> */}
            <section className="text-black body-font">
              <div className="container mx-auto mt-40 flex px-5 py-5 md:flex-row flex-col items-center">
                <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                  <h1 className="title-font tracking-wide sm:text3xl md:text-6xl xl:text-6xl mb-4 font-bold ">
                    취업을 돕는 진짜 정보{" "}
                  </h1>
                  <div className="flex my-5">
                    <Image src={logo2} width={81} height={89} alt="" />
                    <h1 className="title-font tracking-wide sm:text-3xl md:text-6xl xl:text-7xl mb-4 font-bold ">
                      취준진담{" "}
                    </h1>
                  </div>
                  {/* <p className=" leading-relaxed opacity-50 ">
                    기업별로
                  </p>
                  <p className=" leading-relaxed opacity-50 ">
                    기업별로
                  </p>
                  <p className="mb-8 leading-relaxed opacity-50 ">
                    기업별로
                  </p> */}
                  <div className="flex justify-center">
                    <button onClick={() => parallax.current.scrollTo(1)} className="my-10 inline-flex text-white bg-green-400 py-2 px-4 focus:outline-none hover:bg-opacity-80 rounded text-sm">
                      <p className=" text-lg">
                      기업 조회하러가기
                      </p>
                    </button>
                  </div>
                </div>
                <div
                  id="pattern"
                  className="w-32 sm:w-40 lg:max-w-xl lg:w-full md:w-32 xl:w-5/6 bg-contain bg-no-repeat md:ml-40 xl:mr-16"
                >
                </div>
              </div>
            </section>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            // onClick={() => parallax.current.scrollTo(2)}
            style={
              {
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
              }
            }
          >
            {/* <img src={url('bash')} style={{ width: '40%' }} /> */}
            <Carousel cols={4} rows={5}>
              {datas.map((company, idx) => (
                <Carousel.Item key={idx}>
                  <Company company={company} key={idx} />
                </Carousel.Item>
              ))}
            </Carousel>
          </ParallaxLayer>

          
        </Parallax>
      </div>
      {/* <section className="text-black body-font">
      <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font tracking-wide sm:text-3xl md:text-6xl xl:text-7xl mb-4 font-bold ">취업을 돕는 진짜 정보          </h1>
            <div className="flex ">
              <Image src={logo2} width={81} height={89} alt=""/>
              <h1 className="title-font tracking-wide sm:text-3xl md:text-6xl xl:text-7xl mb-4 font-bold ">취준진담          </h1>
            </div>
          <p className="mb-8 leading-relaxed opacity-50 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, sit ut fermentum posuere platea. Cras turpis adipiscing varius id sed leo morbi. Morbi amet, lectus pretium et vitae duis lectus in lorem. </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-blue-500 py-2 px-4 focus:outline-none hover:bg-opacity-80 rounded text-sm">Book a demo</button>
            
          </div>
        </div>
        <div  id="pattern" className="w-32 sm:w-40 lg:max-w-xl lg:w-full md:w-32 xl:w-5/6 bg-contain bg-no-repeat md:ml-40 xl:mr-16">
          <div className="w-full flex gap-3 justify-center ">
    
            <Image width={208} height={145} className="object-cover object-center rounded-xl " alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/>
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/> 
          </div>
          <div className="w-full h- flex gap-2 justify-center items-center my-2">
    
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/>
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/> 
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/> 
          </div>
          <div className="w-full flex gap-3 justify-center">
    
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/>
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/> 
          </div>
              <div className="w-full flex gap-3 justify-center my-2">
    
            <Image width={208} height={145} className="object-cover object-center rounded-xl" alt="hero" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACRBAMAAABAjiuOAAAAG1BMVEXMzMwAAAB/f38zMzMZGRlmZmaysrKZmZlMTEy3MKaDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB8ElEQVRoge2VwW/aMBSHX6HEHFspW6/VyKodEYH1Cm2AHpFAGkdHq2iPTItGj2iDqX923/PDWQaT1pnLDr8PxS8kxh/PfrKJAAAAAAAAAAAAAAAAAAAAAHgFte75kENjEE84PA7inwddPk80zuU+TdNOkCi9ioo2h6VJicwbG80u93qYbK0x5iZfrVbfgkSWryE12VVf0ylLzNlej+RJRaczboogiWdKOfuitzrM+PeXzVFTRc/F0aKEWhJ6lEsYSWPLZkoqqvVF0jpK1KKthLlOXV/uf/AVjdWmonsrog9HibbUUZ+54fSWcl/nRbu/1Ncq6rhpm5t3y2APL4777zzQ491mV94pRTdUETXWTjS7fe4Gm7jcvOjpbnO9e9j2CamosE703pK5CBUl1osaHIu1Pk19Qk4k6+UrbhroMSPSNUr4Q+WMfelXRc3JL1EeKCqWpFU39TVBzpdWRclisUgW1n0/sUEeM6bdbGzLpSIpOSm8UrTJsmyQ6ZM8TOTK2e0MF5WMZAJ9SrudoZy6sN2h5rLgwpP9ziXWk0ZKzqe0L+oFiWZW2mho5a7Otf3VDf9dmutD0Sc+KdoHg7yC6FzgX8eDj6K97Q4P+lRFrfgPHf4Jo6fMw98OmyjsNAIAAAAAAAAAAAAAAAAAAAD/Fy/qz1FpTjHvDAAAAABJRU5ErkJggg=="/>
          </div>
        </div>
      </div>
      
    </section>
        <Carousel cols={4} rows={6}>
              {datas.map((company, idx) => (
                <Carousel.Item key={idx}><Company  company={company} key={idx} /></Carousel.Item>
              ))}
        </Carousel> */}
    </>
  );
};

export default HomeCompany;