import React, { useEffect, useState } from 'react';

export default function Hacker() {
    const [load, setLoad] = useState(false);
    const [news, setNews] = useState([]);
    const [nitem, setNitem] = useState('react');
    const [currentpage, setcurrentpage] = useState(1);
    const [postperpage] = useState(10);

    const search = async () => {
        try {
            setLoad(true);
            const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${nitem}&page=${currentpage}`);
            const data = await response.json();
            console.log('Data:', data);
            
            setNews(data.hits);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        search();
    }, []);

    // 20 / 10 = 2
    const next = () => {
        if (currentpage >= Math.ceil(news.length / postperpage)) {  // Math.floor(  ) // 5.4654632 // 5  || Math.ceil()  // 3.156799 // 4  || Math.round()  // 3.5 // 4
            setcurrentpage(1);
        } else {
            setcurrentpage(currentpage + 1);
        }
    };

    const prev = () => {
        if (currentpage <= 1) {
            setcurrentpage(Math.ceil(news.length / postperpage));
        } else {
            setcurrentpage(currentpage - 1);
        }
    };

    
  let lastIndex = currentpage * postperpage;
  let firstIndex = lastIndex - postperpage;
  let currentPosts = news.slice(firstIndex, lastIndex);
  console.log(currentPosts);

   const delet = (index)=>{
    let update = [...news];
    update.splice(firstIndex+index, 1)
    setNews(update)
   }

    return (
        <>
            <div className='w-full  bg-gray-100 p-5'>
                <h1 className='text-center text-4xl font-semibold mt-10'>Hacker News</h1>

                <div className='max-w-4xl mx-auto mt-4 flex justify-center items-center'>
                    <input
                        onChange={(e) => setNitem(e.target.value)}
                        type='text'
                        placeholder='Search here...'
                        className='w-64 h-12 border border-gray-300 outline-none px-4 rounded-md shadow-sm'
                    />
                    <button
                        onClick={search}
                        className='ml-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600'
                    >
                        Search
                    </button>
                </div>

                <div className='w-[80%] mx-auto mt-10 flex flex-wrap gap-4 justify-center'>
                    {load ? (
                        <div className='text-center w-full'>
                            <h1 className='text-2xl font-semibold'>Loading...</h1>
                        </div>
                    ) : (
                        currentPosts.map((item, index) => (
                                <div key={index} className='w-[45%] p-4 border border-gray-300 rounded-md shadow-md'>
                                    <h2 className='text-xl font-semibold mb-2'>{item.title}</h2>
                                    <a href={item.url} className='text-blue-500 hover:underline block mb-4'>
                                        {item.url}
                                    </a>
                                    <button
                                        onClick={() => delet(index)}
                                        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                    )}
                </div>

                <div className='max-w-4xl mx-auto mt-8 flex justify-center items-center'>
                    <button
                        onClick={prev}
                        className='bg-orange-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-orange-600'
                    >
                        Previous
                    </button>
                    <span className='text-xl'>{currentpage}</span>
                    <button
                        onClick={next}
                        className='bg-orange-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-orange-600'
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
