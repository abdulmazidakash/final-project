import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
	baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
	axiosSecure.interceptors.request.use(function (config){
		const token = localStorage.getItem('access-token')
		console.log('request stopped by interceptors', token);
		config.headers.authorization = `Bearer ${token}`
		return config;
	}, function (error){
		//do something with request error
		return Promise.reject(error);
	});

	//interceptors 401 and 403 status
	axiosSecure.interceptors.response.use(function(response){
		return response;
	}, (error) =>{
		const status = error.response.status;
		console.log('status error in the interceptors', status);
		return Promise.reject(error);
	})
	return axiosSecure;
};

export default useAxiosSecure;