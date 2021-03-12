import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import DatePicker from 'react-datepicker'
import router from 'next/router'

import 'react-datepicker/dist/react-datepicker.css'

export default function addWorkout() {
  const { register, errors, handleSubmit, control, watch } = useForm()
  const date = watch(['date'])

  const auth = useAuth()

  const onSubmit = (data) => {
    auth.addWorkout(data)
    router.push('/dashboard')
  }

  return (
    <>
      <div className='justify-center items-center flex outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
              <h3 className='text-3xl font-semibold'>Add Workout</h3>
              <button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='rounded-md shadow-sm'>
                  <label
                    htmlFor='date'
                    className='block text-sm font-medium leading-5 text-gray-700'
                  >
                    Date:
                  </label>
                  <Controller
                    control={control}
                    name='Datepicker'
                    defaultValue={new Date()}
                    render={(props) => (
                      <DatePicker
                        className='input'
                        placeholderText='Select date'
                        onChange={(e) => props.onChange(e)}
                        selected={props.value}
                      />
                    )}
                  />
                  {errors.date && (
                    <div className='mt-2 text-xs text-red-600'>
                      {errors.date.message}
                    </div>
                  )}
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium leading-5 text-gray-700'
                  >
                    Workout Title:
                  </label>
                  <div className='mt-1 rounded-md shadow-sm'>
                    <input
                      id='title'
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                      type='text'
                      name='title'
                      ref={register({
                        required: 'Please enter a workout title',
                        min: 1,
                      })}
                    />
                    {errors.title && (
                      <div className='mt-2 text-xs text-red-600'>
                        {errors.title.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='details'
                    className='block text-sm font-medium leading-5 text-gray-700'
                  >
                    Workout Details:
                  </label>
                  <div className='mt-1 rounded-md shadow-sm'>
                    <textarea
                      rows='3'
                      placeholder='Enter your full workout...'
                      id='details'
                      className='form-textarea mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                      type='text'
                      name='details'
                      ref={register({
                        required: 'Please enter details for the workout',
                        minLength: {
                          value: 6,
                          message: 'Should have at least 6 characters',
                        },
                      })}
                    ></textarea>
                    {errors.details && (
                      <div className='mt-2 text-xs text-red-600'>
                        {errors.details.message}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
              <button
                className='bg-indigo-600 hover:bg-indigo-500 text-white focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                type='submit'
                style={{ transition: 'all .15s ease' }}
                onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
