import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoMdClose } from 'react-icons/io'

const Dropzone = ({ className, files, setFiles }) => {
    const [rejected, setRejected] = useState([])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        let newFiles = [...files, ...acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        )];

        if (newFiles.length > 2) {
            // Remove the oldest file
            newFiles.shift();
        }

        setFiles(newFiles);

        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [files])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: 2,
        onDrop
    })

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const removeAll = () => {
        setFiles([])
        setRejected([])
    }

    const removeRejected = name => {
        setRejected(files => files.filter(({ file }) => file.name !== name))
    }

    return (
        //@ts-ignore
        <form className='w-full'>
            <div
                {...getRootProps({
                    className: className
                })}
            >
                <input {...getInputProps({ name: 'files' })} />
                <div className='flex flex-col items-center justify-center gap-4 px-2'>
                    {/* <ArrowUpTrayIcon className='h-5 w-5 fill-current' /> */}
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p className='text-center'>Drag & drop files here, or click to select files</p>
                    )}
                </div>
            </div>

            {/* Preview */}
            <section className='mt-5 bg-white p-2 pb-6 rounded-lg shadow-sm'>
                <h2 className='title text-lg font-semibold whitespace-nowrap w-full text-center'>Xem trước</h2>

                {/* Accepted files */}
                <div className='flex gap-4 justify-between place-items-center mt-2 px-2'>
                    <h2 className='title text-md font-semibold whitespace-nowrap'>Ảnh hợp lệ</h2>
                    <Button
                        type='button'
                        onClick={removeAll}
                        className='mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-red-500 transition-colors hover:bg-rose-400 hover:text-white'
                    >
                        Xoá tất cả
                    </Button>
                </div>

                <ul className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-h-[130px]'>
                    {files.map(file => (
                        <li key={file.name} className='relative h-32 rounded-md px-2 border border-gray-300'>
                            <Image
                                src={file.preview}
                                alt={file.name}
                                width={100}
                                height={100}
                                onLoad={() => {
                                    URL.revokeObjectURL(file.preview)
                                }}
                                className='h-full w-full rounded-md object-contain'
                            />
                            <div className='mt-1 text-[12px] font-medium text-stone-500 text-center whitespace-nowrap truncate'>
                                {file.name}
                            </div>
                            <button
                                type='button'
                                className='absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-300 text-gray-500 hover:text-white'
                                onClick={() => removeFile(file.name)}
                            >
                                <IoMdClose className='h-5 w-5' />
                            </button>

                        </li>
                    ))}
                </ul>
            </section>
            <div className='w-full h-4'></div>
        </form>
    )
}

export default Dropzone
