import Link from 'next/link'

export default function Login() {
  return (
    <div className='h-screen flex flex-col justify-center bg-gray-200'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='text-center mt-4'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Log in
          </h2>
          <p className='mt-2 text-center text-md text-gray-600'>
            {"Don't have an account? "}
            <Link href='/signup'>
              <a href='#' className='text-blue-500'>
                Sign Up
              </a>
            </Link>
          </p>
        </div>
        <div className='mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          Todo: Create Login form component and add here
        </div>
      </div>
    </div>
  )
}
