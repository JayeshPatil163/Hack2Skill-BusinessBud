
// import { toast } from "@/components/ui/use-toast";

// // Types for the business idea data
// export interface BusinessIdea {
//   title: string;
//   description: string;
//   industry: string;
//   targetAudience: string;
//   uniqueSelling: string;
// }

// // Types for the analysis response
// export interface AnalysisResponse {
//   strengthsWeaknesses: {
//     strengths: string[];
//     weaknesses: string[];
//   };
//   marketAnalysis: string;
//   competitorAnalysis: string[];
//   targetCustomer: {
//     demographics: string;
//     psychographics: string;
//     painPoints: string[];
//   };
//   roadmap: {
//     phase: string;
//     tasks: string[];
//     timeframe: string;
//   }[];
//   financialProjections: {
//     initialInvestment: string;
//     breakevenPoint: string;
//     revenueStreams: string[];
//   };
// }

// const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// // Add your API key here or load it from environment variables
// // IMPORTANT: Replace this with your actual Gemini API key
// const API_KEY = "AIzaSyB1i62tOXe6jLJ-fm7jpDo4mF-HQpQCJYE"; // <-- Replace with your API key

// export const generateBusinessAnalysis = async (idea: BusinessIdea): Promise<AnalysisResponse> => {
//   try {
//     // Construct the prompt for the Gemini API
//     const prompt = `
//     Analyze this business idea in detail and provide a comprehensive response:
    
//     Title: ${idea.title}
//     Description: ${idea.description}
//     Industry: ${idea.industry}
//     Target Audience: ${idea.targetAudience}
//     Unique Selling Proposition: ${idea.uniqueSelling}
    
//     Please provide the following in a structured format:
//     1. Strengths analysis (minimum 3 points)
//     2. Weaknesses analysis (minimum 3 points)
//     3. Market analysis (market size, trends, opportunities)
//     4. Competitor analysis (list at least 3 competitors and their positions)
//     5. Target customer profile (demographics, psychographics, pain points)
//     6. Implementation roadmap (at least 3 phases with specific tasks and timeframes)
//     7. Financial projections (initial investment needed, breakeven point, revenue streams)
    
//     Format your response as a detailed business analysis. and give name to each section, with names provided in the prompt under structured format.
//     `;

//     // Call the Gemini API
//     const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt,
//               },
//             ],
//           },
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 2048,
//         },
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || "Failed to generate analysis");
//     }

//     const data = await response.json();
//     const generatedText = data.candidates[0].content.parts[0].text;

//     // Parse the response into structured data
//     // This is a simplified parsing approach - in production you might want
//     // to use a more robust approach or ask the API to return structured JSON
//     console.log
//     const structuredResponse = parseGeminiResponse(generatedText);
//     return structuredResponse;
//   } catch (error) {
//     console.error("Error generating business analysis:", error);
//     toast({
//       variant: "destructive",
//       title: "Analysis failed",
//       description: "Unable to generate business analysis. Please try again.",
//     });
//     throw error;
//   }
// };

// // Helper function to parse the text response into structured data
// const parseGeminiResponse = (text: string): AnalysisResponse => {
//   // This is a simplified parser - in a real application, you'd want to use
//   // a more robust approach or have the API return structured data directly
  
//   // For demo purposes, we'll create a structured response with placeholder data
//   // In a real implementation, you would extract this from the Gemini response text
//   console.log("Parsing Gemini response:", text);
//   try {
//     // Attempt to extract sections from the text
//     const strengthsSection = text.match(/1:?\s*([\s\S]*?)(?:2|$)/i)?.[1] || "";
//     const weaknessesSection = text.match(/2:?\s*([\s\S]*?)(?:3|$)/i)?.[1] || "";
//     const marketSection = text.match(/3:?\s*([\s\S]*?)(?:4|$)/i)?.[1] || "";
//     const competitorSection = text.match(/4:?\s*([\s\S]*?)(?:Target customer|$)/i)?.[1] || "";
//     const customerSection = text.match(/Target customer:?\s*([\s\S]*?)(?:Implementation roadmap|$)/i)?.[1] || "";
//     const roadmapSection = text.match(/Implementation roadmap:?\s*([\s\S]*?)(?:Financial|$)/i)?.[1] || "";
//     const financialSection = text.match(/Financial projections:?\s*([\s\S]*?)(?:Conclusion|$)/i)?.[1] || "";


