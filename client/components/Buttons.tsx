import Link from 'next/link'

type ButtonsProps = {
  linkVideo: string
  linkDocs: string
  title: string
  color?: string
  shade: string
}

const Buttons = ({ linkVideo, linkDocs, title, shade }: ButtonsProps) => {
  const tempShade: string[] = shade.split('-')
  tempShade[1] = (Number(tempShade[1]) - 100).toString()
  shade = tempShade.join('-')
  return (
    <div className='flex space-x-2 text-sm'>
      <Link href={linkVideo}>
        <a
          target='_blank'
          className={`flex w-1/2 items-center justify-center space-x-0.5 rounded-md bg-transparent py-2 font-semibold text-gray-800 ring-1 ring-gray-800 transition duration-500 ease-in-out hover:bg-gray-800/25 hover:brightness-75`}
          id={`Playlist ${title}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
              clipRule='evenodd'
            />
          </svg>
          <span>Belajar</span>
        </a>
      </Link>
      <Link href={linkDocs}>
        <a
          target='_blank'
          className={`w-1/2 bg-gray-800 py-2 text-${shade} flex items-center justify-center space-x-0.5 rounded-md font-semibold transition duration-500 ease-in-out hover:brightness-75`}
          id={`Dokumentasi ${title}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
          </svg>
          <span>Docs</span>
        </a>
      </Link>
    </div>
  )
}

export default Buttons
