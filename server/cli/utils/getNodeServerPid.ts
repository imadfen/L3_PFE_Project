import findGrandchildPid from "./findGrandchildPid";

export default async function getNodeServerPid(parentPid: number) {
    const grandChildPid = await findGrandchildPid(parentPid);
    return grandChildPid === -1 ? grandChildPid : await findGrandchildPid(grandChildPid);
}