//     console.log("Parsed sections:",strengthsSection);
//     // Extract strengths as bullet points
//     const strengths = strengthsSection
//       .split(/\n/)
//       .filter(line => line.trim().match(/^[-*•]|^\d+\./))
//       .map(line => line.replace(/^[-*•]|\d+\.\s*/, "").trim())
//       .filter(Boolean);

//       console.log("Strengths:", strengths);
//     // Extract weaknesses as bullet points
//     const weaknesses = weaknessesSection
//       .split(/\n/)
//       .filter(line => line.trim().match(/^[-*•]|^\d+\./))
//       .map(line => line.replace(/^[-*•]|\d+\.\s*/, "").trim())
//       .filter(Boolean);

//     // Extract competitors
//     const competitors = competitorSection
//       .split(/\n/)
//       .filter(line => line.trim().match(/^[-*•]|^\d+\./))
//       .map(line => line.replace(/^[-*•]|\d+\.\s*/, "").trim())
//       .filter(Boolean);

//     // Extract pain points
//     const painPoints = customerSection
//       .split(/\n/)
//       .filter(line => line.trim().match(/^[-*•]|^\d+\./) && line.toLowerCase().includes("pain"))
//       .map(line => line.replace(/^[-*•]|\d+\.\s*/, "").trim())
//       .filter(Boolean);

//     // Extract roadmap phases
//     const roadmapPhases = roadmapSection
//       .split(/phase \d+|short[- ]term|medium[- ]term|long[- ]term/i)
//       .filter(Boolean)
//       .map((phase, index) => {
//         const phaseMatch = roadmapSection.match(new RegExp(`(phase ${index + 1}|${index === 0 ? 'short[- ]term' : index === 1 ? 'medium[- ]term' : 'long[- ]term'})[^]*?(?=phase|$)`, 'i'));
//         const phaseTitle = phaseMatch?.[1] || `Phase ${index + 1}`;
        
//         const tasks = phase
//           .split(/\n/)
//           .filter(line => line.trim().match(/^[-*•]|^\d+\./))
//           .map(line => line.replace(/^[-*•]|\d+\.\s*/, "").trim())
//           .filter(Boolean);

//         // Try to extract timeframe
//         const timeframeMatch = phase.match(/(\d+[-–]\d+\s*(?:months|weeks|days|years)|\d+\s*(?:months|weeks|days|years))/i);
//         const timeframe = timeframeMatch ? timeframeMatch[0] : `${index * 3 + 3}-${index * 3 + 6} months`;

//         return {
//           phase: phaseTitle,
//           tasks: tasks.length > 0 ? tasks : [`Task ${index + 1}`, `Task ${index + 2}`, `Task ${index + 3}`],
//           timeframe
//         };
//       });

//     // Extract revenue streams
//     const revenueStreams = financialSection
//       .split(/\n/)
//       .filter(line => line.trim().match(/^[-*•]|^\d+\./) && (
//         line.toLowerCase().includes("revenue") || 
//         line.toLowerCase().includes("monetization") ||
//         line.toLowerCase().includes("income")
//       ))
//       .map(line => line.replace(/^[-*•]|\d+\.\s*/, "").trim())
//       .filter(Boolean);

//     // Try to extract initial investment
//     const investmentMatch = financialSection.match(/initial investment:?\s*(\$[\d,]+k?|[\d,]+k?)/i);
//     const initialInvestment = investmentMatch ? investmentMatch[1] : "$50,000 - $100,000";

//     // Try to extract breakeven point
//     const breakevenMatch = financialSection.match(/break(?:[-\s])?even:?\s*(\d+[-–]?\d*\s*(?:months|years))/i);
//     const breakevenPoint = breakevenMatch ? breakevenMatch[1] : "12-18 months";

