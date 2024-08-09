import { resolveCurrentBranch } from './command/review.js'


resolveCurrentBranch().then(res => {
    console.log('res=>', res);
}).catch(err => {
    console.log('err=>', err);
})

