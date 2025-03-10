import { AILogoPrompt } from "@/configs/AiModel";
import axios from "axios";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/configs/FirebaseConfig";
import Replicate from "replicate";
import { Buffer } from "buffer";

export async function POST(req) {
  const { prompt, title, desc, email, type, userCredit } = await req.json();

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  let base64data = "";

  try {
    const AIPromptResult = await AILogoPrompt.sendMessage(prompt);
    const responseText = await AIPromptResult.response.text();
    const AIPrompt = JSON.parse(responseText).prompt;

    if (type === "Free") {
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/Pandluru/Flux-Midjourney",
        AIPrompt,
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      const buffer = Buffer.from(response.data, "binary");
      const base64Image = buffer.toString("base64");
      base64data = `data:image/png;base64,${base64Image}`;
    } else {
      const output = await replicate.run(
        "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
        {
          input: {
            prompt: AIPrompt,
            aspect_ratio: "1:1",
            output_format: "png",
            guidance_scale: 3.5,
            output_quality: 80,
            num_inference_steps: 8,
          },
        }
      );
      console.log("Replicate Output:", output);
      const imageUrl = output?.[0];
      console.log("Replicate Image URL:", imageUrl);
      base64data = await ConvertImageToBase64(imageUrl);
      console.log("Base64 Image Length:", base64data?.length);
      

      //if (base64data && userCredit) {
        //const docRef = doc(db, "users", email);
        //await updateDoc(docRef, {
        //  credits: Number(userCredit) - 1,
        //});
      //}
    }

    console.log("Generated Base64 Image:", base64data.slice(0, 100) + "...");

    await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
      image: base64data,
      title,
      desc,
    });

    return NextResponse.json({ image: base64data });
  } catch (e) {
    console.error("Error in logo generation:", e.message);
    return NextResponse.json({ error: e.message });
  }
}

async function ConvertImageToBase64(imageUrl) {
  try {
    const resp = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const base64ImageRaw = Buffer.from(resp.data).toString("base64");
    return `data:image/png;base64,${base64ImageRaw}`;
  } catch (error) {
    console.error("Image Conversion Error:", error.message);
    return "";
  }
}
