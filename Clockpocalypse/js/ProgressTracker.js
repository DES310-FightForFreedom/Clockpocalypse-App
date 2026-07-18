
const storage_key = "clockpocalypse_progress";

function loadProgress(){
    try{
        const raw = localStorage.getItem(storage_key);
        return raw ? JSON.parse(raw) : {};
    } catch (e){
        console.error("Failed to load save" , e);
        return{};
    }
}

function saveProgress(data){
    try{
        localStorage.setItem(storage_key, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save progress" , e);
    }
}

export  function markCompleted(scenarioKey, country){
    if(!scenarioKey || !country) return;

    const data = loadProgress();
    if(!data[scenarioKey]) data[scenarioKey] = [];
    if (!data[scenarioKey].includes(country)){
        data[scenarioKey].push(country);
    }
    saveProgress(data);
}

export function isCompleted(scenarioKey, country){
    const data = loadProgress();
    return !!(data[scenarioKey] && data[scenarioKey].includes(country));
}