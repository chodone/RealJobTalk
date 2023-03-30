'use client'
import React from 'react'
import {getData} from '@/redux/reducer/reducer'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import {useEffect} from 'react'

const HomeCompany = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.action)
  console.log(count)
  useEffect(() => {
    dispatch(getData())
  },[])
  return (
    <div>
      hi
    </div>
  )
}

export default HomeCompany
