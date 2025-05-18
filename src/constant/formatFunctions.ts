export function formatPhone(phone: string) {
  // Remove tudo que não for número
  const cleaned = phone.replace(/\D/g, "");
  // Aplica a máscara (XX) X XXXX-XXXX
  return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
}
