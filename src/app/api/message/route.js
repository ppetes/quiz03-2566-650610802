import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const roomId = request.nextUrl.searchParams.get("roomId");
  readDB();

  if (!roomId)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
};

export const POST = async (request) => {
  const body = await request.json();
  const { roomId, messageText } = body;
  readDB();
  if (roomId === DB.rooms.roomId)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found `,
      },
      { status: 404 }
    );

  const messageId = nanoid();
  DB.messages.push({
    roomId,
    messageId,
    messageText,
  });

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  const body = await request.json();
  const { messageId } = body;
  role = payload.role;
  if (!payload && role !== "SUPER_ADMIN")
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  if (!messageId)
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );

  writeDB();
  DB.messages = DB.messages.filter((x) => x.messageId !== messageId);
  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
