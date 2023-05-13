// import { Configuration, OpenAIApi } from "openai";
const express = require('express');
const aiController = express()
const oai = require('openai')
require('dotenv').config();


const configuration = new oai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new oai.OpenAIApi(configuration);

// const chatbot = new openai.ChatCompletion(process.env.OPENAI_API_KEY);

// aiController.post('/generatePetNames', async (req, res) => {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message: "OpenAI API key not configured, please follow instructions in README.md",
//       }
//     });
//     return;
//   }

//   const animal = req.body.animal || '';
//   if (animal.trim().length === 0) {
//     res.status(400).json({
//       error: {
//         message: "Please enter a valid animal",
//       }
//     });
//     return;
//   }

//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: generatePrompt(animal),
//       temperature: 0.6,
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error) {
//     // Consider adjusting the error handling logic for your use case
//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       res.status(500).json({
//         error: {
//           message: 'An error occurred during your request.',
//         }
//       });
//     }
//   }
// })




// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a supervillan.

// Animal: Cat
// Names: Killer Sharpclaw, Agent Fluffkill, The Evil Feline
// Animal: Dog
// Names: Ruff the Destroyer, Killer Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }



aiController.post('/getRecommendationForPart', async (req, res) => {
  console.log('here',req.body);
  let part = req.body;

  // console.log(generatePromptForRecommendation(part))
  // promt = req.body.promt;
  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message: "OpenAI API key not configured, please follow instructions in README.md",
  //     }
  //   });
  //   return;
  // }

  

  try {
    messages =[{"role": "user", "content" : generatePromptForRecommendation(part)}]
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.4,
    });
    console.log('ai res', completion);
    res.status(200).json({
       result: completion.data.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
  // res.send({message: "success"});
})






const generatePromptForRecommendation = (part) => {
  
  return "Determine if this part is suitable for recycling, remanufacturing or repurposing.\nPart Name:"+ part.partName +
  "\nMaterial Composition: "+part.materialComposition+"\nAge (years):" +part.age+"\nCondition:" + part.condition +
  "\nLocation: "+part.location+"\nManufacturer: "+part.manufacturer+"\nAircraft Model: "+part.aircraftModel+ +
  "\nPotential Use Cases: "+part.potentialUseCases+"\nNew Parts Carbon Footprint (kg CO2e):" +part.newPartsCarbonFootprint+
  "\nRecycled Parts Carbon Footprint (kg CO2e): "+part.recycledPartsCarbonFootprint+"\nWater Usage - New Parts (liters): "+part.waterUsageNewParts+
  "\nWater Usage - Recycled Parts (liters): "+part.waterUsageRecycledParts+"\nLandfill Waste - New Parts (kg): "+part.landfillWasteNewParts+
  "\nLandfill Waste - Recycled Parts (kg): "+part.landfillWasteRecycledParts+"\nEnergy Consumption - New Parts (kWh): "+part.energyConsumptionNewParts+
  "\nEnergy Consumption - Recycled Parts (kWh): "+part.energyConsumptionRecycledParts+"\nRecycling Rate (%): "+part.recyclingRate+
  "\nToxicity Score - New Parts: "+part.toxicityScoreNewParts+"\nToxicity Score - Recycled Parts: "+part.toxicityScoreRecycledParts+
  "\nRemanufacturing Potential: "+part.remanufacturingPotential+"\nLife Cycle Assessment: "+part.lifeCycleAssessment+
  "\nRenewable Material Content (%): "+part.renewableMaterialContent+"\nCarbon Footprint Saved (kg CO2e): "+part.carbonFootprintSaved+
  "\nWater Usage Saved (liters): "+part.waterUsageSaved+"\nLandfill Waste Saved (kg): "+part.landfillWasteSaved+
  "\nEnergy Consumption Saved (kWh): "+part.energyConsumptionSaved+"\nToxicity Score Difference: "+part.toxicityScoreDifference+
  "\nRemanufacturing Potential (%): "+part.remanufacturingPotentialPercent+"\nLife Cycle Assessment Score: "+part.lifeCycleAssessmentScore + " , give you best guess and give your reasons for the selection.";
}


aiController.post('/getRecommendationForBuyingPart', async(req, res) => {
  console.log('here',req.body);
  let part = req.body;

  // console.log(generatePromptForRecommendation(part))
  // promt = req.body.promt;
  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message: "OpenAI API key not configured, please follow instructions in README.md",
  //     }
  //   });
  //   return;
  // }

  

  try {
    messages =[{"role":"user", "content" : "you are now an aircraft Manufacturer/Airline, say OK if you accept your new role"},{"role": "assistant", "content": "OK"},{"role": "user", "content" : generatePromptForBuyRecommendation(part)}]
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.4,
    });
    console.log('ai res', completion);
    res.status(200).json({
       result: completion.data.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
  
})


const generatePromptForBuyRecommendation = (part) => {
  
  return "As an Aircraft Manufacturer/Airline, would you consider buying this part. Part details - \nPart Name:"+ part.partName +
  "\nMaterial Composition: "+part.materialComposition+"\nAge (years):" +part.age+"\nCondition:" + part.condition +
  "\nLocation: "+part.location+"\nManufacturer: "+part.manufacturer+"\nAircraft Model: "+part.aircraftModel+ +
  "\nPotential Use Cases: "+part.potentialUseCases+"\nNew Parts Carbon Footprint (kg CO2e):" +part.newPartsCarbonFootprint+
  "\nRecycled Parts Carbon Footprint (kg CO2e): "+part.recycledPartsCarbonFootprint+"\nWater Usage - New Parts (liters): "+part.waterUsageNewParts+
  "\nWater Usage - Recycled Parts (liters): "+part.waterUsageRecycledParts+"\nLandfill Waste - New Parts (kg): "+part.landfillWasteNewParts+
  "\nLandfill Waste - Recycled Parts (kg): "+part.landfillWasteRecycledParts+"\nEnergy Consumption - New Parts (kWh): "+part.energyConsumptionNewParts+
  "\nEnergy Consumption - Recycled Parts (kWh): "+part.energyConsumptionRecycledParts+"\nRecycling Rate (%): "+part.recyclingRate+
  "\nToxicity Score - New Parts: "+part.toxicityScoreNewParts+"\nToxicity Score - Recycled Parts: "+part.toxicityScoreRecycledParts+
  "\nRemanufacturing Potential: "+part.remanufacturingPotential+"\nLife Cycle Assessment: "+part.lifeCycleAssessment+
  "\nRenewable Material Content (%): "+part.renewableMaterialContent+"\nCarbon Footprint Saved (kg CO2e): "+part.carbonFootprintSaved+
  "\nWater Usage Saved (liters): "+part.waterUsageSaved+"\nLandfill Waste Saved (kg): "+part.landfillWasteSaved+
  "\nEnergy Consumption Saved (kWh): "+part.energyConsumptionSaved+"\nToxicity Score Difference: "+part.toxicityScoreDifference+
  "\nRemanufacturing Potential (%): "+part.remanufacturingPotentialPercent+"\nLife Cycle Assessment Score: "+part.lifeCycleAssessmentScore + " , give you best guess and give your reasons for the choice.";
}


aiController.post('/getRecommendationForRecyclingPart', async(req, res) => {
  console.log('here',req.body);
  let part = req.body;

  // console.log(generatePromptForRecommendation(part))
  // promt = req.body.promt;
  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message: "OpenAI API key not configured, please follow instructions in README.md",
  //     }
  //   });
  //   return;
  // }

  

  try {
    messages =[{"role":"user", "content" : "you are now an aircraft Recycling Facility, say OK if you accept your new role"},{"role": "assistant", "content": "OK"},{"role": "user", "content" : generatePromptForRecycleRecommendation(part)}]
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.4,
    });
    console.log('ai res', completion);
    res.status(200).json({
       result: completion.data.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
  
})



const generatePromptForRecycleRecommendation = (part) => {
  
  return "As an Aircraft Recycling facility, would you consider recycling this part. Part details - \nPart Name:"+ part.partName +
  "\nMaterial Composition: "+part.materialComposition+"\nAge (years):" +part.age+"\nCondition:" + part.condition +
  "\nLocation: "+part.location+"\nManufacturer: "+part.manufacturer+"\nAircraft Model: "+part.aircraftModel+ +
  "\nPotential Use Cases: "+part.potentialUseCases+"\nNew Parts Carbon Footprint (kg CO2e):" +part.newPartsCarbonFootprint+
  "\nRecycled Parts Carbon Footprint (kg CO2e): "+part.recycledPartsCarbonFootprint+"\nWater Usage - New Parts (liters): "+part.waterUsageNewParts+
  "\nWater Usage - Recycled Parts (liters): "+part.waterUsageRecycledParts+"\nLandfill Waste - New Parts (kg): "+part.landfillWasteNewParts+
  "\nLandfill Waste - Recycled Parts (kg): "+part.landfillWasteRecycledParts+"\nEnergy Consumption - New Parts (kWh): "+part.energyConsumptionNewParts+
  "\nEnergy Consumption - Recycled Parts (kWh): "+part.energyConsumptionRecycledParts+"\nRecycling Rate (%): "+part.recyclingRate+
  "\nToxicity Score - New Parts: "+part.toxicityScoreNewParts+"\nToxicity Score - Recycled Parts: "+part.toxicityScoreRecycledParts+
  "\nRemanufacturing Potential: "+part.remanufacturingPotential+"\nLife Cycle Assessment: "+part.lifeCycleAssessment+
  "\nRenewable Material Content (%): "+part.renewableMaterialContent+"\nCarbon Footprint Saved (kg CO2e): "+part.carbonFootprintSaved+
  "\nWater Usage Saved (liters): "+part.waterUsageSaved+"\nLandfill Waste Saved (kg): "+part.landfillWasteSaved+
  "\nEnergy Consumption Saved (kWh): "+part.energyConsumptionSaved+"\nToxicity Score Difference: "+part.toxicityScoreDifference+
  "\nRemanufacturing Potential (%): "+part.remanufacturingPotentialPercent+"\nLife Cycle Assessment Score: "+part.lifeCycleAssessmentScore + " , give you best guess and give your reasons for the choice.";
}


module.exports = aiController