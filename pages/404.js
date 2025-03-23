import Link from 'next/link'

export default function Custom404() {
    return (
        <div className='min-h-[90vh] mt-8 flex items-center justify-center'>
            <main className="text-center">
                <h2 className='text-5xl font-bold text-white mb-4'>
                    There was a problem.
                </h2>
                <p className='text-white mb-4 opacity-70'>We could not find the page you were looking for.</p>
                <p className='text-white'>Go back to the <Link href="/" className='underline text-pink-600 font-bold'>Home</Link> page</p>
            </main>
        </div>
    )
}