// import { NextRequest, NextResponse } from "next/server";
// import { saveContactMessage } from "@/services/db/repositories/contactMessagesRepository";

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const { name, email, message } = data;

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const result = await saveContactMessage({ name, email, message });

//     const insertedId = result?.id;
//     console.log(
//       `Contact message with ID ${insertedId} was saved successfully.`
//     );
//     return NextResponse.json({
//       message: "Contact message sent successfully",
//       id: insertedId,
//     });
//   } catch (error) {
//     console.error("Error saving contact message:", error);
//     return NextResponse.json(
//       { error: "Failed to send contact message" },
//       { status: 500 }
//     );
//   }
// }
