const BASE_JSON_BIN_URL="https://api.jsonbin.io/v3/b";
const BIN_ID = "65c9c404dc74654018a39932";
const MASTER_KEY = "$2a$10$nWK7mAtCnuGojr92Ow6jxuONSVYYSOlLhDQM3KZmrHxqkhldk/HUq";

async function loadTasks(){

        console.log('load task hit');
        const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID);
        console.log("response.data here", response.data);
        console.log("response.data.record", response.data.record);
        return response.data.record;
}


async function saveTasks(dataArray){

    console.log('save task hit');

    const response = await axios.put(BASE_JSON_BIN_URL + "/" + BIN_ID, dataArray, {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }
    );
    console.log(response.data);
    return response.data;
}
