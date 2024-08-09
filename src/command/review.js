import SimpleGit from 'simple-git'
export function resolveCurrentBranch(cwd = process.cwd()) {
    const git = SimpleGit(cwd);
    return new Promise((resolve, reject) => {
        git.branchLocal(function (err, summary) {
            if (err) {
                reject(`获取分支名称失败, e: ${err}`);
            } else {
                resolve(summary.current);
            }
        })
    })
}