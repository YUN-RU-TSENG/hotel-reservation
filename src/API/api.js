import axios from 'axios'

export default axios.create({
    baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6/',
    timeout: 3000,
    headers: {
        Authorization: 'Bearer p2FP3rIsABET2oxPlvYOBSCkT4qb6XxJU3Rt19hjxfFyyDjoW1UFnQouCoBe',
        Accept: 'application/json',
    },
})
