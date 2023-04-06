import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.css'

export interface dbObject {
  id:number
  name: string;
  imgUrl: string;
}



const Trail: React.FC<{ open: boolean; children?: React.ReactNode }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function RecommendCompany({recommendCompany=[]}:{recommendCompany:Array<dbObject> }) {
  const [open, set] = useState(true)
  const companies = recommendCompany
  return (
    <div className={styles.container} >
      <div className='grid grid-cols-5'>
        {companies.map((company: dbObject) => {
          return (
            <div key={company.id}>
              <Link
                className="transform h-64 w-64 transition duration-500 hover:scale-125"
                href={{
                  pathname: `info/${company.name}/${company.id}`,
                }}
              >
                <div className=" mx-2 border-2 rounded-lg justify-center pt-2 items-center transform transition duration-500 hover:scale-90">
                  <Trail open={open}>
                    <Image
                      className=" h-80 w-80"
                      src={company.imgUrl}
                      alt=""
                      width={150}
                      height={50}
                      style={{ width: 150, height: 50 }}
                    />
                  </Trail>

                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <Trail open={open}>
        
          <span className=''>추천 기업</span>
        
      </Trail> */}
    </div>
  )
}
