
import { Payload } from '@lib/models';


export const getIdeas = (payload: Payload) => {
    const { data } = payload;
    console.log('data', data)

    return [{
        id: 1,
        body: 'hey there big bodey',
        title: 'title',
        createdAt: 123
    }];
};
