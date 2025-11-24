// src/utils/authGuard.js
import { redirect } from "react-router-dom";
import { getAccessToken } from "../api/auth";

export function authGuard() {
  const token = getAccessToken();

  // 토큰 없으면 → "/" 로 리다이렉트
  if (!token) return redirect("/");

  return null; // 통과
}
