import { scenarios } from "./scenario.js";

const storage_key = "clockpocalypse_progress";


function saveProgress(data){
    try{
        localStorage.setItem(storage_key, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save progress" , e);
    }
}

function loadProgress(){
    try{
        const raw = localStorage.getItem(storage_key);
        return raw ? JSON.parse(raw) : { scenarios: [], countries: [], scenarioTiers: {} };
    } catch (e){
        console.error("Failed to load save" , e);
        return { scenarios: [], countries: [], scenarioTiers: {}};
    }
}

export  function markCompleted(scenarioKey, country, tier){
    if(!scenarioKey || !country) return;

    const data = loadProgress();
    if(!data.scenarios) data.scenarios = [];
    if(!data.countries) data.countries = [];
    if(!data.scenarioTiers) data.scenarioTiers = {};

    if (!data.scenarios.includes(scenarioKey)){
        data.scenarios.push(scenarioKey);
    }
    if(!data.countries.includes(country)){
        data.countries.push(country);
    }
    if(tier){
        if(!data.scenarioTiers[scenarioKey]) data.scenarioTiers[scenarioKey] = [];
        if(!data.scenarioTiers[scenarioKey].includes(tier)){
            data.scenarioTiers[scenarioKey].push(tier);
        }
    }

    saveProgress(data);
}

export function isScenarioCompleted(scenarioKey){
    const data = loadProgress();
    return !!(data.scenarios && data.scenarios.includes(scenarioKey));
}
export function isCountryCompleted(country){
    const data = loadProgress();
    return !!(data.countries && data.countries.includes(country));
}
export function isScenarioTierCompleted(scenarioKey, tier){
    const data = loadProgress();
    return !!(data.scenarioTiers && data.scenarioTiers[scenarioKey] && data.scenarioTiers[scenarioKey].includes(tier));
}