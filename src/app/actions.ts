"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";

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
  const phone = formData.get("phone") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const guests = parseInt(formData.get("guests") as string, 10) || 1;
  const type = (formData.get("type") as string) || "catering";
  const details = (formData.get("details") as string) || "";

  if (!name || !email || !phone || !date || !time) {
    throw new Error("Missing required fields");
  }

  const fullDetails = `Phone: ${phone}\n\n${details}`;

  await query(
    "INSERT INTO bookings (name, email, date, time, guests, type, details, status) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')",
    [name, email, date, time, guests, type, fullDetails]
  );
  
  revalidatePath("/");
  return { success: true };
}


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

export async function getMenuItems() {
  const result = await query("SELECT * FROM menu_items ORDER BY id ASC");
  return result.rows;
}

export async function toggleMenuItemSoldOut(id: number, is_sold_out: boolean) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  await query("UPDATE menu_items SET is_sold_out = $1 WHERE id = $2", [is_sold_out, id]);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveMenuItem(id: number | null, data: any) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  if (id) {
    await query(
      "UPDATE menu_items SET title_en=$1, title_sv=$2, desc_en=$3, desc_sv=$4, price=$5, image=$6, additional_images=$7, tags=$8 WHERE id=$9",
      [data.title_en, data.title_sv, data.desc_en, data.desc_sv, data.price, data.image, data.additional_images, data.tags, id]
    );
  } else {
    await query(
      "INSERT INTO menu_items (title_en, title_sv, desc_en, desc_sv, price, image, additional_images, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [data.title_en, data.title_sv, data.desc_en, data.desc_sv, data.price, data.image, data.additional_images, data.tags]
    );
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteMenuItem(id: number) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  await query("DELETE FROM menu_items WHERE id = $1", [id]);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function getReviews() {
  const result = await query("SELECT * FROM reviews ORDER BY id DESC");
  return result.rows;
}

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) throw new Error("Email required");
  try {
    await query("INSERT INTO subscribers (email) VALUES ($1)", [email]);
    return { success: true };
  } catch (e) {
    return { success: false, error: "Already subscribed or invalid email" };
  }
}

export async function getSubscribers() {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  const result = await query("SELECT * FROM subscribers ORDER BY created_at DESC");
  return result.rows;
}

export async function uploadImage(formData: FormData) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");
  const blob = await put(`menu/${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

