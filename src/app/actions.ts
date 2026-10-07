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
  const guests = parseInt(formData.get("guests") as string, 10) || 1;
  const type = (formData.get("type") as string) || "catering";
  const details = (formData.get("details") as string) || "";

  if (!name || !email || !date || !time) {
    throw new Error("Missing required fields");
  }

  await query(
    "INSERT INTO bookings (name, email, date, time, guests, type, details, status) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')",
    [name, email, date, time, guests, type, details]
  );
  
  revalidatePath("/");
  return { success: true };
}

import { cookies } from "next/headers";

export async function loginAdmin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set("admin_auth", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    return { success: true };
  }
  return { success: false };
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_auth");
  revalidatePath("/");
}

export async function checkAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "true";
}

export async function getAdminBookings() {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  const result = await query("SELECT * FROM bookings ORDER BY date ASC, time ASC");
  return result.rows.map(r => ({
    ...r,
    date: new Date(r.date).toISOString().split('T')[0],
    time: r.time.substring(0, 5)
  }));
}

export async function updateBookingStatus(id: number, status: string) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  await query("UPDATE bookings SET status = $1 WHERE id = $2", [status, id]);
  revalidatePath("/admin");
}

export async function getSchedule() {
  const result = await query("SELECT * FROM weekly_schedule ORDER BY id ASC");
  return result.rows;
}

export async function updateSchedule(schedule: any[]) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  await query("TRUNCATE TABLE weekly_schedule");
  for (const day of schedule) {
    await query(
      "INSERT INTO weekly_schedule (day_of_week, location_name, time_range, is_active) VALUES ($1, $2, $3, $4)",
      [day.day_of_week, day.location_name, day.time_range, day.is_active]
    );
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

