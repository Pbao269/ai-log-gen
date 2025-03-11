import { AILogoPrompt } from "@/configs/AiModel";
import axios from "axios";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/configs/FirebaseConfig";
import Replicate from "replicate";
import { Buffer } from "buffer";
import sharp from "sharp";

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

      // Compress using sharp before base64 conversion
      const compressedBuffer = await sharp(buffer)
        .resize({ width: 512 })
        .png({ quality: 70 })
        .toBuffer();

      base64data = `data:image/png;base64,${compressedBuffer.toString("base64")}`;
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

      const imageUrl = output?.[0];
      base64data = await ConvertImageToBase64(imageUrl);

      // Optionally update credit
      // if (base64data && userCredit) {
      //   const docRef = doc(db, "users", email);
      //   await updateDoc(docRef, { credits: Number(userCredit) - 1 });
      // }
    }

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
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const originalBuffer = Buffer.from(resp.data);

    const compressedBuffer = await sharp(originalBuffer)
      .resize({ width: 512 })
      .png({ quality: 70 })
      .toBuffer();

    return `data:image/png;base64,${compressedBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Image Compression Error:", error.message);
    return "";
  }
}
