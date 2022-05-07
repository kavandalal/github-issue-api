import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

function Home() {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [inputData, setInputData] = useState({
		page: 1,
		// change: {
		// 	username: '',
		// 	repo: '',
		// },
		// response: {
		// 	username: '',
		// 	repo: '',
		// },
	});

	useEffect(() => {
		// getData();
	}, []);

	const getData = async (pageNum = null) => {
		// console.log(pageNum ? `/api?page=${Number(pageNum)}` : `/api`);
		const res1 = await axios
			.get(pageNum ? `/api?page=${Number(pageNum)}` : `/api`)
			.then((res) => res)
			.catch((err) => err.message);
		console.log('res ++ ', res1);
		setData(res1.data.filter((x) => !x.title.includes('Bump')));
	};

	const handleNavigate = (index) => {
		navigate(`/${data[index].number}`, { state: { data: data[index] } });
	};
	const handleChange = (pageNum) => {
		getData(pageNum);
		setInputData((prev) => ({
			...prev,
			page: pageNum,
		}));
	};
	return (
		<center>
			<div className='text-2xl '>
				<div className='flex flex-col max-w-screen-lg'>
					<div className='header flex justify-between text-4xl text-left mb-16'>
						<span>Github Issues Page</span>
						<span>- Kavan Dalal</span>
					</div>
					<div className='box'>
						<div className='box-header h-24 flex items-center justify-left px-8'>
							<span>
								? username =<span className='text-green-400'> Khan </span>& repo =
								<span className='text-green-400'> react-multi-select </span>
							</span>
						</div>
						{data &&
							Object.keys(data).length > 0 &&
							data.map((x, index) => (
								<div
									className='h-24 flex justify-left items-center border-bottom single-data cursor-pointer'
									key={index}
									onClick={() => handleNavigate(index)}>
									<div className='px-4'>
										<img className='round-img' src={x?.user?.avatar_url} alt='' height={'50'} width={'50'} />
									</div>
									<div>
										{/* <div>{x?.user?.login}</div> */}
										<div>{x?.title}</div>
									</div>
								</div>
							))}
					</div>
					<div className='box-footer flex mt-4 justify-center'>
						<Pagination className='flex'>
							<Pagination.Prev />
							<Pagination.Item onClick={() => handleChange('1')} active={inputData?.page == 1}>
								{1}
							</Pagination.Item>
							<Pagination.Item onClick={() => handleChange('2')} active={inputData?.page == 2}>
								{2}
							</Pagination.Item>
							<Pagination.Next />
						</Pagination>
					</div>
				</div>
			</div>
		</center>
	);
}

export default Home;
