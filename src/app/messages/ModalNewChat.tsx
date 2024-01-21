import React, { FormEvent } from 'react'

export default function ModalNewChat({onClose}: {onClose: () => void}) {
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
    }
  return (
    <div className='fixed flex h-screen w-full justify-center items-center bg-black bg-opacity-70'>
        <button className='absolute top-5 right-5 text-6xl text-neutral-200'
            onClick={onClose}
        >&times;</button>

        <form className='' onSubmit={onSubmit}>
            <h1 className='text-2xl text-neutral-200'>New chat</h1>
            <input type="text" className='border border-gray-300 rounded-md p-2 w-full mt-2' placeholder='Username'/>
            <button className='bg-blue-500 text-white p-2 rounded-md mt-2 w-full'>Create</button>
        </form>
    </div>
  )
}
