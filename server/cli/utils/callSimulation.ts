export default async function callSimulation(id?: number) {
    let response;
    if (id && id !== 0) {
        response = await fetch(`http://localhost:5000/api/runsimulation?id=${id}`);
    } else {
        response = await fetch("http://localhost:5000/api/runsimulation");
    }

    if (response.ok) {
        console.log("Simulation ran successfully.");
        return true;
    } else {
        console.log("Faild to run the simulation.");
        return false;
    }
}