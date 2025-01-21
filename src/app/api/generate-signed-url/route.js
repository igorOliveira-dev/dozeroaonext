import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { publicId } = await req.json();

    const publicUrl = cloudinary.url(publicId, {
      resource_type: "video",
      type: "upload",
      secure: true,
    });

    return new Response(JSON.stringify({ url: publicUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar URL pública:", error);
    return new Response(JSON.stringify({ error: "Erro ao gerar URL pública" }), { status: 500 });
  }
}
