import psTree from "ps-tree";

export default function findGrandchildPid(parentPid: number) {
    return new Promise<number>((resolve, reject) => {
        psTree(parentPid, (err, children) => {
            if (err) {
                reject(err);
            } else {
                const child = children.find(child => parseInt(child.PPID) === parentPid);
                const childPid = child?.PID;
                if (!childPid) {
                    resolve(-1);
                } else {
                    psTree(parseInt(childPid), (err, children) => {
                        const grandchild = children.find((child, i) => parseInt(child.PPID) === parseInt(childPid));
                        resolve(grandchild ? parseInt(grandchild.PID) : -1);
                    })
                }
            }
        });
    });
}