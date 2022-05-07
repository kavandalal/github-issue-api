import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Issue from './Issue';

function CustRoute() {
	return (
		<div className='p-12 '>
			<Router>
				<Routes>
					<Route path='' element={<Home />} />
					<Route path=':id' element={<Issue />} />
				</Routes>
			</Router>
		</div>
	);
}

export default CustRoute;
