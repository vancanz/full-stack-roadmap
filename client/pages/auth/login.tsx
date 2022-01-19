import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'universal-cookie'

import FormButton from '../../components/FormButton'
import InputForm from '../../components/InputForm'
import { Alert, Toast } from '../../config'
import Header from '../../components/Header'

const Login = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const router = useRouter()
  const cookie = new Cookies()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    Alert.fire({
      title: 'Loading...',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Alert.showLoading()
      },
    })

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email,
        password,
      })
      Alert.close()
      Toast.fire({
        title: 'Login success!',
      })
      cookie.set('token', res.data.accessToken, {
        path: '/',
        maxAge: 3000000,
      })
      router.push('/dashboard')
    } catch (err: any) {
      Alert.close()
      switch (err.response.status) {
        case 500:
          Alert.fire({
            icon: 'error',
            title: 'Login gagal!',
            text: 'Terjadi kesalahan pada server',
          })
          break
        case 404:
          Alert.fire({
            icon: 'error',
            title: 'Login gagal!',
            text: 'Akun tidak ditemukan ',
          })
          break
        case 401:
          Alert.fire({
            icon: 'error',
            title: 'Login gagal!',
            text: 'Password salah',
          })
          break
        default:
          Alert.fire({
            icon: 'error',
            title: 'Login gagal!',
          })
          break
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Login | Full Stack Roadmap</title>
      </Head>
      <div className='flex flex-col p-3 space-y-3 md:mx-48 lg:mx-96 md:min-h-screen md:grid md:place-items-center'>
        <div className='lg:flex lg:flex-col'>
          <div className='flex justify-center'>
            <Header>
              <p className='font-bold text-2xl'>Login</p>
            </Header>
          </div>
          <div className='px-6'>
            <form method='POST' className='space-y-3' onSubmit={handleSubmit}>
              <InputForm
                label='Email'
                id='email'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <InputForm
                label='Password'
                id='password'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <FormButton color='sky-600'>Login</FormButton>
            </form>
          </div>
          <div className='px-6'>
            <p className='text-gray-200 text-sm mt-4 flex justify-center items-center font-light'>
              Belum punya akun?{' '}
              <Link href='/auth/register'>
                <a className='bg-green-600 px-2 py-1 rounded-md text-xs mx-2 font-medium text-gray-800'>
                  Register
                </a>
              </Link>{' '}
              sekarang!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
