const express = require('express');
const router = express.Router();
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const { Octokit } = require('octokit');
const octokit = new Octokit({
	auth: process.env.GITHUB_SECRET,
});

router.get('/api', async (req, res) => {
	// console.log(req);
	const { author, repo, page } = req.query;
	// const y = await octokit.request(`GET /repos/${author}/${repo}/issues`, {
	// 	owner: author,
	// 	repo: repo,
	// });
	// console.log(page);
	const y = await octokit.request('GET /repos/KHAN/react-multi-select/issues', {
		owner: 'KHAN',
		repo: 'react-multi-select',
		per_page: 20,
		page: page || 1,
	});
	// console.log(y);
	res.send(y.data);
});

router.get('/api/:id', async (req, res) => {
	const { id } = req.params;
	const { author, repo } = req.query;
	// const y = await octokit.request(`GET /repos/${author}/${repo}/issues`, {
	// 	owner: author,
	// 	repo: repo,
	// });
	// const id = '91';
	const singleData = await octokit.request(`GET /repos/KHAN/react-multi-select/issues/${id}`, {
		// owner: 'KHAN',
		// repo: 'react-multi-select',
		issue_number: id,
	});
	const commentsArr = await octokit.request(`GET /repos/KHAN/react-multi-select/issues/${id}/comments`, {
		// owner: 'KHAN',
		// repo: 'react-multi-select',
		// issue_number: id,
	});
	console.log(singleData, commentsArr);
	res.send({ mainData: singleData.data, comments: commentsArr.data });
});

module.exports = router;