//     return {
//       strengthsWeaknesses: {
//         strengths: strengths.length > 0 ? strengths : [
//           "Innovative solution addressing a real market need",
//           "Clear target audience identification",
//           "Strong unique selling proposition"
//         ],
//         weaknesses: weaknesses.length > 0 ? weaknesses : [
//           "Potential high initial development costs",
//           "Market education may be required",
//           "Competitive landscape challenges"
//         ]
//       },
//       marketAnalysis: marketSection.trim() || "The market shows significant growth potential with increasing demand for innovative solutions in this space.",
//       competitorAnalysis: competitors.length > 0 ? competitors : [
//         "Competitor A - Current market leader with traditional approach",
//         "Competitor B - Recent entrant with technology focus but limited features",
//         "Competitor C - Established player targeting adjacent market segments"
//       ],
//       targetCustomer: {
//         demographics: (customerSection.match(/Demographics:?\s*([\s\S]*?)(?:Psychographics|pain points|$)/i)?.[1] || "").trim() || "25-45 year old professionals in urban areas with above-average income",
//         psychographics: (customerSection.match(/Psychographics:?\s*([\s\S]*?)(?:Pain Points|$)/i)?.[1] || "").trim() || "Tech-savvy, value convenience and efficiency, willing to try new solutions",
//         painPoints: painPoints.length > 0 ? painPoints : [
//           "Existing solutions are time-consuming and inefficient",
//           "Current market offerings are expensive with poor user experience",
//           "Lack of personalized options in available alternatives"
//         ]
//       },
//       roadmap: roadmapPhases.length > 0 ? roadmapPhases : [
//         {
//           phase: "Phase 1: Foundation",
//           tasks: ["Market research and validation", "MVP development", "Initial user testing"],
//           timeframe: "0-3 months"
//         },
//         {
//           phase: "Phase 2: Development & Launch",
//           tasks: ["Full feature development", "Marketing campaign preparation", "Beta testing and refinement"],
//           timeframe: "4-6 months"
//         },
//         {
//           phase: "Phase 3: Growth & Expansion",
//           tasks: ["Full market launch", "Customer acquisition campaigns", "Feedback collection and product iteration"],
//           timeframe: "7-12 months"
//         }
//       ],
//       financialProjections: {
//         initialInvestment: initialInvestment,
//         breakevenPoint: breakevenPoint,
//         revenueStreams: revenueStreams.length > 0 ? revenueStreams : [
//           "Subscription model with tiered pricing",
//           "Premium features and add-ons",
//           "Enterprise solutions with custom pricing"
//         ]
//       }
//     };
//   } catch (error) {
//     console.error("Error parsing Gemini response:", error);
    
//     // Return fallback data if parsing fails
//     return {
//       strengthsWeaknesses: {
//         strengths: [
//           "Innovative solution addressing a real market need",
//           "Clear target audience identification",
//           "Strong unique selling proposition"
//         ],
//         weaknesses: [
//           "Potential high initial development costs",
//           "Market education may be required",
//           "Competitive landscape challenges"
//         ]
//       },
//       marketAnalysis: "The market shows significant growth potential with increasing demand for innovative solutions in this space.",
//       competitorAnalysis: [
//         "Competitor A - Current market leader with traditional approach",
//         "Competitor B - Recent entrant with technology focus but limited features",
//         "Competitor C - Established player targeting adjacent market segments"
//       ],
//       targetCustomer: {
//         demographics: "25-45 year old professionals in urban areas with above-average income",
//         psychographics: "Tech-savvy, value convenience and efficiency, willing to try new solutions",
//         painPoints: [
//           "Existing solutions are time-consuming and inefficient",
//           "Current market offerings are expensive with poor user experience",
//           "Lack of personalized options in available alternatives"
//         ]
//       },
//       roadmap: [
//         {
//           phase: "Phase 1: Foundation",
//           tasks: ["Market research and validation", "MVP development", "Initial user testing"],
//           timeframe: "0-3 months"
//         },
//         {
//           phase: "Phase 2: Development & Launch",
//           tasks: ["Full feature development", "Marketing campaign preparation", "Beta testing and refinement"],
//           timeframe: "4-6 months"
//         },
//         {
//           phase: "Phase 3: Growth & Expansion",
//           tasks: ["Full market launch", "Customer acquisition campaigns", "Feedback collection and product iteration"],
//           timeframe: "7-12 months"
//         }
//       ],
//       financialProjections: {
//         initialInvestment: "$50,000 - $100,000",
//         breakevenPoint: "12-18 months",
//         revenueStreams: [
//           "Subscription model with tiered pricing",
//           "Premium features and add-ons",
//           "Enterprise solutions with custom pricing"
//         ]
//       }
//     };
//   }
// };


