const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getAISuggestion = async (req, res) => {
  try {
    const { totalBalance, totalIncome, totalExpense, transactions } = req.body;
    console.log('====================================');
    console.log(totalBalance, totalIncome, totalExpense, transactions);
    console.log('====================================');

    const prompt = `
Tum aik AI Financial Advisor ho.
User ki financial summary ye hai:
- Total Income: ${totalIncome}
- Total Expense: ${totalExpense}
- Total Balance: ${totalBalance}
- Transactions: ${JSON.stringify(transactions, null, 2)}

Roman Urdu me jawab do aur output ko **sirf JSON object** ki form me return karo.
Har section me 3-4 short aur practical tips do.
Structure bilkul aise hona chahiye:

{
  "balanceTips": ["tip1", "tip2", "tip3"],
  "expenseManagement": ["tip1", "tip2", "tip3"],
  "incomeOptimization": ["tip1", "tip2", "tip3"],
  "quickWins": ["tip1", "tip2", "tip3"]
}

Sirf JSON object return karo, koi explanation ya text nahi likhna.
`;




console.log('====================================');
console.log(JSON.stringify(transactions, null, 2));
console.log('====================================');

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    // Clean & parse JSON output
    let aiText = response.choices[0].message.content;
    aiText = aiText.trim();

    // Try parsing the AI JSON response
    let aiData;
    try {
      aiData = JSON.parse(aiText);
    } catch {
      // If AI adds extra characters, try cleanup
      aiText = aiText.replace(/```json|```/g, "");
      aiData = JSON.parse(aiText);
    }

    res.json({ success: true, suggestions: aiData });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false, message: "AI error", error });
  }
};

module.exports = getAISuggestion;



const prompt = `
Tum aik AI Financial Advisor ho.
User ki financial summary ye hai:
- Total Income: ${totalIncome}
- Total Expense: ${totalExpense}
- Total Balance: ${totalBalance}
- Transactions: ${JSON.stringify(transactions, null, 2)}

Tumhe transactions ka analysis karna hai aur user ko personalized insights deni hain:
1. Batao kin categories/items par sabse zyada expense hua hai, jo tumhey Transactions array m recive hwa h us ki base pr (e.g. Food, Transport etc).
2. Agar possible ho to mention karo kis source se sabse zyada income hui hai, jo tumhey Transactions array m recive hwa h us ki base pr (e.g. Salary, Freelance etc).
3. In details ko apne tips me shamil karo — taake user ko lage ke ye uske data par based analysis hai.

Roman Urdu me jawab do aur output ko **sirf JSON object** ki form me return karo.
Structure bilkul aise hona chahiye:

{
  "balanceTips": ["tip1", "tip2", "tip3"],
  "expenseManagement": ["tip1 (mention high expense categories)", "tip2", "tip3"],
  "incomeOptimization": ["tip1 (mention high income source if possible)", "tip2", "tip3"],
  "quickWins": ["tip1", "tip2", "tip3"]
}

Sirf JSON object return karo, koi explanation ya extra text nahi likhna.
`;











// const OpenAI  = require("openai");
// const dotenv  = require("dotenv");

// dotenv.config();


// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//  const getAISuggestion = async (req, res) => {

//   try {
//     const { totalBalance, totalIncome, totalExpense,transactions } = req.body;

//       const prompt = `
//       Tum aik AI financial assistant ho.
//       User ki financial summary ye hai:

//       Total Income: ${totalIncome}
//       Total Expense: ${totalExpense}
//       Balance: ${totalBalance}
//       Transactions: ${JSON.stringify(transactions, null, 2)}

//       Ab is data ke basis par user ko 3 short aur smart suggestions do 
//       ke wo apni expenses aur savings ko kese improve kar sakta hai.
//       Answer Roman Urdu me do.
//     `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     res.json({ success: true, message: response.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "AI error", error });
//   }
// }


// module.exports = getAISuggestion;


// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const getAISuggestion = async (req, res) => {
//   try {
//     const { totalIncome, totalExpense, totalBalance, transactions } = req.body;

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     // ✅ Correct model for latest SDK
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
//       Tum aik AI financial assistant ho.
//       User ki financial summary ye hai:

//       Total Income: ${totalIncome}
//       Total Expense: ${totalExpense}
//       Balance: ${totalBalance}
//       Transactions: ${JSON.stringify(transactions, null, 2)}

//       Ab is data ke basis par user ko 3 short aur smart suggestions do 
//       ke wo apni expenses aur savings ko kese improve kar sakta hai.
//       Answer Roman Urdu me do.
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const suggestion = response.text();

//     res.status(200).json({
//       success: true,
//       message: "AI suggestion generated successfully",
//       suggestion,
//     });
//   } catch (error) {
//     console.error("AI Suggestion Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error generating AI suggestion",
//       error: error.message,
//     });
//   }
// };

// module.exports = getAISuggestion;




// const { GoogleGenerativeAI } = require("@google/generative-ai");

//  const getAISuggestion = async (req, res) => {
//   try {
//     const { totalIncome, totalExpense, totalBalance, transactions } = req.body;

//     console.log("==================data==================");
//     console.log(totalIncome, totalBalance, totalExpense, transactions);
//     console.log("==================data==================");

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     // Correct model name + correct endpoint
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const prompt = `
//       Total Income: ${totalIncome}
//       Total Expenses: ${totalExpense}
//       Balance: ${totalBalance}
//       Transactions: ${JSON.stringify(transactions)}

//       Suggest some smart financial tips or insights based on this data.
//     `;

//     const result = await model.generateContent(prompt);

//     const suggestion = result.response.text();

//     res.status(200).json({
//       success: true,
//       message: "AI suggestion generated successfully",
//       suggestion,
//     });
//   } catch (error) {
//     console.error("AI Suggestion Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error generating AI suggestion",
//       error: error.message,
//     });
//   }
// };

// module.exports = getAISuggestion


// {
//   "totalIncome": 120000,
//   "totalExpense": 75000,
//   "totalBalance": 45000,
//   "transactions": [
//     { "source": "Freelancing", "amount": 80000, "type": "income" },
//     { "source": "Salary", "amount": 40000, "type": "income" },
//     { "category": "Food", "amount": 15000, "type": "expense" },
//     { "category": "Travel", "amount": 8000, "type": "expense" },
//     { "category": "Shopping", "amount": 22000, "type": "expense" }
//   ]
// }
