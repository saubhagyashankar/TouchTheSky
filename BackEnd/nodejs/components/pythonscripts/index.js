const { spawn } = require("child_process");
const express = require('express')
const pythonScriptController = express()

const SimplePythonScript = __dirname + '/simplePythonScript.py'


pythonScriptController.get('/runsimplepythonscript', (req, res) => {
    const inputArg = req.query.inputArg;

    // Replace 'python3' with 'python' if you are on Windows or if you are using Python 2.x
    const pythonProcess = spawn("python", [SimplePythonScript, inputArg]);
    let output = null;

    pythonProcess.stdout.on("data", (data) => {
        console.log(`Python output: ${data}`);
        output = data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python error: ${data}`);
        output = data.toString();
    });

    pythonProcess.on("close", (code) => {
        console.log(`Python script exited with code ${code}`);
        res.send({ message: output, success: code })
    });
})


module.exports = pythonScriptController