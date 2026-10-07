"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getBookings() {
  const result = await query("SELECT id, date, time FROM bookings");
  return result.rows.map(row => ({
    date: new Date(row.date).toISOString().split('T')[0],
    time: row.time.substring(0, 5) // "HH:MM"
  }));
}

export async function createBooking(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const guests = parseInt(formData.get("guests") as string, 10);

  if (!name || !email || !date || !time || !guests) {
    throw new Error("Missing required fields");
  }

  await query(
    "INSERT INTO bookings (name, email, date, time, guests) VALUES ($1, $2, $3, $4, $5)",
    [name, email, date, time, guests]
  );
  
  revalidatePath("/");
  return { success: true };
}
