export function formatPhone(num) {
  if (!num) return "";
  const digits = num.replace(/[^0-9]/g, ""); // 숫자만 남기기
  if (digits.length < 4) return digits;
  if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  return digits.replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3");
}
