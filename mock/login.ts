import Mock from 'mockjs';

export default [
    {
        url: '/mock/api/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: {
                    token: Mock.Random.string('lower', 200),
                    // user message
                    userInfo: {
                        id: Mock.Random.id(),
                        name: Mock.Random.cname(),
                        email: Mock.Random.email(),
                        gender: Mock.Random.natural(1, 2),
                        age: Mock.Random.natural(18, 30),
                    },
                },
            };
        },
    },
];
