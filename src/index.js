import { execa } from 'execa';
import { program } from 'commander';
import { resolveCurrentBranch } from './command/review.js'



resolveCurrentBranch().then(res => {
    console.log('res=>', res);
}).catch(err => {
    console.log('err=>', err);
})


const gitPush = async (branchName, cwd) => {
    console.log('git push ...', 'CR');

    const res = await execa(
        'git',
        ['push', 'origin', `head:refs/for/${branchName}`],
        { cwd: cwd }
    );

    const content = res.stderr;

    console.log(content);

    if (res.exitCode !== 0) {
        process.exit(1)
    }

    console.log(`${branchName} 分支已推送至远端`);

    return content;
}

const createCodeReview = async () => {
    const cwd = process.cwd();
    const branchName = await resolveCurrentBranch(cwd);
    const content = await gitPush(branchName, cwd);
}

// program.command();
// console.log(program.parse(process.argv))

program
    .command('gpush')
    .description('发送 CR 请求')
    .action(async () => {
        createCodeReview()
    });

program.command

program.parse(process.argv)