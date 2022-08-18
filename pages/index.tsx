import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Video from '../components/Video/Video.component'
import styles from '../styles/Home.module.css'
import Audio from '../components/Audio/Audio.component'

const Home: NextPage = () => {
  return (
    <div>
      {/* <Video /> */}
      <Audio />
    </div>
  )
}

export default Home
