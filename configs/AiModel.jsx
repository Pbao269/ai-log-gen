const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Based on Logo of type Modern Mascot Logo, generate a text prompt to create Logo for Logo title/Brand name :  GoViet with description: Wooden Factory and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with idea fields."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am currently unable to generate images, as that capability is only enabled for early testers. However, I can provide you with text-based logo ideas in JSON format based on your prompt and description.\n\nHere are 5 logo ideas for \"GoViet\" - Wooden Factory, in JSON format, inspired by a modern mascot logo style:\n\n```json\n{\n  \"logo_ideas\": [\n    {\n      \"idea\": \"Friendly Woodenworker Mascot\"\n    },\n    {\n      \"idea\": \"Smiling Wood Chip Character\"\n    },\n    {\n      \"idea\": \"Animated Carpenter GoViet Logo\"\n    },\n    {\n      \"idea\": \"Happy Wood Grain Figure\"\n    },\n    {\n      \"idea\": \"Playful Wooden House Icon\"\n    }\n  ]\n}\n```\n\nThese ideas aim to capture the \"fun, welcoming, and full of character\" style you described, while incorporating elements related to \"Wooden Factory.\" You can use these ideas to further refine your logo design.\n"},
          ],
        },
      ],
    });
    export const AILogoPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : DeVoyage,with description: Guarantee Luxurious and Comfortable Ocean Trip, with Color combination of Ocean Blues, also include the Luxury Gold Anchor Crest and include Custom Luxury Logo Designs design idea and Referring to this Logo Prompt:Create a set of luxurious, elegant, and professional logos with a gold metallic finish on a dark background. Include a variety of themes, such as animals, letters, symbols, and nature-inspired designs. Each logo should convey sophistication, premium quality, and modern aesthetics, suitable for any brand or industry.  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a luxurious and elegant logo for 'DeVoyage'. The brand guarantees luxurious and comfortable ocean trips. The color palette should heavily feature ocean blues, evoking a sense of tranquility and vastness.  Incorporate a custom luxury logo design featuring a Luxury Gold Anchor Crest as a central element.  The overall design should convey sophistication, premium quality, and modern aesthetics.  Take inspiration from luxurious logos with a gold metallic finish on a dark background, similar to examples showcasing animals, letters, symbols, and nature-inspired designs. The logo should be suitable for a high-end travel company specializing in ocean cruises.\"\n}\n```\n"},
          ],
        },
      ],
    });

  