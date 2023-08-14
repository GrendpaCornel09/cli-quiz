#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// variables
let userName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const sleeplong = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
const sleepverylong = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const title = chalkAnimation.neon(`PLEASE ENTER YOUR DATA BELOW.\n`);
    await sleeplong();
    title.stop();

    console.log(`
        ${chalk.bgBlue(`INTERSTELLAR ARMED FORCES DATA INPUT FORM`)}
        The data you will enter in this form is highly ${chalk.red(`sensitive`)}.
        Please enter it ${chalk.blue(`factually`)}.
        If you don't provide your data, ${chalk.bgRed(`the process will exit`)},
        and you won't be accepted in the Interstellar Armed Forces.
    `);
}

async function askName(){
    const answer = await inquirer.prompt({
        name: `username`,
        type: `input`,
        message: `Please enter your ${chalk.blueBright(`real name`)}.`,
        default(){
            return `user`
        }
    });

    userName = answer.username;
    return handleNameAnswer(userName != `user`);
}

async function handleNameAnswer(isCorrect){
    const spinner = createSpinner(`Validating response...`).start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Moving on, ${userName}.\n`});
        await sleep();
    }
    
    else{
        spinner.error({text: `Validation error: You did not provide a name.\n`});
        process.exit(1);
    }
}

async function question1(){
    const answer = await inquirer.prompt({
        name: `question_1`,
        type: `list`,
        message: `Can you do programming?\n`,
        choices: [
            `Yes`,
            `No`
        ],
    });

    return handleQuestion1Answer(answer.question_1 == `Yes`);
}

async function handleQuestion1Answer(isCorrect){
    const spinner = createSpinner(`Validating response...`).start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice, ${userName}.\n`});
        await sleep();
    }
    
    else{
        spinner.error({text: `Validation error: You must have a programming ability, ${userName}.\n`});
        process.exit(1);
    }
}

async function question2(){
    const answer = await inquirer.prompt({
        name: `question_2`,
        type: `input`,
        message: `What things can you do, related to helping each other among your team members in the IAF(if you're accepted)?\n`,
        default(){
            return `nothing`;
        }
    });

    return handleQuestion2Answer(answer.question_2 != `nothing`);
}

async function handleQuestion2Answer(isCorrect){
    const spinner = createSpinner(`Validating response...`).start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `OK, ${userName}.\n`});
        await sleep();
    }
    
    else{
        spinner.error({text: `Validation error: You must have something, ${userName}, at least 1 thing.\n`});
        process.exit(1);
    }
}

async function question3(){
    const answer = await inquirer.prompt({
        name: `question_3`,
        type: `checkbox`,
        message: `Do you have a combat experience?\n`,
        choices: [
            `I know how to hold a gun.`,
            `I know how to hide from enemy fire.`,
            `I have a real combat experience.`,
            `I don't have one.`
        ]
    });

    return handleQuestion3Answer(answer.question_3 != `I don't have one.`);
}

async function handleQuestion3Answer(isCorrect){
    const spinner = createSpinner(`Validating response...`).start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Cool, ${userName}.\n`});
        await sleep();
    }
    
    else{
        spinner.error({text: `Validation error: You must have at least a little bit of experience.\n`});
        process.exit(1);
    }
}

async function question4(){
    const answer = await inquirer.prompt({
        name: `question_4`,
        type: `number`,
        message: `How heavy are you?`,
        default(){
            return 0;
        }
    });

    return handleQuestion4Answer(answer.question_4 <= 120 && answer.question_4 >= 50);
}

async function handleQuestion4Answer(isCorrect){
    const spinner = createSpinner(`Validating response...`).start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Great, ${userName}.\n`});
        await sleep();
    }
    
    else{
        spinner.error({text: `Validation error: Your weight is inappropriate.\n`});
        process.exit(1);
    }
}

async function question5(){
    const answer = await inquirer.prompt({
        name: `question_5`,
        type: `input`,
        message: `What place do you came from?`,
        default(){
            return `nothing`;
        }
    });

    return handleQuestion5Answer(answer.question_5 != `nothing`);
}

async function handleQuestion5Answer(isCorrect){
    const spinner = createSpinner(`Validating response...`).start();
    await sleep();

    if(isCorrect){
        spinner.success({text: `Validation success!`});
        const spinner2 = createSpinner(`Sending responses to headquarters...\n`).start();
        await sleepverylong();
        spinner2.success({text: `Done.\n`});
        await sleep();
    }
    
    else{
        spinner.error({text: `Validation error: You did not provide a place.\n`});
        process.exit(1);
    }
}

function responseSent(){
    // console.clear();
    const message = `Response  sent.`;

    figlet(message, (err, data) => {
        console.log(gradient.mind.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await responseSent();