import { toast } from "@/components/ui/use-toast";

// Types for the business idea data
export interface BusinessIdea {
  title: string;
  description: string;
  industry: string;
  targetAudience: string;
  uniqueSelling: string;
}

// Types for the analysis response
export interface AnalysisResponse {
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  marketAnalysis: string;
  competitorAnalysis: string[];
  targetCustomer: {
    demographics: string;
    psychographics: string;
    painPoints: string[];
  };
  roadmap: {
    phase: string;
    tasks: string[];
    timeframe: string;
  }[];
  financialProjections: {
    initialInvestment: string;
    breakevenPoint: string;
    revenueStreams: string[];
  };
}

const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Add your API key here or load it from environment variables
// IMPORTANT: Replace this with your actual Gemini API key
const API_KEY = "AIzaSyB1i62tOXe6jLJ-fm7jpDo4mF-HQpQCJYE"; // <-- Replace with your API key

export const generateBusinessAnalysis = async (idea: BusinessIdea): Promise<AnalysisResponse> => {
  try {
    // Improved prompt for the Gemini API that asks for JSON-like structure
    const prompt = `
    Analyze this business idea in detail and provide a structured response:
    
    Title: ${idea.title}
    Description: ${idea.description}
    Industry: ${idea.industry}
    Target Audience: ${idea.targetAudience}
    Unique Selling Proposition: ${idea.uniqueSelling}
    
    Format your response in clear sections with headings (DO NOT USE NUMBERS like "1. Strengths" - just use "Strengths:" as a heading), and use plain text bullet points with a dash (-) rather than stars or any other special characters.
    
    Include the following sections in your analysis:
    
    Strengths:
    - List at least 3 key strengths of this business idea
    
    Weaknesses:
    - List at least 3 key weaknesses or challenges this business might face
    
    Market Analysis:
    Provide a paragraph about the market size, trends, and opportunities
    
    Competitor Analysis:
    - List at least 3 competitors with brief descriptions of their positioning
    
    Target Customer:
    Demographics: A paragraph about the demographic characteristics of the target customers
    Psychographics: A paragraph about the psychographic traits of the target customers
    Pain Points:
    - List at least 3 pain points that your target customers experience
    
    Implementation Roadmap:
    Phase 1: [Name]
    Timeframe: [e.g., 0-3 months]
    - Task 1
    - Task 2
    - Task 3
    
    Phase 2: [Name]
    Timeframe: [e.g., 4-6 months]
    - Task 1
    - Task 2
    - Task 3
    
    Phase 3: [Name]
    Timeframe: [e.g., 7-12 months]
    - Task 1
    - Task 2
    - Task 3
    
    Financial Projections:
    Initial Investment: [estimated amount]
    Breakeven Point: [estimated timeframe]
    
    Revenue Streams:
    - List at least 3 potential revenue streams for this business
    `;

    // Call the Gemini API
    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate analysis");
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Parse the response into structured data
    const structuredResponse = parseGeminiResponse(generatedText);
    return structuredResponse;
  } catch (error) {
    console.error("Error generating business analysis:", error);
    toast({
      variant: "destructive",
      title: "Analysis failed",
      description: "Unable to generate business analysis. Please try again.",
    });
    throw error;
  }
};

