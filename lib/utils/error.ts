import * as _ from 'lodash';

const getErrorMessage = (error: Error) => {
    return _.get(error, ['response', 'data', 'msg'], 'Something went wrong!');
};

export default { getErrorMessage };
