const mongoose = require('mongoose');


const M_recycled_data = mongoose.Schema({
    partName: {
        type: 'string',
    },	
    materialComposition: {
        type: 'string',
    },	
    age: {
        type: 'string',
    },	
    condition: {
        type: 'string'
    },
    location : {
        type: 'string',
    }	,
    manufacturer: {
        type: 'string',
    }	,	
    aircraft : {
        type: 'string',
    }	,
    model: {
        type: 'string',
    }	,
    potentialUseCases	: {
        type: 'string',
    }	,
    newPartsCarbonFootprint: {
        type: 'string',
    }	,
    recycledPartsCarbonFootprint	: {
        type: 'string',
    }	,
    waterUsageNewParts: {
        type: 'string',
    }	,
    waterUsageRecycledParts	: {
        type: 'string',
    }	,
    landfillWasteNewParts	: {
        type: 'string',
    }	,
    landfillWasteRecycledParts	: {
        type: 'string',
    }	,
    energyConsumptionNewParts	: {
        type: 'string',
    }	,
    energyConsumptionRecycledParts: {
        type: 'string',
    }	,
    recyclingRate	: {
        type: 'string',
    }	,
    toxicityScoreNewParts	: {
        type: 'string',
    }	,
    toxicityScoreRecycledParts	: {
        type: 'string',
    }	,
    remanufacturingPotential: {
        type: 'string',
    }	,
    lifeCycleAssessment	: {
        type: 'string',
    }	,
    renewableMaterialContent	: {
        type: 'string',
    }	,
    carbonFootprintSaved	: {
        type: 'string',
    }	,
    waterUsageSaved 	: {
        type: 'string',
    }	,
    landfillWasteSaved : {
        type: 'string',
    }	,
    energyConsumptionSaved 	: {
        type: 'string',
    }	,
    toxicityScoreDifference	: {
        type: 'string',
    },	
    remanufacturingPotential	: {
        type: 'string',
    }	,
    lifeCycleAssessmentScore	: {
        type: 'string',
    }	


})


module.exports = mongoose.model("M_recycled_data", M_recycled_data)