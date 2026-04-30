import puppeteer from "puppeteer";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Client } from "@gradio/client";

dotenv.config({ quiet: true });

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ---------------- HELPERS ----------------

function convertToObjects(arr, keys) {
  const result = [];

  for (let i = 0; i < arr.length; i += keys.length * 2) {
    const obj = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = arr[i + j * 2 + 1];
    }
    result.push(obj);
  }

  return result;
}

// ---------------- INTERVIEW REPORT ----------------

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const client = await Client.connect(process.env.INTERVIEW_REPORT_URL);

    const response = await client.predict("/generate_report", {
      resume: resume,
      self_desc: selfDescription,
      job_desc: jobDescription,
    });

    let data = response.data[0];

    return data;
  } catch (error) {
    console.error("Error generating interview report:", error);
    throw error;
  }
}

// ---------------- PDF GENERATION ----------------

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

// ---------------- RESUME PDF ----------------

export async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const resumePdfSchema = z.object({
      html: z.string(),
    });

    const prompt = `
Generate resume for a candidate:

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY JSON:
{
  "html": "<valid HTML resume>"
}

Requirements:
- Professional, clean design
- ATS friendly
- 1-2 pages max
- No AI-sounding text
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
      },
    });

    const jsonContent = JSON.parse(response.text);

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    throw error;
  }
}















//const { GoogleGenAI } = require("@google/genai")
//const { z } = require("zod")
//const { zodToJsonSchema } = require("zod-to-json-schema")
//const puppeteer = require("puppeteer")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })


// const interviewReportSchema = z.object({
//   title: z.string(),

//   matchScore: z.number(),

//   technicalQuestions: z.array(z.object({
//     question: z.string().describe("The technical question can be asked in the interview"),
//     intention: z.string().describe("The intention of interviewer behind asking this question"),
//     answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//   })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

//   behavioralQuestions: z.array(z.object({
//     question: z.string().describe("The behavioral question can be asked in the interview"),
//     intention: z.string().describe("The intention of interviewer behind asking this question"),
//     answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//   })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

//   skillGaps: z.array(z.object({
//     skill: z.string().describe("The skill which the candidate is lacking"),
//     severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances"),
//     reason: z.string().describe("The reason why this skill gap exists or why it is important")
//   })).describe("Skill gaps that can be identified from the candidate's resume and self description compared to the job description"),

//   preparationPlan: z.array(z.object({
//     day: z.number().describe("The day number in the preparation plan starting from day 1"),
//     focus: z.string().describe("The main focus of this day"),
//     tasks: z.array(z.string()).describe("List of tasks for this day")
//   })).describe("A day-wise preparation plan for the candidate to prepare for the interview")
// });



// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
    
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     // const prompt = `
//     // You are an expert technical recruiter and interview coach.

//     // Analyze the candidate and generate a structured interview report.

//     // INPUT:
//     // Resume:
//     // ${resume}

//     // Self Description:
//     // ${selfDescription}

//     // Job Description:
//     // ${jobDescription}

//     // STRICT INSTRUCTIONS:
//     // - Return ONLY valid JSON.
//     // - DO NOT include explanations, markdown, or text outside JSON.
//     // - Follow the schema EXACTLY.
//     // - Use camelCase keys ONLY.

//     // OUTPUT FORMAT:

//     // {
//     // "title": "string",
//     // "matchScore": number,
//     // "technicalQuestions": [
//     //     {
//     //     "question": "string",
//     //     "intention": "string",
//     //     "answer": "string"
//     //     }
//     // ],
//     // "behavioralQuestions": [
//     //     {
//     //     "question": "string",
//     //     "intention": "string",
//     //     "answer": "string"
//     //     }
//     // ],
//     // "skillGaps": [
//     //     {
//     //     "skill": "string",
//     //     "severity": "low | medium | high",
//     //     "reason": "string"
//     //     }
//     // ],
//     // "preparationPlan": [
//     //     {
//     //     "day": number,
//     //     "focus": "string",
//     //     "tasks": ["string"]
//     //     }
//     // ]
//     // }
//     // `;

//         const prompt = `
//     You are an expert technical interviewer.

//     STRICT RULES:
//     - Return ONLY valid JSON.
//     - DO NOT include explanations or text outside JSON.
//     - Follow EXACT structure.
//     - Use ONLY these keys:
//     title, matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan
//     - Each array MUST contain at least 2 items.

//     FORMAT:

//     {
//     "title": "Full Stack Developer Evaluation Report",
//     "matchScore": number,
//     "technicalQuestions": [
//         {
//         "question": "",
//         "intention": "",
//         "answer": ""
//         }
//     ],
//     "behavioralQuestions": [
//         {
//         "question": "",
//         "intention": "",
//         "answer": ""
//         }
//     ],
//     "skillGaps": [
//         {
//         "skill": "",
//         "severity": "low | medium | high"
//         }
//     ],
//     "preparationPlan": [
//         {
//         "day": number,
//         "focus": "",
//         "tasks": [""]
//         }
//     ]
//     }

//     INPUT DATA:
//     Resume: ${resume}
//     Self Description: ${selfDescription}
//     Job Description: ${jobDescription}
//     `;
    
//     const response = await ai.models.generateContent({
//         model: "gemini-3.1-flash-lite-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//             temperature: 0.2 // 🔥 IMPORTANT (less randomness = better structure)
//         }
//     })

//     //console.log("Raw AI Response:", response.text);
//     //return JSON.parse(response.text)
//     let text = response.text;

//     // 🧹 Clean response (important)
//     text = text.trim();

//     try {
//         //return JSON.parse(text);
//         console.log("Raw AI Response:", text)
//     } catch (err) {
//     console.error("Parsing failed:", text);
//     throw new Error("Invalid JSON from AI");
//     }


// }

//import puppeteer from "puppeteer";
//import { z } from "zod";
//import { zodToJsonSchema } from "zod-to-json-schema";
//import { GoogleGenAI } from "@google/genai";
//import dotenv from "dotenv";
//import { Client } from "@gradio/client";
// const { Client } = require("@gradio/client")
// async function generateInterviewReport({
//   resume,
//   selfDescription,
//   jobDescription,
// }) {
//   try {
//     const client = await Client.connect(process.env.INTERVIEW_REPORT_URL);

//     const response = await client.predict("/generate_report", {
//       resume: resume,
//       self_desc: selfDescription,
//       job_desc: jobDescription,
//     });

//     let data = response.data[0];
//     console.log("hi")
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error generating interview report:", error);
//     throw error;
//   }
// }

// module.exports = generateInterviewReport;