// Improved parsing function with better regex patterns
const parseGeminiResponse = (text: string): AnalysisResponse => {
  console.log("Parsing Gemini response:", text);
  try {
    // Extract sections using improved regex patterns
    // Using non-greedy patterns and more specific section headers
    const strengthsMatch = text.match(/Strengths:[\s\S]*?(?=Weaknesses:|$)/i);
    const weaknessesMatch = text.match(/Weaknesses:[\s\S]*?(?=Market Analysis:|$)/i);
    const marketMatch = text.match(/Market Analysis:[\s\S]*?(?=Competitor Analysis:|$)/i);
    const competitorMatch = text.match(/Competitor Analysis:[\s\S]*?(?=Target Customer:|$)/i);
    const customerMatch = text.match(/Target Customer:[\s\S]*?(?=Implementation Roadmap:|$)/i);
    const roadmapMatch = text.match(/Implementation Roadmap:[\s\S]*?(?=Financial Projections:|$)/i);
    const financialMatch = text.match(/Financial Projections:[\s\S]*?(?=Conclusion|$)/i);

    // Extract demographics and psychographics from the customer section
    const customerSection = customerMatch ? customerMatch[0] : "";
    const demographicsMatch = customerSection.match(/Demographics:[\s\S]*?(?=Psychographics:|Pain Points:|$)/i);
    const psychographicsMatch = customerSection.match(/Psychographics:[\s\S]*?(?=Pain Points:|$)/i);
    const painPointsMatch = customerSection.match(/Pain Points:[\s\S]*?(?=\n\n|$)/i);

    // Extract bullet points by looking for lines that start with "- "
    const extractBulletPoints = (text) => {
      if (!text) return [];
      return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith("-"))
        .map(line => line.substring(1).trim())
        .filter(Boolean);
    };

    // Extract strengths and weaknesses
    const strengths = extractBulletPoints(strengthsMatch ? strengthsMatch[0] : "");
    const weaknesses = extractBulletPoints(weaknessesMatch ? weaknessesMatch[0] : "");
    const competitors = extractBulletPoints(competitorMatch ? competitorMatch[0] : "");
    const painPoints = extractBulletPoints(painPointsMatch ? painPointsMatch[0] : "");
    const revenueStreams = extractBulletPoints(financialMatch ? financialMatch[0].match(/Revenue Streams:[\s\S]*?(?=\n\n|$)/i)?.[0] : "");

    // Extract market analysis paragraph
    const marketAnalysis = marketMatch 
      ? marketMatch[0].replace(/Market Analysis:\s*/i, "").trim()
      : "The market shows significant growth potential with increasing demand for innovative solutions in this space.";

    // Extract demographics and psychographics paragraphs
    const demographics = demographicsMatch 
      ? demographicsMatch[0].replace(/Demographics:\s*/i, "").trim()
      : "25-45 year old professionals in urban areas with above-average income";
    
    const psychographics = psychographicsMatch 
      ? psychographicsMatch[0].replace(/Psychographics:\s*/i, "").trim()
      : "Tech-savvy, value convenience and efficiency, willing to try new solutions";

    // Extract roadmap phases
    const roadmapPhases = [];
    if (roadmapMatch) {
      const roadmapSection = roadmapMatch[0];
      const phaseRegex = /Phase\s+\d+:\s+([^\n]+)\s+Timeframe:\s+([^\n]+)([\s\S]*?)(?=Phase\s+\d+:|$)/gi;
      
      let phaseMatch;
      while ((phaseMatch = phaseRegex.exec(roadmapSection)) !== null) {
        const phaseName = phaseMatch[1].trim();
        const timeframe = phaseMatch[2].trim();
        const tasks = extractBulletPoints(phaseMatch[3]);
        
        roadmapPhases.push({
          phase: `Phase ${roadmapPhases.length + 1}: ${phaseName}`,
          tasks: tasks.length > 0 ? tasks : [`Task ${roadmapPhases.length + 1}`],
          timeframe
        });
      }
    }

    // Extract financial projections
    const initialInvestmentMatch = financialMatch 
      ? financialMatch[0].match(/Initial Investment:\s*([^\n]+)/i)
      : null;
    
    const breakevenMatch = financialMatch 
      ? financialMatch[0].match(/Breakeven Point:\s*([^\n]+)/i)
      : null;
    
    const initialInvestment = initialInvestmentMatch 
      ? initialInvestmentMatch[1].trim()
      : "$50,000 - $100,000";
    
    const breakevenPoint = breakevenMatch 
      ? breakevenMatch[1].trim()
      : "12-18 months";

    // Create the structured response
    return {
      strengthsWeaknesses: {
        strengths: strengths.length > 0 ? strengths : [
          "Innovative solution addressing a real market need",
          "Clear target audience identification",
          "Strong unique selling proposition"
        ],
        weaknesses: weaknesses.length > 0 ? weaknesses : [
          "Potential high initial development costs",
          "Market education may be required",
          "Competitive landscape challenges"
        ]
      },
      marketAnalysis: marketAnalysis,
      competitorAnalysis: competitors.length > 0 ? competitors : [
        "Competitor A - Current market leader with traditional approach",
        "Competitor B - Recent entrant with technology focus but limited features",
        "Competitor C - Established player targeting adjacent market segments"
      ],
      targetCustomer: {
        demographics: demographics,
        psychographics: psychographics,
        painPoints: painPoints.length > 0 ? painPoints : [
          "Existing solutions are time-consuming and inefficient",
          "Current market offerings are expensive with poor user experience",
          "Lack of personalized options in available alternatives"
        ]
      },
      roadmap: roadmapPhases.length > 0 ? roadmapPhases : [
        {
          phase: "Phase 1: Foundation",
          tasks: ["Market research and validation", "MVP development", "Initial user testing"],
          timeframe: "0-3 months"
        },
        {
          phase: "Phase 2: Development & Launch",
          tasks: ["Full feature development", "Marketing campaign preparation", "Beta testing and refinement"],
          timeframe: "4-6 months"
        },
        {
          phase: "Phase 3: Growth & Expansion",
          tasks: ["Full market launch", "Customer acquisition campaigns", "Feedback collection and product iteration"],
          timeframe: "7-12 months"
        }
      ],
      financialProjections: {
        initialInvestment: initialInvestment,
        breakevenPoint: breakevenPoint,
        revenueStreams: revenueStreams.length > 0 ? revenueStreams : [
          "Subscription model with tiered pricing",
          "Premium features and add-ons",
          "Enterprise solutions with custom pricing"
        ]
      }
    };
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    
    // Return fallback data if parsing fails
    return {
      strengthsWeaknesses: {
        strengths: [
          "Innovative solution addressing a real market need",
          "Clear target audience identification",
          "Strong unique selling proposition"
        ],
        weaknesses: [
          "Potential high initial development costs",
          "Market education may be required",
          "Competitive landscape challenges"
        ]
      },
      marketAnalysis: "The market shows significant growth potential with increasing demand for innovative solutions in this space.",
      competitorAnalysis: [
        "Competitor A - Current market leader with traditional approach",
        "Competitor B - Recent entrant with technology focus but limited features",
        "Competitor C - Established player targeting adjacent market segments"
      ],
      targetCustomer: {
        demographics: "25-45 year old professionals in urban areas with above-average income",
        psychographics: "Tech-savvy, value convenience and efficiency, willing to try new solutions",
        painPoints: [
          "Existing solutions are time-consuming and inefficient",
          "Current market offerings are expensive with poor user experience",
          "Lack of personalized options in available alternatives"
        ]
      },
      roadmap: [
        {
          phase: "Phase 1: Foundation",
          tasks: ["Market research and validation", "MVP development", "Initial user testing"],
          timeframe: "0-3 months"
        },
        {
          phase: "Phase 2: Development & Launch",
          tasks: ["Full feature development", "Marketing campaign preparation", "Beta testing and refinement"],
          timeframe: "4-6 months"
        },
        {
          phase: "Phase 3: Growth & Expansion",
          tasks: ["Full market launch", "Customer acquisition campaigns", "Feedback collection and product iteration"],
          timeframe: "7-12 months"
        }
      ],
      financialProjections: {
        initialInvestment: "$50,000 - $100,000",
        breakevenPoint: "12-18 months",
        revenueStreams: [
          "Subscription model with tiered pricing",
          "Premium features and add-ons",
          "Enterprise solutions with custom pricing"
        ]
      }
    };
  }
};