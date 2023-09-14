import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Ratchapon Prangthong",
    studentId: "650610802",
  });
};
