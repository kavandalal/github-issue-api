import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function Issue(props) {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { id } = useParams();
	const [data, setData] = useState({});

	useEffect(() => {
		// getAllData();
	}, []);

	const getAllData = async () => {
		const data = await axios
			.get(`/api/${state?.data?.number}`)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => console.log(err));
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<center>
			<div className='max-w-screen-md'>
				<div onClick={handleBack} className='text-red-600 text-3xl flex justify-left mb-8'>
					back
				</div>
				{data && Object.keys(data).length > 0 && (
					<>
						<div className='relative flex'>
							<div className='w-[30px] grow'>
								<img src={data?.mainData?.user?.avatar_url} height='50' width='50' className='' alt='' />
							</div>
							<div className='w-10/12 box mb-8'>
								<div className='comment-header'>
									<span className='text-blue-400 mr-2'> author</span>
									{data?.mainData?.user?.login}
								</div>
								<div className='comment-content'>{data?.mainData?.body}</div>
							</div>
						</div>

						<>
							{data?.comments?.length > 0 &&
								data?.comments?.map((i, index) => {
									return (
										<div className='relative flex'>
											<div className='w-[30px] grow'>
												<img src={i?.user?.avatar_url} height='50' width='50' className='round-img ' alt='' />
											</div>
											<div key={index} className='w-10/12 box mb-8'>
												<div className='comment-header'>{i?.user?.login}</div>
												<div className='comment-content'>{i?.body}</div>
											</div>
										</div>
									);
								})}
						</>
					</>
				)}
			</div>
		</center>
	);
}

export default Issue;
